package webTraderBackEnd.messaging.exceptions;

public class ConversationNotFoundException extends RuntimeException{
	public ConversationNotFoundException(String message) {
		super(message);
	}

}
