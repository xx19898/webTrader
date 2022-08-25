package webTrader.webTraderBackEnd.HttpRequests;

import java.util.concurrent.CompletableFuture;

public interface HTTPCallable {
	public Object fetchStockDataHttpRequest(String uri);
}
