package webTraderBackEnd.stocksRequests.service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webTraderBackEnd.httpRequests.HTTPCallable;
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
	
	public StocksRequestServiceImpl(StockApiHitCounterService apiHitCounter, HTTPCallable httpClient){
		this.apiHitCounter = apiHitCounter;
	}
	
	@Override
	public JSONObject getStockData(String[] symbols,Map<String, String> otherParams) throws StockRequestHandlerChainException, IOException{
		System.out.println("SYMBOLS");
		System.out.print(symbols[0]);
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
	
	private Map<String,String> uniteSymbolAndOtherParamsInOneMap(String symbol,Map<String,String> otherParams) {
		Map<String, String> paramsMap  = new HashMap<String,String>();
		paramsMap.putAll(otherParams);
		paramsMap.put("symbol", symbol);
		return paramsMap;
	}

	private List<String> getTheStockDataAsListOfStrings(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException, IOException{
		ArrayList<CompletableFuture<String>> pendingPartStockDataObjects = new ArrayList<CompletableFuture<String>>();
		
		for(String symbol : symbols){
			StockRequest newRequest = new StockRequest(uniteSymbolAndOtherParamsInOneMap(symbol, otherParams));
			pendingPartStockDataObjects.add(stockRequestHandlerChain.passARequest(newRequest));
		}
		
		CompletableFuture<Void> allStockDataObjectsAreDownloaded = CompletableFuture.
				allOf(pendingPartStockDataObjects.toArray
						(new CompletableFuture[pendingPartStockDataObjects.size()])
						);
		
		CompletableFuture<List<String>> listOfStockDataObjects = allStockDataObjectsAreDownloaded.thenApply(listOfFinishedFutures ->
		pendingPartStockDataObjects.stream().
				map(future -> future.join()).
				collect(Collectors.<String>toList())
	    );
		
		List<String> partStockDataObjects = listOfStockDataObjects.join();
		
		return partStockDataObjects;
	}
}
