package domain.alphavantageApi.adjustedClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseSingleDataEntry;
import lombok.Data;

@Data
public class AdjustedDailySingleDataEntry extends BaseSingleDataEntry{
	 @JsonProperty("5. adjusted close")
	 Double adjustedClose;
	 
	 @JsonProperty("6. volume")
	 Double volume;
	 
	 @JsonProperty("7. dividend amount")
	 Double dividentAmount;
	 
     
     @JsonProperty("8. split coefficient")
     Double splitCoefficient;
}
