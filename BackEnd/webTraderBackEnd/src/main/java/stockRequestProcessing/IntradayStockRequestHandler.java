package stockRequestProcessing;

import java.util.concurrent.CompletableFuture;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import httpRequests.HTTPCallable;
import httpRequests.IntradayUriBuildingStrategy;

@Component
public class IntradayStockRequestHandler extends BaseStockRequestHandler{
	
	@Autowired
	public IntradayStockRequestHandler(HTTPCallable httpClient) {
		super(httpClient);
		super.typeOfRequestThatCanBeProcessed = StockRequestType.INTRADAY;
	}
	

	@Override
	public CompletableFuture<JSONObject> executeStockRequest(StockRequest stockRequest){
		setUriBuildingStrategy(new IntradayUriBuildingStrategy(stockRequest.requestParameters()));
		String uriForFetchingStockData = super.uriBuilder.formUri();
		return super.fetchStockData(uriForFetchingStockData);
	}

}
