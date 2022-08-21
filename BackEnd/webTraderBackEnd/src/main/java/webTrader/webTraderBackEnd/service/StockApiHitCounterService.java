package webTrader.webTraderBackEnd.service;

import webTrader.webTraderBackEnd.exceptions.Api.HitCounterError;

public interface StockApiHitCounterService {
	void incrementStockApiHitCount(int numberOfHits) throws HitCounterError;
	int numberOfTimesStockApiBeenHitDuringLastTimePeriod();
	int getSizeOfStack();
	int timesApiCanBeHitDuringTheTimeLimit();
}
