package webTrader.webTraderBackEnd.service.StockRequestProcessing;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.json.JSONException;
import org.json.JSONObject;

import webTrader.webTraderBackEnd.HttpRequests.HTTPCallable;
import webTrader.webTraderBackEnd.HttpRequests.UriBuildingStrategy;

abstract class BaseStockRequestHandler implements StockRequestHandler{
	protected StockRequestType typeOfRequestThatCanBeProcessed;
	protected StockRequestHandler nextHandler;
	protected UriBuildingStrategy uriBuilder;
	
	HTTPCallable httpClient;
	
	public BaseStockRequestHandler(HTTPCallable httpClient) {
		this.httpClient = httpClient;
	}
	
	@Override
	public CompletableFuture<JSONObject> processStockRequest(StockRequest stockRequest) throws StockRequestHandlerChainException{
		System.out.println(stockRequest.typeOfRequest());
		if(stockRequest.typeOfRequest().equals(this.typeOfRequestThatCanBeProcessed)) {
			System.out.println(typeOfRequestThatCanBeProcessed);
			return executeStockRequest(stockRequest);
		}else{
			if(nextHandler != null){
				return nextHandler.processStockRequest(stockRequest);
			}
			else {
				throw new StockRequestHandlerChainException("No handler was able to process the request");
			}
		}
	}
	
	@Override
	public void setNext(StockRequestHandler nextHandler) {
		this.nextHandler = nextHandler;
	}
	
	protected void setUriBuildingStrategy(UriBuildingStrategy newUriBuildingStrategy) {
		this.uriBuilder = newUriBuildingStrategy;
	}
	
	protected CompletableFuture<JSONObject> fetchStockData(String uri){
		return CompletableFuture.supplyAsync(
				() -> {
					try{
						return httpClient.fetchStockDataHttpRequest(uriBuilder.formUri());
					}catch (IOException e){
						return createSpecialJSONObjectForWhenIOExceptionIsCaught(uri);
					}
				});
	}
	
	private JSONObject createSpecialJSONObjectForWhenIOExceptionIsCaught(String uri) {
		try{
			return new JSONObject("Server was unable to get at data for " + uri + " due to the IOException");
		}catch (JSONException e1) {
			e1.printStackTrace();
			return new JSONObject();
		}
		
	}
}
