package handlingJson;

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

import domain.alphavantageApi.DailyApiResponse;
import domain.alphavantageApi.StockApiResponse;
import domain.alphavantageApi.StockDataWeeklyAndMonthlyApiResponse;
import domain.alphavantageApi.adjustedClasses.AdjustedMonthlyApiResponse;
import domain.alphavantageApi.intradayClasses.IntradayStockApiResponse;
import jsonHandling.JacksonStockDataJSONHandler;
import jsonHandling.StockDataJSONHandler;
import utility.StockApiTimeSeries;

@Import(JacksonStockDataJSONHandler.class)
@ExtendWith(SpringExtension.class)
public class jsonHandlerTest{
	@Autowired
	StockDataJSONHandler jsonParser;
	
	private String readAFileAndBuildJsonString(String filename) throws IOException {
		URL url = getClass().getResource(filename);
		File file = new File(url.getPath());
		
		BufferedReader br
        = new BufferedReader(new FileReader(file));
		StringBuilder resultString = new StringBuilder();
		
		String line;
	    while ((line = br.readLine()) != null) {
	    	resultString.append(line).append("\n");
	    };
	    
	    return resultString.toString();
	}
	
	@Test
	void testThatDailyTimeseriesObjectsCanBeParsed() throws Exception{
		String jsonString = readAFileAndBuildJsonString("testSampleData");
	    StockApiResponse apiResponse = jsonParser.parseStockData(StockApiTimeSeries.TIME_SERIES_DAILY,jsonString);
	    DailyApiResponse dailyData = (DailyApiResponse) apiResponse;
	    String symbol = dailyData.getMetaData().getSymbol();
	    System.out.println(symbol);
	    assertEquals("IBM",symbol);
	}
	
	@Test
	void testThatIntradayStockJSONObjectsCanBeParsed() throws Exception{
		String jsonString = readAFileAndBuildJsonString("testSampleIntradayData");
	    StockApiResponse apiResponse = jsonParser.parseStockData(StockApiTimeSeries.TIME_SERIES_INTRADAY,jsonString);
	    IntradayStockApiResponse intradayData = (IntradayStockApiResponse) apiResponse;
	    String symbol = intradayData.getMetaData().getSymbol();
	    assertEquals("IBM",symbol);
	}
	
	@Test 
	void testThatAdjustedStockJSONObjectsCanBeParsed() throws Exception{
		String jsonString = readAFileAndBuildJsonString("testSampleAdjustedData");
		StockApiResponse apiResponse = jsonParser.parseStockData(StockApiTimeSeries.TIME_SERIES_MONTHLY_ADJUSTED,jsonString);
		AdjustedMonthlyApiResponse adjustedMonthly = (AdjustedMonthlyApiResponse) apiResponse;
		String symbol = adjustedMonthly.getMetaData().getSymbol();
		assertEquals("IBM",symbol);
	}
}
