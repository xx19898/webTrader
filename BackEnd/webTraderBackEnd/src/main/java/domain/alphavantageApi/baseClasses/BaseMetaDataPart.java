package domain.alphavantageApi.baseClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class BaseMetaDataPart{
	@JsonProperty("1. Information")
	String information;
	
	@JsonProperty("2. Symbol")
	String symbol;
	
	@JsonProperty("3. Last Refreshed")
	String lastRefreshed;
	
	
}
