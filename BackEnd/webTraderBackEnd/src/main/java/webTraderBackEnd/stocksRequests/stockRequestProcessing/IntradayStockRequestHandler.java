package webTraderBackEnd.stocksRequests.stockRequestProcessing;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webTraderBackEnd.httpRequests.HTTPCallable;
import webTraderBackEnd.stocksRequests.uriBuildingStrategy.IntradayUriBuildingStrategy;

@Component
public class IntradayStockRequestHandler extends BaseStockRequestHandler{
	
	@Autowired
	public IntradayStockRequestHandler(HTTPCallable httpClient){
		super(httpClient);
		super.typeOfRequestThatCanBeProcessed = StockRequestType.INTRADAY;
	}
	

	@Override
	public CompletableFuture<String> executeStockRequest(StockRequest stockRequest) throws IOException{
		setUriBuildingStrategy(new IntradayUriBuildingStrategy(stockRequest.requestParameters()));
		String uriForFetchingStockData = super.uriBuilder.formUri();
		return super.fetchStockData(uriForFetchingStockData);
	}
}
