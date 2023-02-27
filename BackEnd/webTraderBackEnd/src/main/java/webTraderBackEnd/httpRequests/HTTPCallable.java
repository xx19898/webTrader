package webTraderBackEnd.httpRequests;

import java.io.IOException;

import org.json.JSONObject;

import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequest;

public interface HTTPCallable{
	String fetchStockDataHttpRequest(String uri) throws IOException;
	String fetchSymbolsInfo(String uri) throws IOException;
}
