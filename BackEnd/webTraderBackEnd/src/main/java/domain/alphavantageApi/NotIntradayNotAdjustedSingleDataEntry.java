package domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseSingleDataEntry;
import lombok.Data;

@Data
public class NotIntradayNotAdjustedSingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. volume")
	Double volume;
}
