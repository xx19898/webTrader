package webTraderBackEnd.exceptionHandling;

public class BadRequestException extends RuntimeException{
	public BadRequestException(String msg) {
		super(msg);
	}
}
