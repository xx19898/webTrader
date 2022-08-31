package webTrader.webTraderBackEnd.HttpRequests;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import org.apache.http.client.ClientProtocolException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webTrader.webTraderBackEnd.service.StockApiHitCounterService;
import webTrader.webTraderBackEnd.utility.JSONStockDataObject;


@Service
public class StockRequestServiceImpl {
	
	@Autowired 
	StockApiHitCounterService apiHitCounter;
	
	@Autowired 
	HTTPCallable httpClient;
	
	UriBuildingStrategy uriBuilder;
	
	public StockRequestServiceImpl(StockApiHitCounterService apiHitCounter, HTTPCallable httpClient) {
		this.apiHitCounter = apiHitCounter;
		this.httpClient = httpClient;
	}
	
	private void setUriBuildingStrategy(UriBuildingStrategy uriBuildingStrategy) {
		this.uriBuilder = uriBuildingStrategy;
	}
	
	//TODO: change from jsonObject to jsonArray
	public JSONObject getStockData(Map<String,JSONArray> paramsMap) {
		JSONArray functionNameJSON = paramsMap.get("functionName");
		String functionNameString = functionNameJSON.toString();
		functionNameString.equals("TIME_SERIES_INTRADAY") ? getStockDataWithIntradayAsAFunction(functionNameString,)
	}
		
	//Makes a request to AlphaVantage server and receives the data related the stocks
	private JSONObject getStockDataWithIntradayAsAFunction(String functionName, String[] symbols, String interval) throws ClientProtocolException, IOException {
		setUriBuildingStrategy(new IntradayUriBuildingStrategy(functionName, symbols[0], interval));	
		return composeAnStockJSONObjectFromDifferentStockDataJSONObjects(symbols);
	}
	
	private JSONObject composeAnStockJSONObjectFromDifferentStockDataJSONObjects(String[] symbols){
		ArrayList<JSONObject> partStockDataObjects = new ArrayList<JSONObject>();
		JSONStockDataObject composedStockDataObjects = new JSONStockDataObject();
		
		for(String symbol : symbols) {
			uriBuilder.changeSymbol(symbol);
			CompletableFuture.supplyAsync(
					() -> httpClient.fetchStockDataHttpRequest(uriBuilder.formUri()))
					.thenApply(result -> {
						return (JSONObject) result;
					})
					.thenAccept(jsonObject -> {
						partStockDataObjects.add(jsonObject);
					});	
		}
		
		composedStockDataObjects.composeAnStockDataObjectFromMultipleDataObjects(partStockDataObjects);
		return composedStockDataObjects.getComposedDataObject();
	}
	
	private JSONObject getNonIntradayStockData(String functionName, String[] symbols) throws ClientProtocolException, IOException {
		setUriBuildingStrategy(new NonIntradayUriBuildingStrategy(functionName, symbols[0]));
		return composeAnStockJSONObjectFromDifferentStockDataJSONObjects(symbols);
	}		
}
