package webTraderBackEnd.stocksRequests.stockRequestProcessing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StockRequestHandlerChainConfiguration {
	@Autowired
	IntradayStockRequestHandler intradayStockRequestHandler;
	
	@Autowired
	NonIntradayStockRequestHandler nonIntradayStockRequestHandler;
	
	@Bean(value="intraday/nonIntraday Config")
	StockRequestHandlerChain stockHandlerChain() {
		nonIntradayStockRequestHandler.setNext(intradayStockRequestHandler);
		return new StockRequestHandlerChain(nonIntradayStockRequestHandler);
	}
}
