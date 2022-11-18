package services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import webTraderBackEnd.WebTraderBackEndApplication;
import webTraderBackEnd.httpRequests.HttpClientService;
import webTraderBackEnd.jsonHandling.JacksonStockDataJSONHandler;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.DailyApiResponse;
import webTraderBackEnd.stocksRequests.service.StocksRequestServiceImpl;
import webTraderBackEnd.stocksRequests.stockApiHitCounter.ApiHitCounterConfiguration;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.IntradayStockRequestHandler;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.NonIntradayStockRequestHandler;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChainConfiguration;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequestHandlerChainException;
import webTraderBackEnd.stocksRequests.utility.StockApiTimeSeries;
import webTraderBackEnd.stocksRequests.utility.StockDataApiConstantsServiceConfig;
import webTraderBackEnd.utility.JSONStockDataObject;


@Import(value= {ApiHitCounterConfiguration.class,StocksRequestServiceImpl.class,
		IntradayStockRequestHandler.class,NonIntradayStockRequestHandler.class,
		StockDataApiConstantsServiceConfig.class,HttpClientService.class, JSONStockDataObject.class,
		StockRequestHandlerChainConfiguration.class,JacksonStockDataJSONHandler.class})
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class StocksRequestService{
	@Autowired
	StocksRequestServiceImpl stocksRequestService;
	
	@Autowired JacksonStockDataJSONHandler jsonHandler;
	
	@Test
	void testThatStockRequestServiceReceivesAndParcesDataForSingleSymbolCorrectly() throws Exception{
		String symbol = "IBM";
		String[] listSymbols = new String[1];
		listSymbols[0] = symbol;
		Map<String,String> paramsMap = new HashMap<String,String>();
		paramsMap.put("function", StockApiTimeSeries.TIME_SERIES_DAILY.toString());
		
		String jsonResponse = (this.stocksRequestService.getStockData(listSymbols, paramsMap)).toString();
		
		try{
			JSONObject apiResponse = new JSONObject(jsonResponse);
			JSONObject IBMdata = apiResponse.getJSONObject("IBM");
			DailyApiResponse IBMDailyData = (DailyApiResponse) jsonHandler.parseStockData(StockApiTimeSeries.TIME_SERIES_DAILY,IBMdata.toString());
			String symbolFromApiResponse = IBMDailyData.getMetaData().getSymbol();
			assertEquals(symbolFromApiResponse,"IBM");
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	void testThatStockRequestServiceReceivesAndParcesDataForMultipleSymbolsCorrectly() throws Exception,JSONException, StockRequestHandlerChainException, IOException{
		String firstSymbol = "IBM";
		String secondSymbol = "AA";
		String[] listSymbols = new String[2];
		listSymbols[0] = firstSymbol;
		listSymbols[1] = secondSymbol;
		Map<String,String> paramsMap = new HashMap<String,String>();
		paramsMap.put("function", StockApiTimeSeries.TIME_SERIES_DAILY.toString());
		
		String jsonResponse = (this.stocksRequestService.getStockData(listSymbols, paramsMap)).toString();
		try {
			JSONObject apiResponse = new JSONObject(jsonResponse);
			JSONObject IBMdata = apiResponse.getJSONObject("IBM");
			JSONObject AAdata = apiResponse.getJSONObject("AA");
			DailyApiResponse IBMParsedData = (DailyApiResponse) jsonHandler.parseStockData(StockApiTimeSeries.TIME_SERIES_DAILY, IBMdata.toString());
			DailyApiResponse AAParsedData = (DailyApiResponse) jsonHandler.parseStockData(StockApiTimeSeries.TIME_SERIES_DAILY, AAdata.toString());
			String ibmSymbol = IBMParsedData.getMetaData().getSymbol();
			String aaSymbol = AAParsedData.getMetaData().getSymbol();
			assertEquals(ibmSymbol,"IBM");
			assertEquals(aaSymbol,"AA");
		}catch(JSONException e){
			e.printStackTrace();
		}
	}
}
