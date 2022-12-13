package webTraderBackEnd.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import static java.util.Arrays.stream;

public class CustomAuthorizationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if(request.getServletPath().equals("/login") || request.getServletPath().equals("/register")) {
			filterChain.doFilter(request, response);
		} else {
			//TODO:Switch to cookie implementation of JWT token with secure and same-site flags, continue grinding spring sec
			Cookie [] cookies = request.getCookies();
			Optional<Cookie> accessCookie = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("access_cookie")).findAny();
			if(!accessCookie.isPresent()) throw new BadCredentialsException("No access tokens attached");
			
			String token = accessCookie.get().getValue();
			Algorithm algorithm = Algorithm.HMAC256(JWTUtil.privateKey.getBytes());
			JWTVerifier verifier = JWT.require(algorithm).build();
			DecodedJWT decodedJWT = verifier.verify(token);
			String username = decodedJWT.getSubject();
			String[] roles  = decodedJWT.getClaim("roles").asArray(String.class);
			Collection <SimpleGrantedAuthority> authorities = new ArrayList<>();
			stream(roles).forEach(role -> {
				authorities.add(new SimpleGrantedAuthority(role));
			});
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			filterChain.doFilter(request, response);
		}
		
	}
	
	
	

}
