package webTrader.webTraderBackEnd.api;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping(path="/getStockInfo")
	public @ResponseBody ResponseEntity<String> getStockInfo
	(@RequestParam String function, @RequestParam List<String> symbol, @RequestParam Optional<String> interval)
	{
		if(!function.equals("TIME_SERIES_INTRADAY") && interval.isPresent()) return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		
		if(interval.isPresent()) //make a call to the api for TIME_SERIES_INTRADAY with the chosen interval
		
	    //make a call to the api for another type of function, without the interval.
		
		
		
		
	}

}
