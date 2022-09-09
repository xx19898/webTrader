package webTrader.webTraderBackEnd.service;


import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import webTrader.webTraderBackEnd.service.StockRequestProcessing.StockRequestHandlerChainException;

public interface StocksRequestService{
	JSONObject getStockData(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException;
}
