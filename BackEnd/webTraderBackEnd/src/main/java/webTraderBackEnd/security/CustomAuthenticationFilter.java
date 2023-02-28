package webTraderBackEnd.security;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.transform.ToListResultTransformer;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator.Builder;
import com.auth0.jwt.algorithms.Algorithm;

import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.security.JWTUtil;



public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	@Autowired
	private final AuthenticationManager authenticationManager;
	
	@Autowired
	private final PasswordEncoder passwordEncoder;
	
	public CustomAuthenticationFilter(AuthenticationManager authenticationManager,PasswordEncoder passwordEncoder){
		this.authenticationManager = authenticationManager;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override 
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
		System.out.println("attempting auth");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		if(username == null || password == null) {
			throw new BadCredentialsException("Bad Credentials!");
		}
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
	    Authentication auth = authenticationManager.authenticate(authenticationToken);
	    if(auth.equals(null)){
	    	throw new AuthenticationServiceException("Something went wrong during authentication");
	    }
	    return auth;
	}
	
	@Override 
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,Authentication authentication)
	throws  IOException, ServletException{
		User user = (User) authentication.getPrincipal();
		String userId = Long.toString(user.getId());
		Algorithm algorithm = Algorithm.HMAC256(JWTUtil.privateKey.getBytes());
		List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
		String accessToken = JWT.create()
				.withSubject(userId)
				.withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 1000))
				.withIssuer(request. getRequestURL().toString())
				.withClaim("roles",  roles)
			    .sign(algorithm);
		
		System.out.println("ACCESS TOKEN EXPIRATION DATE: " + new Date(System.currentTimeMillis() + 1000 * 60 * 1000));
		
		int refreshTokenLifetime = 1000 * 3600;
		
		String refreshToken = JWT.create()
				.withSubject(userId)
				.withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenLifetime))
				.withIssuer(request.getRequestURL().toString())
				.withClaim("roles",  roles)
			    .sign(algorithm);
				
		response.setHeader("Set-Cookie", "SameSite=none"); 
		
		JSONObject responseJSON = new JSONObject();
		
		try{
			responseJSON.put("access_token", accessToken);
			responseJSON.put("logged_in_user", user.getUsername());
			responseJSON.put("AUTHORITIES",roles);
		}catch (JSONException e){
			throw new InternalError("Caught an exception while trying to create json response for user trying to log in");
		}
		
		response.getWriter().write(responseJSON.toString());
		
		Cookie jwtRefreshTokenCookie = new Cookie("refresh_cookie",refreshToken);
		jwtRefreshTokenCookie.setSecure(true);
		jwtRefreshTokenCookie.setHttpOnly(true);
		jwtRefreshTokenCookie.setMaxAge(refreshTokenLifetime);
		response.addCookie(jwtRefreshTokenCookie);
	}
}
