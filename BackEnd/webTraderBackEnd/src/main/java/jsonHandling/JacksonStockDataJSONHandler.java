package jsonHandling;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import domain.alphavantageApi.DailyApiResponse;
import domain.alphavantageApi.StockApiResponse;
import domain.alphavantageApi.StockDataWeeklyAndMonthlyApiResponse;
import domain.alphavantageApi.adjustedClasses.AdjustedDailyApiResponse;
import domain.alphavantageApi.adjustedClasses.AdjustedMonthlyApiResponse;
import domain.alphavantageApi.adjustedClasses.AdjustedWeeklyApiResponse;
import domain.alphavantageApi.intradayClasses.IntradayStockApiResponse;
import utility.StockApiTimeSeries;



@Component
public class JacksonStockDataJSONHandler implements StockDataJSONHandler{
	ObjectMapper objectMapper;
	
	public JacksonStockDataJSONHandler() {
		this.objectMapper = new ObjectMapper();
	}
	
	private <T> StockApiResponse parse (String jsonString, Class<T> className ) throws JsonMappingException, JsonProcessingException{
		StockApiResponse parsedData = (StockApiResponse) this.objectMapper.readValue(jsonString, className);
		return parsedData;
	}
	
	@Override
	public StockApiResponse parseStockData(StockApiTimeSeries timeSeries, String jsonString) throws Exception{
		switch(timeSeries){
			case TIME_SERIES_DAILY:
				return parse(jsonString,DailyApiResponse.class);
			case TIME_SERIES_WEEKLY:
				return parse(jsonString,StockDataWeeklyAndMonthlyApiResponse.class);
			case TIME_SERIES_MONTHLY:
				return parse(jsonString,StockDataWeeklyAndMonthlyApiResponse.class);
			case TIME_SERIES_DAILY_ADJUSTED:
				return parse(jsonString,AdjustedDailyApiResponse.class);
			case TIME_SERIES_WEEKLY_ADJUSTED:
				return parse(jsonString,AdjustedWeeklyApiResponse.class);
			case TIME_SERIES_MONTHLY_ADJUSTED:
				return parse(jsonString,AdjustedMonthlyApiResponse.class);
			case TIME_SERIES_INTRADAY:
				return parse(jsonString,IntradayStockApiResponse.class);
			default:
				throw new Exception
						("Error when parsing json data - time series on the request did not map to any existing time series constant");
		}
	}
}
	
