package webTrader.webTraderBackEnd.service.StockRequestProcessing;

import java.util.concurrent.CompletableFuture;

import org.json.JSONObject;

public class StockRequestHandlerChain {
	private StockRequestHandler firstHandlerInTheChain;
	
	public StockRequestHandlerChain(StockRequestHandler initialHandler) {
		this.firstHandlerInTheChain = initialHandler;
	}
	
	public CompletableFuture<JSONObject> passARequest(StockRequest request) throws StockRequestHandlerChainException{
		return firstHandlerInTheChain.processStockRequest(request);
	}

}
