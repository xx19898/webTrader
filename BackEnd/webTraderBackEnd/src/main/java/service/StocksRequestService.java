package service;


import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import stockRequestProcessing.StockRequestHandlerChainException;

public interface StocksRequestService{
	String getStockData(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException;
}
