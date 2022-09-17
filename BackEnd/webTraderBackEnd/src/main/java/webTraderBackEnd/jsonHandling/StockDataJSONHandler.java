package webTraderBackEnd.jsonHandling;

import webTraderBackEnd.stocksRequests.domain.alphavantageApi.StockApiResponse;
import webTraderBackEnd.stocksRequests.utility.StockApiTimeSeries;

public interface StockDataJSONHandler{
	public StockApiResponse parseStockData(StockApiTimeSeries timeSeries,String jsonString) throws Exception;
}
