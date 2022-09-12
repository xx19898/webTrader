package webTrader.webTraderBackEnd.JSONHandler;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;

import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.fasterxml.jackson.databind.ObjectMapper;

import domain.alphavantageApi.IntradayStockApiResponse;
import domain.alphavantageApi.NotIntradayNotAdjustedApiResponse;
import webTraderBackEnd.jsonHandling.JacksonStockDataJSONHandler;

@Import(JacksonStockDataJSONHandler.class)
@ExtendWith(SpringExtension.class)
public class jsonHandlerTest{
	@Autowired
	JacksonStockDataJSONHandler jsonParser;
	
	@Test
	void testThatUsualTimeseriesObjectsCanBeParsed() throws JSONException, IOException{
		URL url = getClass().getResource("testSampleJsonAsString");
		File file = new File(url.getPath());
		
		BufferedReader br
        = new BufferedReader(new FileReader(file));
		StringBuilder resultString = new StringBuilder();

	    String line;
	    while ((line = br.readLine()) != null) {
	    	resultString.append(line).append("\n");
	    };
	   // System.out.println(resultString.toString());
	    NotIntradayNotAdjustedApiResponse apiResponse = jsonParser.parseNonIntradayApiResponse(resultString.toString());
	    String symbol = apiResponse.getMetaData().getSymbol();
	    System.out.println(symbol);
	    assertEquals("IBM",symbol);
	}
	
	@Test
	void testThatIntradayStockJSONObjectsCanBeParsed() throws FileNotFoundException,JSONException, IOException {
		URL url = getClass().getResource("testSampleIntradayData");
		File file = new File(url.getPath());
		
		BufferedReader br
        = new BufferedReader(new FileReader(file));
		StringBuilder resultString = new StringBuilder();

	    String line;
	    while ((line = br.readLine()) != null) {
	    	resultString.append(line).append("\n");
	    };
	    
	    IntradayStockApiResponse apiResponse = jsonParser.parseIntradayApiResponse(resultString.toString());
	    String symbol = apiResponse.getMetaData().getSymbol();
	    System.out.println(symbol);
	    ObjectMapper objMapper = new ObjectMapper();
	    assertEquals("IBM",symbol);
	}
}
