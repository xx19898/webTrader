package webTrader.webTraderBackEnd.api;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import webTrader.webTraderBackEnd.service.StockServiceImpl;

@RestController
@RequestMapping(path="/stocks")
public class StocksResourse{
	@Autowired 
	private StockServiceImpl stockService;
	
	@GetMapping(path="/initialStockData")
	public @ResponseBody ResponseEntity<String> getInitialStockData() throws ClientProtocolException, IOException{
		String stockData = stockService.getInitialStockData();
		return new ResponseEntity<String>(stockData,HttpStatus.OK);
		
	}

}
