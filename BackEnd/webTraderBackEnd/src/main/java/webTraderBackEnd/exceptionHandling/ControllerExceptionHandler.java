package webTraderBackEnd.exceptionHandling;

import java.util.Date;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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
	public ResponseEntity<String> limitForApiCallsBeenBreachedException(HitCounterError ex, WebRequest request){
		JSONObject jsonResponse = new JSONObject();
		try{
			jsonResponse.put("cooldownExpirationTimeForApiRequests", new JSONArray(apiHitCounter.timeToWaitInSec()));
		}catch(JSONException e){
			e.printStackTrace();
		}
		return new ResponseEntity<String>(jsonResponse.toString(),HttpStatus.REQUEST_TIMEOUT);
	}
}
