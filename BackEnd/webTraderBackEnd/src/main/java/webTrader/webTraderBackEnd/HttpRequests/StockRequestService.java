package webTrader.webTraderBackEnd.HttpRequests;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webTrader.webTraderBackEnd.security.ApiKeys;
import webTrader.webTraderBackEnd.service.StockApiHitCounterService;

import com.fasterxml.jackson.databind.util.JSONPObject;

import lombok.AllArgsConstructor;

@Service
public class StockRequestService {
	
	@Autowired 
	StockApiHitCounterService apiHitCounter;
	
	@Autowired HTTPCallable httpClient;
	
	public StockRequestService(StockApiHitCounterService apiHitCounter, HTTPCallable httpClient) {
		this.apiHitCounter = apiHitCounter;
		this.httpClient = httpClient;
	}
	
	UriBuildingStrategy uriBuilder;
	
	private void setUriBuildingStrategy(UriBuildingStrategy uriBuildingStrategy) {
		this.uriBuilder = uriBuildingStrategy;
	}
	

	
	//Makes a request to AlphaVantage server and receives the data related the stocks
	public JSONObject getStockDataWithIntradayAsAFunction(String functionName, String[] symbols, String interval) throws ClientProtocolException, IOException {
		setUriBuildingStrategy(new IntradayUriBuildingStrategy(functionName, symbols[0], interval));	
		return composeAnStockJSONObjectFromDifferentStockDataJSONObjects(symbols);
	}
	private JSONObject composeAnStockJSONObjectFromDifferentStockDataJSONObjects(String[] symbols) {
		JSONObject stockData = new JSONObject();
		for(String symbol : symbols) {
			uriBuilder.changeSymbol(symbol);
			CompletableFuture.supplyAsync(
					() -> httpClient.fetchStockDataHttpRequest(uriBuilder.formUri()))
					.thenApply(result -> {
						return (JSONObject) result;
					})
					.thenAccept(jsonObject -> {
						try {
							stockData.put(symbol, jsonObject);
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					});
			
		}
		return stockData;
	}
	public JSONObject getNonIntradayStockData(String functionName, String[] symbols) throws ClientProtocolException, IOException {
		setUriBuildingStrategy(new NonIntradayUriBuildingStrategy(functionName, symbols[0]));
		return composeAnStockJSONObjectFromDifferentStockDataJSONObjects(symbols);
	}
		
}
