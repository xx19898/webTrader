package httpRequests;

import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import webTraderBackEnd.WebTraderBackEndApplication;
import webTraderBackEnd.httpRequests.HttpClientService;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChain;


//@Import(value={HttpClientService.class,StockRequestHandlerChain.class,StockRequestHandlerChain.class,IntradayStockRequestHandler.class,NonIntradayStockRequestHandler.class})
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes=WebTraderBackEndApplication.class)
public class TestThatFetchingDataFromStockApiWorks{
	@Autowired
	HttpClientService httpService;
	@Autowired
	@Qualifier("intraday/nonIntraday Config")
	StockRequestHandlerChain stockProcessingChain;
	@Test
    void testThatFetchingIntradayStockDataFromApiWorks() throws IOException{
		String uri = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=EBUF7NAPL1FA3DIC";
		String result = httpService.fetchStockDataHttpRequest(uri);
		System.out.println(result);
	}
}
