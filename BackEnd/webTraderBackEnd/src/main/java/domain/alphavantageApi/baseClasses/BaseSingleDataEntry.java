package domain.alphavantageApi.baseClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class BaseSingleDataEntry {
	@JsonProperty("1. open")
	Double open;
	
	@JsonProperty("2. high")
	Double high;
	
	@JsonProperty("3. low")
	Double low;
	
	@JsonProperty("4. close")
	Double close;

}
