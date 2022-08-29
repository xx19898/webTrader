package webTrader.webTraderBackEnd.service;


import java.util.Map;

import org.json.JSONObject;

public interface StocksRequestService{
	String getStockData(Map<String,JSONObject> params);
}
