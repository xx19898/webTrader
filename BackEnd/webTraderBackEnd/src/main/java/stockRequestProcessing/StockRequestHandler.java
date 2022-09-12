package stockRequestProcessing;

import java.util.concurrent.CompletableFuture;

import org.json.JSONObject;

public interface StockRequestHandler {
	void setNext(StockRequestHandler nextRequestHandler);
	CompletableFuture<JSONObject> processStockRequest(StockRequest stockRequest) throws StockRequestHandlerChainException;
    CompletableFuture<JSONObject> executeStockRequest(StockRequest stockRequest);
}
