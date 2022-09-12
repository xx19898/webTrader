package domain.alphavantageApi;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class NotIntradayNotAdjustedApiResponse{
	
	@JsonProperty("Meta Data")
	private MetaDataPartNotIntradayNotAdjusted metaData;
	
	@JsonProperty("stockData")
	@JsonAlias({"Time Series (Daily)","Weekly Time Series","Monthly Time Series"})
	private Map<String,NotIntradayNotAdjustedSingleDataEntry> timeSeriesIdentifier;
	
}
