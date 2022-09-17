package webTraderBackEnd.stocksRequests.domain.alphavantageApi.adjustedClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseSingleDataEntry;

@Data
public class WeeklyAndMonthlySingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. adjusted close")
	Double adjustedClose;
	
	@JsonProperty("6. volume")
	Double volume;
	
	@JsonProperty("7. dividend amount")
	Double dividendAmount;
	
	@JsonProperty("8. split coefficient")
	Double splitCoefficient;
}
