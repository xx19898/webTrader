package webTrader.webTraderBackEnd.service;

import java.time.LocalTime;
import java.util.Date;
import java.util.Stack;

import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.stereotype.Service;

import webTrader.webTraderBackEnd.exceptions.Api.HitCounterError;

@Service
public class StockApiHitCounterServiceImpl implements StockApiHitCounterService{
	
	private Stack StockApiHitCounterStack;
	
	public StockApiHitCounterServiceImpl() {
		StockApiHitCounterStack = new Stack<Date>();
	}
	
	@Override
	public void incrementStockApiHitCount(int numberOfHits) throws HitCounterError {
		if(numberOfHits > 5) {throw new HitCounterError(HttpStatus.CONFLICT,"Sorry, but api cannot process that amount of requests right now");}
		for(int i = 0;i < numberOfHits;i++) {
			StockApiHitCounterStack.push( LocalTime.now() );
		}
	}

	@Override
	public int numberOfTimesStockApiBeenHitDuringLastMinute() {
		return StockApiHitCounterStack.size();
	}
	
	
	
	
	

}
