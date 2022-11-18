package webTraderBackEnd.stocksRequests.stockApiHitCounter;

import webTraderBackEnd.stocksRequests.exceptions.HitCounterError;

public interface StockApiHitCounterService {
	void incrementStockApiHitCount(int numberOfHits) throws HitCounterError;
	int numberOfTimesStockApiBeenHitDuringLastTimePeriod();
	int getSizeOfStack();
	int timesApiCanBeHitDuringTheTimeLimit();
	int timesApiCanBeHit();
	int[] timeToWaitInSec();
}
