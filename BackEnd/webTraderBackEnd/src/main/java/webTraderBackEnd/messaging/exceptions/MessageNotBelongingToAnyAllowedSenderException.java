package webTraderBackEnd.messaging.exceptions;

public class MessageNotBelongingToAnyAllowedSenderException extends RuntimeException{
	
	public MessageNotBelongingToAnyAllowedSenderException(String message){
		super(message);
		
	}

}
