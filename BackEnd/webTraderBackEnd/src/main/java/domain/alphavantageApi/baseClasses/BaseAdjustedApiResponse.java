package domain.alphavantageApi.baseClasses;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;

import domain.alphavantageApi.StockApiResponse;
import domain.alphavantageApi.adjustedClasses.WeeklyAndMonthlySingleDataEntry;
import lombok.Data;

@Data
public class BaseAdjustedApiResponse implements StockApiResponse{
	@JsonAlias({"Time Series (Daily)","Weekly Adjusted Time Series","Monthly Adjusted Time Series"})
	Map<String,WeeklyAndMonthlySingleDataEntry> data;
	
	@Override
	public StockApiResponse getData() {
		return this;
	}
}
