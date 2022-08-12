package webTrader.webTraderBackEnd.HttpRequests;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import webTrader.webTraderBackEnd.security.ApiKeys;

import com.fasterxml.jackson.databind.util.JSONPObject;

public class StockRequest {
	
	//Makes a request to AlphaVantage server and receives the data related to one stock
	public static String getStockData() throws ClientProtocolException, IOException {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		String apiKey = ApiKeys.getAlphaVantageKey();
		HttpGet httpget = new HttpGet("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=" + apiKey);
		
		ResponseHandler <String> responseHandler = response -> {
			int status = response.getStatusLine().getStatusCode();
			if(status >= 200 && status < 300) {
				HttpEntity entity = response.getEntity();
				return entity != null ? EntityUtils.toString(entity) : null;
			} else {
				throw new ClientProtocolException("Unexpected response status: " + status);
			}
		};
		 
		String responseBody = httpClient.execute(httpget,responseHandler);
		return responseBody;
	}

}
