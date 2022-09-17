package webTraderBackEnd.stocksRequests.stockRequestProcessing;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.json.JSONException;
import org.json.JSONObject;

import webTraderBackEnd.httpRequests.HTTPCallable;
import webTraderBackEnd.stocksRequests.uriBuildingStrategy.UriBuildingStrategy;

abstract class BaseStockRequestHandler implements StockRequestHandler{
	protected StockRequestType typeOfRequestThatCanBeProcessed;
	protected StockRequestHandler nextHandler;
	protected UriBuildingStrategy uriBuilder;
	
	HTTPCallable httpClient;
	
	public BaseStockRequestHandler(HTTPCallable httpClient) {
		this.httpClient = httpClient;
	}
	
	@Override
	public CompletableFuture<String> processStockRequest(StockRequest stockRequest) throws StockRequestHandlerChainException, IOException{
		if(stockRequest.typeOfRequest().equals(this.typeOfRequestThatCanBeProcessed)){
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
	public void setNext(StockRequestHandler nextHandler){
		this.nextHandler = nextHandler;
	}
	
	protected void setUriBuildingStrategy(UriBuildingStrategy newUriBuildingStrategy){
		this.uriBuilder = newUriBuildingStrategy;
	}
	
	protected CompletableFuture<String> fetchStockData(String uri) throws IOException{
		CompletableFuture<String> apiResponse = CompletableFuture.supplyAsync(
				() -> {
					try {
						return httpClient.fetchStockDataHttpRequest(uriBuilder.formUri());
					}catch (IOException e) {
						throw new RuntimeException();
					}
				});
		return apiResponse;
	}
}
