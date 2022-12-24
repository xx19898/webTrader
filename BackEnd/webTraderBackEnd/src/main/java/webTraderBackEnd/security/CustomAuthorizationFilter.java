package webTraderBackEnd.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import static java.util.Arrays.stream;

public class CustomAuthorizationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if(request.getServletPath().equals("/login") || request.getServletPath().equals("/register")) {
			filterChain.doFilter(request, response);
		}else{
			Cookie [] cookies = request.getCookies();
			Optional<Cookie> refreshCookie = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("refresh_cookie")).findAny();
			
			String accessToken = request.getHeader(AUTHORIZATION);
			String refreshToken = refreshCookie.get().getValue();
			Algorithm algorithm = Algorithm.HMAC256(JWTUtil.privateKey.getBytes());
			JWTVerifier verifier = JWT.require(algorithm).build();
			try {
				DecodedJWT decodedAccessToken = verifier.verify(accessToken);
			// Send back new access token
			}catch(TokenExpiredException e){
				processRefreshToken(response,verifier,refreshToken);
			}catch(JWTVerificationException e) {
				// Token validation error
			}	
			filterChain.doFilter(request, response);
		}
		
	}
	
	private void setSecurityContext(DecodedJWT decodedJWT){
		String username = decodedJWT.getSubject();
		String[] roles  = decodedJWT.getClaim("roles").asArray(String.class);
		Collection <SimpleGrantedAuthority> authorities = new ArrayList<>();
		stream(roles).forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role));
		});
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
		SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authenticationToken);
	}
	
	private void processRefreshToken(HttpServletResponse response,JWTVerifier verifier,String refreshToken) throws IOException, ServletException{
		try {
			DecodedJWT decodedRefreshToken = verifier.verify(refreshToken);
			Map<String,Claim> claims = decodedRefreshToken.getClaims();
			Algorithm algorithm = Algorithm.HMAC256(JWTUtil.privateKey.getBytes());
			String accessToken = JWT.create()
					.withSubject(decodedRefreshToken.getSubject())
					.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
					.withIssuer(decodedRefreshToken.getIssuer())
					.withClaim("roles",(List)claims.get("roles"))
				    .sign(algorithm);
			JSONObject jsonToken = new JSONObject();
			try {
				jsonToken.put("access_token", accessToken);
			} catch (JSONException e) {
				throw new ServletException("Internal error when processing JSON data");
			}
			try {
				response.getWriter().write(jsonToken.toString());
			} catch (IOException e) {
				throw new IOException("Internal error when trying to write to the response body");
			}
		}catch(TokenExpiredException exception) {
			throw new TokenExpiredException("Session expired, please relogin!", null);
		}catch(JWTVerificationException exception){
			throw new JWTVerificationException("Unknown error when trying to authorize the request, please relogin");
		}
	}
	
	
	

}
