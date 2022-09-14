package stockRequestProcessing;

import java.util.concurrent.CompletableFuture;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import httpRequests.HTTPCallable;
import httpRequests.NonIntradayUriBuildingStrategy;

@Component
public class NonIntradayStockRequestHandler extends BaseStockRequestHandler{
	
	@Autowired
	public NonIntradayStockRequestHandler(HTTPCallable httpClient){
		super(httpClient);
		super.typeOfRequestThatCanBeProcessed = StockRequestType.NON_INTRADAY;
	}

	@Override
	public CompletableFuture<JSONObject> executeStockRequest(StockRequest stockRequest) {
		if(super.httpClient == null){
		System.out.println("fug");
		}
		super.setUriBuildingStrategy(new NonIntradayUriBuildingStrategy(stockRequest.requestParameters()));
		return super.fetchStockData(super.uriBuilder.formUri());
	}
}
