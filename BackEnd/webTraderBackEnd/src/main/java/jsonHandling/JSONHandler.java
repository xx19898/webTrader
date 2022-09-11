package jsonHandling;

import java.util.Map;

import org.json.JSONException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public interface JSONHandler {
	public Map<String,Object> parseString() throws JSONException, JsonMappingException, JsonProcessingException;
	public Map<String,Object> parseStockDataResponseAndGetTheMetaDataPart();
	public Map<String,Object> parseStockDataResponseAndGetTheStockDataPart();
	public Map<String,String> parseStockDataResponseAndGetTheParticularDataForAPeriodOfTime();
	public void setContent(String newContent);
}
