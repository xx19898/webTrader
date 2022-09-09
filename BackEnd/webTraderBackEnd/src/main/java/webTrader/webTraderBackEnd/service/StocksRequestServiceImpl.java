package webTrader.webTraderBackEnd.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webTrader.webTraderBackEnd.HttpRequests.HTTPCallable;
import webTrader.webTraderBackEnd.service.StockRequestProcessing.StockRequest;
import webTrader.webTraderBackEnd.service.StockRequestProcessing.StockRequestHandlerChain;
import webTrader.webTraderBackEnd.service.StockRequestProcessing.StockRequestHandlerChainException;
import webTrader.webTraderBackEnd.utility.JSONStockDataObject;


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
	public JSONObject getStockData(String[] symbols,Map<String, String> otherParams) throws StockRequestHandlerChainException{
		System.out.print("got it");
		List<JSONObject> stockDataList = getTheStockDataInDiscreteJSONObjects(symbols, otherParams);
		JSONObject finalStockData = jsonHelper.composeAnStockDataObjectFromMultipleDataObjects(stockDataList);
		return finalStockData;
	}
	
	private Map<String,String> uniteSymbolAndOtherParamsInOneMap(String symbol,Map<String,String> otherParams) {
		Map<String, String> paramsMap  = new HashMap<String,String>();
		paramsMap.putAll(otherParams);
		paramsMap.put("symbolName", symbol);
		return paramsMap;
	}

	private List<JSONObject> getTheStockDataInDiscreteJSONObjects(String[] symbols,Map<String,String> otherParams) throws StockRequestHandlerChainException{
		ArrayList<CompletableFuture<JSONObject>> pendingPartStockDataObjects = new ArrayList<CompletableFuture<JSONObject>>();
		JSONStockDataObject composedStockDataObjects = new JSONStockDataObject();
		
		for(String symbol : symbols){
			StockRequest newRequest = new StockRequest(uniteSymbolAndOtherParamsInOneMap(symbol, otherParams));
			pendingPartStockDataObjects.add(stockRequestHandlerChain.passARequest(newRequest));
		}
		
		CompletableFuture<Void> allStockDataObjectsAreDownloaded = CompletableFuture.
				allOf(pendingPartStockDataObjects.toArray
						(new CompletableFuture[pendingPartStockDataObjects.size()]));
		
		CompletableFuture<List<JSONObject>> listOfStockDataObjects = allStockDataObjectsAreDownloaded.thenApply(listOfFinishedFutures ->
		pendingPartStockDataObjects.stream().
				map(future -> future.join()).
				collect(Collectors.<JSONObject>toList())
	    );
		
		List<JSONObject> partStockDataObjects = listOfStockDataObjects.join();
		
		return partStockDataObjects;
	}
}
