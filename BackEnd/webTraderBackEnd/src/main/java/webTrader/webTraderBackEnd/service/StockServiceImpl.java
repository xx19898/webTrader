package webTrader.webTraderBackEnd.service;
import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import webTrader.webTraderBackEnd.HttpRequests.StockRequest;

@Service @Transactional
public class StockServiceImpl implements StocksService{
	
	@Override
	public String getInitialStockData() throws ClientProtocolException, IOException{
		String responseData = StockRequest.getStockData();
		return responseData; 
		
		
		
	}

}
