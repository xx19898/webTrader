package webTraderBackEnd.security;

import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.transform.ToListResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.security.JWTUtil;



public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	@Autowired
	private final AuthenticationManager authenticationManager;
	
	@Autowired
	private final PasswordEncoder passwordEncoder;
	
	public CustomAuthenticationFilter(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
		this.authenticationManager = authenticationManager;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override 
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
		System.out.println("attempting authentication");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
	    Authentication auth = authenticationManager.authenticate(authenticationToken);
	    if(auth.equals(null)) {
	    	System.out.println("WARNING!");
	    }
	    System.out.println("credentialss " + auth.getCredentials());
	    return auth;
	}
	
	@Override 
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,Authentication authentication)
	throws  IOException, ServletException{
		User user = (User) authentication.getPrincipal();
		String userId = Long.toString(user.getId());
		Algorithm algorithm = Algorithm.HMAC256(JWTUtil.secretKey.getBytes());
		String accessToken = JWT.create()
				.withSubject(userId)
				.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
				.withIssuer(request.getRequestURL().toString())
				.withClaim("roles",  user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
			    .sign(algorithm);
		
		String refreshToken = JWT.create()
				.withSubject(userId)
				.withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
				.withIssuer(request.getRequestURL().toString())
				.withClaim("roles",  user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
			    .sign(algorithm);
		
		response.setHeader("access_token", accessToken);
		response.setHeader("refresh_token", refreshToken);
	}
	
	
	
	

}
