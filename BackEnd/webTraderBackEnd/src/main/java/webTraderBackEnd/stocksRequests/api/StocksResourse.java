package webTraderBackEnd.stocksRequests.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import webTraderBackEnd.stocksRequests.domain.alphavantageApi.StockApiResponse;
import webTraderBackEnd.stocksRequests.service.StocksRequestService;
import webTraderBackEnd.stocksRequests.stockApiHitCounter.StockApiHitCounterService;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChainException;

@RestController
@RequestMapping(path="/stocks")
public class StocksResourse{
	@Autowired 
	private StocksRequestService stockService;
	
	@Autowired
	private StockApiHitCounterService stockApiHitCounter;
	
	@CrossOrigin
	@RequestMapping(
			produces = {MediaType.APPLICATION_JSON_VALUE,"application/json"},
			method = RequestMethod.GET,
			path = "getStockData"
			)
	public @ResponseBody ResponseEntity<String> getStockInfo
	(@RequestParam String function, @RequestParam List<String> symbols, @RequestParam(required=false) Optional<String> interval) throws StockRequestHandlerChainException, IOException, JSONException{
		
		Map<String,String> stockRequestParameters = new HashMap<>();
		stockRequestParameters.put("function", function);
		interval.ifPresent(intervl -> stockRequestParameters.put("interval", intervl));
        String[] theSymbolsArray = symbols.stream().
        						   filter(element -> !element.isBlank()).
    						   	   toArray(String[]::new);
		JSONObject theStockData = stockService.getStockData(theSymbolsArray, stockRequestParameters);
		ResponseEntity<String> response = new ResponseEntity<String>(theStockData.toString(),HttpStatus.OK);
		return response;
		}
	}


