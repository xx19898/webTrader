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
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import webTraderBackEnd.security.CustomAuthenticationFilter;
import webTraderBackEnd.user.repository.UserRepo;

import java.util.Arrays;
import java.util.List;
import java.util.function.*;

import javax.servlet.http.HttpServletResponse;

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
		http.csrf().disable().cors().configurationSource(corsConfigurationSource()).and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(
						(request,response,ex) -> {
							response.sendError(
									HttpServletResponse.SC_UNAUTHORIZED,
									ex.getMessage()
									);
						}
						)
						.and().authorizeRequests()
	      .antMatchers("/admin/**").hasRole("ADMIN")
	      .antMatchers("/users/all").hasRole("ADMIN")
	      .antMatchers("/users/addAStockDeal").authenticated()
	      .antMatchers("/login").anonymous()
	      .antMatchers("/login").permitAll()
	      .anyRequest().permitAll()
	      .and()
	      .addFilter(new CustomAuthenticationFilter(authenticationManagerBean(),bCryptPasswordEncoder))
		  .addFilterBefore(new CustomAuthorizationFilter(), AnonymousAuthenticationFilter.class);
	}
	
	@Bean 
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception{
		return super.authenticationManagerBean();
	}
	
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:8080*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH","DELETE","UPDATE"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		configuration.setAllowCredentials(true);
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}




