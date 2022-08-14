package webTrader.webTraderBackEnd.service;

public interface StockApiHitCounterService {
	void incrementStockApiHitCount(int numberOfHits);
	int numberOfTimesStockApiBeenHitDuringLastMinute();

}
