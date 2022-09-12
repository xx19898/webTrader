package httpRequests;

import java.io.IOException;

import org.json.JSONObject;

public interface HTTPCallable {
	public JSONObject fetchStockDataHttpRequest(String uri) throws IOException;
}
