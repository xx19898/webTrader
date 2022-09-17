package webTraderBackEnd.security;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import webTraderBackEnd.security.CustomAuthenticationFilter;
import webTraderBackEnd.user.repository.UserRepo;

import java.util.function.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	@Autowired 
	private final UserDetailsService userDetailsService;
	
	@Autowired
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private final CustomAuthenticationProvider customAuthProvider;
	
	public SecurityConfiguration(
			BCryptPasswordEncoder bCryptPasswordEncoder
			,UserDetailsService userDetailsService
			,CustomAuthenticationProvider customAuthProvider
			) {
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		this.userDetailsService = userDetailsService;
		this.customAuthProvider = customAuthProvider;
	}
	
	
	
/*	@Override
 	public void configure(WebSecurity web) throws Exception {
 		web.ignoring()
 		// Spring Security should completely ignore URLs starting with /resources/
 				.antMatchers("/greeting","/favicon.ico","/db/add","/db/all");
 	} */
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth.authenticationProvider(customAuthProvider);
			  }
	
	@Override
	protected
	void configure(HttpSecurity http)throws Exception{
		
		
		http
		  .csrf()
		  .disable()
	      .authorizeRequests()
	      .antMatchers("/admin/**").hasRole("ADMIN")
	      .antMatchers("/stocks/**").permitAll()
	      .antMatchers("/stocks/**").anonymous()
	      .antMatchers("/users/all").permitAll()
	      .antMatchers("/login").anonymous()
	      .antMatchers("/login").permitAll()
	      .anyRequest().permitAll()
	      .and()
	      .addFilter(new CustomAuthenticationFilter(authenticationManagerBean(),bCryptPasswordEncoder))
		  .addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
	}
	
	@Bean 
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception{
		return super.authenticationManagerBean();
	}
}




