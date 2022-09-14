package domain.alphavantageApi.adjustedClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseMetaDataPart;
import lombok.Data;

@Data
public class AdjustedMonthlyMetaDataPart extends BaseMetaDataPart{
	@JsonProperty("4. Time Zone")
	String timeZone;

}