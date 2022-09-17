package webTraderBackEnd.stocksRequests.domain.alphavantageApi.adjustedClasses;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.StockApiResponse;

@Data
public class AdjustedDailyApiResponse implements StockApiResponse{
	
	@JsonProperty("Meta Data")
	AdjustedDailyMetaDataPart metaData;
	
	@JsonAlias({"Time Series (Daily)","Weekly Adjusted Time Series","Monthly Adjusted Time Series"})
	Map<String,AdjustedDailyApiResponse> data;
	
	@Override
	public StockApiResponse getData(){
		return this;
	}
	
}
