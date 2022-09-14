package domain.alphavantageApi.adjustedClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseMetaDataPart;
import lombok.Data;

@Data
public class AdjustedDailyMetaDataPart extends BaseMetaDataPart{
	
	@JsonProperty("4. Output Size")
	String outputSize;
	
	@JsonProperty("5. Time Zone")
	String timeZone;

}
