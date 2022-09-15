package stockRequestProcessing;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

import org.json.JSONObject;

public interface StockRequestHandler {
	void setNext(StockRequestHandler nextRequestHandler);
	CompletableFuture<String> processStockRequest(StockRequest stockRequest) throws StockRequestHandlerChainException, IOException;
    CompletableFuture<String> executeStockRequest(StockRequest stockRequest) throws IOException;
}
