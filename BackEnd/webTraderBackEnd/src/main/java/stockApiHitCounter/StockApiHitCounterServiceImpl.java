package stockApiHitCounter;

import java.text.MessageFormat;
import java.time.LocalTime;
import java.util.ArrayDeque;
import java.util.Date;
import java.util.Deque;
import java.util.Queue;
import java.util.Stack;
import java.util.concurrent.CompletableFuture;

import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.stereotype.Service;

import exceptions.Api.HitCounterError;
import utility.Constants;


public class StockApiHitCounterServiceImpl implements StockApiHitCounterService{
	private Deque<Date> StockApiHitCounterStack;
	private int timeLimitInSeconds;
	private int timesApiCanBeHitPerTimeLimit;
	
	public StockApiHitCounterServiceImpl(Deque<Date> stockApiHitCounterStack, int timeLimitInSeconds,int timesApiCanBeHitPerTimeLimit) {
		this.StockApiHitCounterStack = stockApiHitCounterStack;
		this.timeLimitInSeconds = timeLimitInSeconds;
		this.timesApiCanBeHitPerTimeLimit = timesApiCanBeHitPerTimeLimit;
	}
	@Override
	public int getSizeOfStack() {
		return this.StockApiHitCounterStack.size();
	}
	@Override
	public void incrementStockApiHitCount(int numberOfHits) throws HitCounterError {
		if(numberOfHits > timesApiCanBeHitPerTimeLimit) {
			throw new HitCounterError(HttpStatus.CONFLICT,"Sorry, but api cannot process that amount of requests right now");
		}
		if(StockApiHitCounterStack.size() >= timesApiCanBeHitPerTimeLimit) {
			throw new HitCounterError(HttpStatus.CONFLICT,"Sorry, the hit counter counter stack is already full");
		}
		for(int i = 0;i < numberOfHits;i++) {
			((Deque) StockApiHitCounterStack).push( LocalTime.now() );
			//i so that all the async methods do not finish waiting simultaneously :)
			queueDeletionOfHitCounterElement(timeLimitInSeconds + i);
		}
	}
	@Override
	public int numberOfTimesStockApiBeenHitDuringLastTimePeriod() {
		return StockApiHitCounterStack.size();
	}
	@Override
	public int timesApiCanBeHitDuringTheTimeLimit() {
		return this.timesApiCanBeHitPerTimeLimit;
	}
	private void queueDeletionOfHitCounterElement(int timeInMilliseconds) {
		CompletableFuture<Void> completableFuture = CompletableFuture.runAsync(() -> {
			try {
				Thread.sleep(timeInMilliseconds);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			StockApiHitCounterStack.removeLast();
		});
	}
}
