package stockApiHitCounter;

import exceptions.Api.HitCounterError;

public interface StockApiHitCounterService {
	void incrementStockApiHitCount(int numberOfHits) throws HitCounterError;
	int numberOfTimesStockApiBeenHitDuringLastTimePeriod();
	int getSizeOfStack();
	int timesApiCanBeHitDuringTheTimeLimit();
}
