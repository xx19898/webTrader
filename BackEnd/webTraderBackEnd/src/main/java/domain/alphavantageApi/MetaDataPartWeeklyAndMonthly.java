package domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.baseClasses.BaseMetaDataPart;
import lombok.Data;

@Data
public class MetaDataPartWeeklyAndMonthly extends BaseMetaDataPart{
	@JsonProperty("4. Output Size")
    String outputSize;	
}
