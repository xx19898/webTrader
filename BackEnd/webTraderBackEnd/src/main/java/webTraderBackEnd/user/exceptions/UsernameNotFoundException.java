package webTraderBackEnd.user.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UsernameNotFoundException extends AuthenticationException{
	UsernameNotFoundException(String message){
		super(message);
	}
	

}
