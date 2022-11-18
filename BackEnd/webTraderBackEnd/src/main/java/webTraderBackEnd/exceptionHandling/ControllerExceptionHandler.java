package webTraderBackEnd.exceptionHandling;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import webTraderBackEnd.stocksRequests.exceptions.HitCounterError;
import webTraderBackEnd.stocksRequests.stockApiHitCounter.StockApiHitCounterService;

@ControllerAdvice
public class ControllerExceptionHandler{
	@Autowired
	StockApiHitCounterService apiHitCounter;
	
	@ExceptionHandler(HitCounterError.class)
	public ResponseEntity<int[]> limitForApiCallsBeenBreachedException(HitCounterError ex, WebRequest request){
		return new ResponseEntity<int[]>(apiHitCounter.timeToWaitInSec(),HttpStatus.REQUEST_TIMEOUT);
	}
}
