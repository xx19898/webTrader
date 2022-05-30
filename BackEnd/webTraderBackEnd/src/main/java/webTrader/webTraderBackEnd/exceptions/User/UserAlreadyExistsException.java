package webTrader.webTraderBackEnd.exceptions.User;



public class UserAlreadyExistsException extends RuntimeException{
	public UserAlreadyExistsException(String username) {
		super(String.format("User %s already exists",username));
	}

}
