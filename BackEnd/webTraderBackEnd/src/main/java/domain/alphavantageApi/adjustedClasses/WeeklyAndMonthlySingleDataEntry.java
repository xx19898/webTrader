package domain.alphavantageApi.adjustedClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseSingleDataEntry;
import lombok.Data;

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
