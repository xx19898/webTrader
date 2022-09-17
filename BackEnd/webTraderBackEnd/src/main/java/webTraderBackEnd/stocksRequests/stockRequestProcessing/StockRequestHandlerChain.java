package webTraderBackEnd.stocksRequests.stockRequestProcessing;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

public class StockRequestHandlerChain{
	private StockRequestHandler firstHandlerInTheChain;
	
	public StockRequestHandlerChain(StockRequestHandler initialHandler) {
		this.firstHandlerInTheChain = initialHandler;
	}
	
	public CompletableFuture<String> passARequest(StockRequest request) throws StockRequestHandlerChainException, IOException{
		return firstHandlerInTheChain.processStockRequest(request);
	}
}
