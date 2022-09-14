package domain.alphavantageApi.intradayClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseSingleDataEntry;
import lombok.Data;

@Data
public class IntradaySingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. volume")
	Double volume;
	

}
