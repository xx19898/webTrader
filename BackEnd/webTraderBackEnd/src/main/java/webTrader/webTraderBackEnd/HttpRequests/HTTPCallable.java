package webTrader.webTraderBackEnd.HttpRequests;

import org.json.JSONObject;

public interface HTTPCallable {
	public JSONObject fetchStockDataHttpRequest(String uri);
}
