package jsonHandling;

import domain.alphavantageApi.StockApiResponse;
import utility.StockApiTimeSeries;

public interface StockDataJSONHandler {
	public StockApiResponse parseStockData(StockApiTimeSeries timeSeries,String jsonString) throws Exception;
}
