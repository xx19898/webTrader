package domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class AdjustedSingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. adjusted close")
	Double adjustedClose;
	
	@JsonProperty("6. volume")
	Double volume;
	
	@JsonProperty("7. dividend amount")
	Double dividendAmount;
	
	@JsonProperty("8. split coefficient")
	Double splitCoefficient;
}
