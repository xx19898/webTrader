package httpRequests;

import java.io.IOException;

import org.json.JSONObject;

import stockRequestProcessing.StockRequest;

public interface HTTPCallable{
	String fetchStockDataHttpRequest(String uri) throws IOException;
}
