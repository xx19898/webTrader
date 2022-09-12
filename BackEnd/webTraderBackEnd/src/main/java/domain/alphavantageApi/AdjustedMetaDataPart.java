package domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class AdjustedMetaDataPart extends BaseMetaDataPart{
	
	@JsonProperty("4. Output Size")
	String outputSize;
	
	@JsonProperty("5. Time Zone")
	String timeZone;

}
