package webTrader.webTraderBackEnd.service;

import java.time.LocalTime;
import java.util.Date;
import java.util.Stack;

import org.springframework.stereotype.Service;

@Service
public class StockApiHitCounterServiceImpl implements StockApiHitCounterService{
	
	private Stack StockApiHitCounterStack;
	
	public StockApiHitCounterServiceImpl() {
		StockApiHitCounterStack = new Stack<Date>();
	}
	
	@Override
	public void incrementStockApiHitCount(int numberOfHits) {
		for(int i = 0;i < numberOfHits;i++) {
			StockApiHitCounterStack.push( LocalTime.now() );
		}
	}

	@Override
	public int numberOfTimesStockApiBeenHitDuringLastMinute() {
		return StockApiHitCounterStack.size();
	}
	
	
	
	
	

}
