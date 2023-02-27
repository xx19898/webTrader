package webTraderBackEnd.stocksRequests.service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import webTraderBackEnd.httpRequests.HTTPCallable;
import webTraderBackEnd.stocksRequests.exceptions.HitCounterError;
import webTraderBackEnd.stocksRequests.stockApiHitCounter.StockApiHitCounterService;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequest;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChain;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChainException;
import webTraderBackEnd.utility.JSONStockDataObject;


@Service
public class StocksRequestServiceImpl implements StocksRequestService {
	
	@Autowired 
	StockApiHitCounterService apiHitCounter;
	
	@Autowired
	JSONStockDataObject jsonHelper;
	
	@Autowired
	StockRequestHandlerChain stockRequestHandlerChain;
	
	@Autowired 
	HTTPCallable httpClient;
	
	public StocksRequestServiceImpl(StockApiHitCounterService apiHitCounter, HTTPCallable httpClient){
		this.apiHitCounter = apiHitCounter;
		this.httpClient = httpClient;
	}
	
	@Override
	public String getSymbolsInfo(String uri) throws IOException{
		CompletableFuture<String> symbolsInfoFuture =  CompletableFuture.supplyAsync(
				() -> {
					try {
						return httpClient.fetchSymbolsInfo(uri);
					} catch (IOException e) {
						throw new RuntimeException();
					}
				});
		String symbolsInfo = symbolsInfoFuture.join();
		return symbolsInfo;
	}
	
	@Override
	public JSONObject getStockData(String[] symbols,Map<String, String> otherParams) throws StockRequestHandlerChainException, IOException{
		if(symbols.length > apiHitCounter.timesApiCanBeHit()) {
			throw new HitCounterError(HttpStatus.INTERNAL_SERVER_ERROR,"Api call limit is exceeded");
		}
		List<String> stockDataList = getTheStockDataAsListOfStrings(symbols, otherParams);
		List<JSONObject> stockDataListAsJsonObjects = listOfStringsToListOfJsonObjects(stockDataList);
		JSONObject finalStockData = jsonHelper.composeAnStockDataObjectFromMultipleDataObjects(stockDataListAsJsonObjects);
		return finalStockData;
	}
	
	private List<JSONObject> listOfStringsToListOfJsonObjects(List<String> listOfStrings){
		List<JSONObject> stockDataListAsJsonObjects = listOfStrings.stream().map(stockDataAsString -> {
			try{
				return new JSONObject(stockDataAsString);
			}catch (JSONException e){
				throw new RuntimeException(e);
			}
		}).collect(Collectors.toList());
		return stockDataListAsJsonObjects;
	}
	
	private Map<String,String> uniteSymbolAndOtherParamsInOneMap(String symbol,Map<String,String> otherParams){
		Map<String, String> paramsMap  = new HashMap<String,String>();
		paramsMap.putAll(otherParams);
		paramsMap.put("symbol", symbol);
		return paramsMap;
	}

	private List<String> getTheStockDataAsListOfStrings(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException, IOException{
		ArrayList<CompletableFuture<String>> pendingPartStockDataObjects = new ArrayList<CompletableFuture<String>>();
		try {
			apiHitCounter.incrementStockApiHitCount(symbols.length);
		}catch (HitCounterError e){
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"You have to wait",e);
		}
		for(String symbol : symbols){
			StockRequest newRequest = new StockRequest(uniteSymbolAndOtherParamsInOneMap(symbol, otherParams));
			System.out.println("requesting data for " + newRequest.toString());
			pendingPartStockDataObjects.add(stockRequestHandlerChain.passARequest(newRequest));
		}
		
		List<String> listOfStockDataObjects = new ArrayList<String>();
		for(int i = 0; i < pendingPartStockDataObjects.size();i++){
			listOfStockDataObjects.add(pendingPartStockDataObjects.get(i).join());
			}
		return listOfStockDataObjects;
	}
}
