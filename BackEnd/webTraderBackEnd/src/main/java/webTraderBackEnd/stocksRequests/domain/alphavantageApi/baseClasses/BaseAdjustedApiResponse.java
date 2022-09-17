package webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.StockApiResponse;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.adjustedClasses.WeeklyAndMonthlySingleDataEntry;

@Data
public class BaseAdjustedApiResponse implements StockApiResponse{
	@JsonAlias({"Time Series (Daily)","Weekly Adjusted Time Series","Monthly Adjusted Time Series"})
	Map<String,WeeklyAndMonthlySingleDataEntry> data;
	
	@Override
	public StockApiResponse getData() {
		return this;
	}
}
