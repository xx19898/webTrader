package httpRequests;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import webTraderBackEnd.httpRequests.HttpClientService;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.IntradayStockRequestHandler;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequest;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChain;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChainException;
import webTraderBackEnd.stocksRequests.uriBuildingStrategy.NonIntradayUriBuildingStrategy;

@Import(value={HttpClientService.class,StockRequestHandlerChain.class,IntradayStockRequestHandler.class,NonIntradayUriBuildingStrategy.class})
@ExtendWith(SpringExtension.class)
public class TestRequestProcessingChain {
	@Autowired
	StockRequestHandlerChain requestHandlerChain;
	
	@Test
	void testThatChainWorks() throws StockRequestHandlerChainException, IOException, InterruptedException, ExecutionException{
		Map<String,String> paramsMap = new HashMap<String,String>();
		paramsMap.put("function", "TIME_SERIES_INTRADAY");
		paramsMap.put("symbol", "IBM");
		paramsMap.put("interval", "5min");
		StockRequest newRequest = new StockRequest(paramsMap);
		System.out.println("*****");
		System.out.println(newRequest.requestParameters().get("function"));
	    String response = requestHandlerChain.passARequest(newRequest).get();
		System.out.println(response);
	}

}
