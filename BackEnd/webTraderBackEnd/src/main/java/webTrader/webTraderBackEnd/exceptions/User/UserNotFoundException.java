package webTrader.webTraderBackEnd.exceptions.User;

public class UserNotFoundException extends RuntimeException{
	public UserNotFoundException(String errorMessage){
		super(errorMessage);
		
	}

}
