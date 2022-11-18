package webTraderBackEnd.exceptionHandling;

import java.util.Date;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ErrorMessage {
	private int statusCode;
	private Date timestamp;
	private String message;
	private String description;
}
