package webTraderBackEnd.stocksRequests.stockApiHitCounter;

import java.time.LocalTime;
import java.util.Date;
import java.util.Deque;
import java.util.Iterator;
import java.util.concurrent.CompletableFuture;

import org.springframework.http.HttpStatus;

import webTraderBackEnd.stocksRequests.exceptions.HitCounterError;


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
	public int getSizeOfStack(){
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
			((Deque<Date>) StockApiHitCounterStack).push( new Date() );
			//i so that all the async methods do not finish waiting simultaneously :)
			queueDeletionOfHitCounterElement(timeLimitInSeconds*1000 + i);
		}
	}
	
	@Override
	public int numberOfTimesStockApiBeenHitDuringLastTimePeriod(){ 
		return StockApiHitCounterStack.size();
	}
	@Override
	public int timesApiCanBeHitDuringTheTimeLimit(){
		return this.timesApiCanBeHitPerTimeLimit;
	}
	@Override
	public int timesApiCanBeHit() {
		return (timesApiCanBeHitPerTimeLimit - this.StockApiHitCounterStack.size());
	}
	private void queueDeletionOfHitCounterElement(int timeInMilliseconds) {
		CompletableFuture<Void> completableFuture = CompletableFuture.runAsync(() -> {
			try{
				Thread.sleep(timeInMilliseconds);
			}catch (InterruptedException e){
				e.printStackTrace();
			}
			StockApiHitCounterStack.removeLast();
		});
	}
	@Override
	public int[] timeToWaitInSec(){
		Iterator<Date> dequeIterator = StockApiHitCounterStack.iterator();
		Date dateAtStart = new Date();
		int[] timeToWaitInSec = new int[StockApiHitCounterStack.size()];
		int listIterator = 0;
		while(dequeIterator.hasNext()){
			Date currDate = new Date();
			long timeDifference = ((currDate.getTime() - dequeIterator.next().getTime())/1000)%60;
			timeToWaitInSec[listIterator] = timeLimitInSeconds - (int) timeDifference;
			listIterator++;
		}
		return timeToWaitInSec;		
	}
}
