package webTraderBackEnd.stocksRequests.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

public class HitCounterError extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8219734237164302422L;
	private HttpStatus status;
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timestamp;
	
	public HitCounterError(HttpStatus status){
		timestamp = LocalDateTime.now();
		this.status = status;
	}
	public HitCounterError(HttpStatus status, String message){
		super(message);
		timestamp = LocalDateTime.now();
		this.status = status;
	}
	
	

}
