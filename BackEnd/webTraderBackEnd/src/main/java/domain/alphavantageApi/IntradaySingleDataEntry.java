package domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class IntradaySingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. volume")
	Double volume;
	

}
