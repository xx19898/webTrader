package domain.alphavantageApi.intradayClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseMetaDataPart;

public class IntradayMetaDataPart extends BaseMetaDataPart{
	
	@JsonProperty("4. Interval")
	String interval;
    
	@JsonProperty("5. Output Size")
	String outputSize;
	
	@JsonProperty("6. Time Zone")
	String timeZone;
	
	
}
