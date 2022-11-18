package webTraderBackEnd.stocksRequests.stockRequestProcessing;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webTraderBackEnd.httpRequests.HTTPCallable;
import webTraderBackEnd.stocksRequests.uriBuildingStrategy.NonIntradayUriBuildingStrategy;

@Component
public class NonIntradayStockRequestHandler extends BaseStockRequestHandler{
	
	@Autowired
	public NonIntradayStockRequestHandler(HTTPCallable httpClient){
		super(httpClient);
		super.typeOfRequestThatCanBeProcessed = StockRequestType.NON_INTRADAY;
	}

	@Override
	public CompletableFuture<String> executeStockRequest(StockRequest stockRequest) throws IOException {
		if(super.httpClient == null){
		System.out.println("fug");
		}
		super.setUriBuildingStrategy(new NonIntradayUriBuildingStrategy(stockRequest.requestParameters()));
		System.out.println(super.uriBuilder.formUri());
		return super.fetchStockData(super.uriBuilder.formUri());
	}
}
