package httpRequests;

import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import stockRequestProcessing.StockRequestHandlerChain;

@Import(value={HttpClientService.class,StockRequestHandlerChain.class})
@ExtendWith(SpringExtension.class)
public class TestThatFetchingDataFromStockApiWorks{
	@Autowired
	HttpClientService httpService;
	@Autowired
	StockRequestHandlerChain stockProcessingChain;
	@Test
    void testThatFetchingIntradayStockDataFromApiWorks() throws IOException{
		String uri = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=EBUF7NAPL1FA3DIC";
		String result = httpService.fetchStockDataHttpRequest(uri);
		System.out.println(result);
	}
	
	

}
