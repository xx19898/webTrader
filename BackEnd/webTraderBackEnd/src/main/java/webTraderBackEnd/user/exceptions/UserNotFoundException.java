package webTraderBackEnd.user.exceptions;

public class UserNotFoundException extends RuntimeException{
	public UserNotFoundException(String errorMessage){
		super(errorMessage);
		
	}

}
