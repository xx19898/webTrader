package service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import httpRequests.HTTPCallable;
import stockApiHitCounter.StockApiHitCounterService;
import stockRequestProcessing.StockRequest;
import stockRequestProcessing.StockRequestHandlerChain;
import stockRequestProcessing.StockRequestHandlerChainException;
import utility.JSONStockDataObject;


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
	public String getStockData(String[] symbols,Map<String, String> otherParams) throws StockRequestHandlerChainException{
		System.out.print("got it");
		List<String> stockDataList = getTheStockDataInDiscreteJSONObjects(symbols, otherParams);
		JSONObject finalStockData = jsonHelper.composeAnStockDataObjectFromMultipleDataObjects(stockDataList);
		return finalStockData;
	}
	
	private Map<String,String> uniteSymbolAndOtherParamsInOneMap(String symbol,Map<String,String> otherParams) {
		Map<String, String> paramsMap  = new HashMap<String,String>();
		paramsMap.putAll(otherParams);
		paramsMap.put("symbolName", symbol);
		return paramsMap;
	}

	private List<String> getTheStockDataInDiscreteJSONObjects(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException{
		ArrayList<CompletableFuture<String>> pendingPartStockDataObjects = new ArrayList<CompletableFuture<String>>();
		JSONStockDataObject composedStockDataObjects = new JSONStockDataObject();
		
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
