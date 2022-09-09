package webTrader.webTraderBackEnd.service.StockRequestProcessing;

import java.util.concurrent.CompletableFuture;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import webTrader.webTraderBackEnd.HttpRequests.HTTPCallable;
import webTrader.webTraderBackEnd.HttpRequests.UriBuildingStrategy;
import webTrader.webTraderBackEnd.service.StockApiHitCounterService;

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
	
	protected CompletableFuture<JSONObject> fetchStockData(String uri) {
		return CompletableFuture.supplyAsync(
				() -> httpClient.fetchStockDataHttpRequest(uriBuilder.formUri()));
	}
}
