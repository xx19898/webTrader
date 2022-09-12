package api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import service.StocksRequestService;
import stockRequestProcessing.StockRequestHandlerChainException;

@RestController
@RequestMapping(path="/stocks")
public class StocksResourse{
	@Autowired 
	private StocksRequestService stockService;
	
	@RequestMapping(
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.GET,
			path = "getStockData"
			)
	public @ResponseBody ResponseEntity<JSONObject> getStockInfo
	(@RequestParam String function, @RequestParam List<String> symbols, @RequestParam Optional<String> interval) throws StockRequestHandlerChainException{
		Map<String,String> stockRequestParameters = new HashMap<>();
		stockRequestParameters.put("functionName", function);
		interval.ifPresent(intervl -> stockRequestParameters.put("interval", intervl));
        //TODO: MAKE AN ARRAY OUT OF LIST<STRING> SYMBOLS TO EVADE THE 500 EXCEPTION
        String[] theSymbolsArray = symbols.stream().toArray(String[]::new);
		JSONObject theStockData = stockService.getStockData(theSymbolsArray, stockRequestParameters);
		ResponseEntity<JSONObject> response = new ResponseEntity<JSONObject>(theStockData,HttpStatus.OK);
		return response;
		}
	}


