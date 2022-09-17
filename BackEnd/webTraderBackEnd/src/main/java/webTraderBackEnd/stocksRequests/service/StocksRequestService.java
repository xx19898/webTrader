package webTraderBackEnd.stocksRequests.service;


import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChainException;

public interface StocksRequestService{
	JSONObject getStockData(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException, IOException;
}
