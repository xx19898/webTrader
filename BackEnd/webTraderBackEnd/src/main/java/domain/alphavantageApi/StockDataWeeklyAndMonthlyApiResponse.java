package domain.alphavantageApi;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseNormalApiResponse;
import lombok.Data;

@Data
public class StockDataWeeklyAndMonthlyApiResponse extends BaseNormalApiResponse implements StockApiResponse{
	@JsonProperty("Meta Data")
	private MetaDataPartWeeklyAndMonthly metaData;
	
	@JsonProperty("stockData")
	@JsonAlias({"Time Series (Daily)","Weekly Time Series","Monthly Time Series"})
	private Map<String,NotIntradayNotAdjustedSingleDataEntry> timeSeriesIdentifier;

	@Override
	public StockApiResponse getData() {
		return this;
	}
}
