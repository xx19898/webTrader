package security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import domain.User;
import service.UserServiceImpl;

@Component
 public class CustomAuthenticationProvider implements AuthenticationProvider{
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserServiceImpl userDetails;
	
	public CustomAuthenticationProvider(BCryptPasswordEncoder passwordEncoder, UserServiceImpl userDetails) {
		this.passwordEncoder = passwordEncoder;
		this.userDetails = userDetails;
	}
	
	
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException{
		System.out.println(authentication.getCredentials().toString());
		if(! (credentialsExist(authentication) && usernameExists(authentication)) ){
			return null;
		}
		 User userFromDatabase = (User) userDetails.loadUserByUsername(authentication.getName());
		 System.out.println("password from database: " + userFromDatabase.getPassword());
		 //CONTINUE BY CHECKING WHETHER THE AUTHENTICATION'S PASSWORD MATCHES THE PASSWORD OF "USER" VARIABLE,
		 //IF YES, CREATE SUCCESSFUL AUTHENTICATION METHOD JUST AS IN ORIGINAL DAOAUTHENTICATIONPROVIDER ON GITHUB
		 if(passwordEncoder.matches(authentication.getCredentials().toString(), userFromDatabase.getPassword())) {
			 UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(userFromDatabase,
					 null,
					 null
					 );
			 return result;
		 }
		 throw new BadCredentialsException("Sorry, but either username or the password you entered is not valid :/");
	}
	

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
	
	//Checks whether credentials are attached to the request or not
	public boolean credentialsExist(final Authentication authentication) {
		if(authentication.getCredentials() == null) {
			throw new BadCredentialsException("Bad Credentials");
		}
		return true;
	}
	
	//checking that username exists
	public boolean usernameExists(final Authentication authentication) {
		if(authentication.getPrincipal() == null) {
			throw new UsernameNotFoundException("No username attached");
		}
		return true;
	}

}

