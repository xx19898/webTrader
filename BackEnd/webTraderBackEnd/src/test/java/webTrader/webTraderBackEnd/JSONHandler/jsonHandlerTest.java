package webTrader.webTraderBackEnd.JSONHandler;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import jsonHandling.JSONHandler;
import jsonHandling.JacksonJSONHandler;

public class jsonHandlerTest{
	
	@Test
	void testThatABasicKeyValuePairCanBeParsed() throws JsonMappingException, JsonProcessingException, JSONException {
		String keyValuePair = "{name:John}";
		JSONHandler jsonHandler = new JacksonJSONHandler(keyValuePair);
		Map<String,Object> parsedKeyValPair = jsonHandler.parseString();
		System.out.println(parsedKeyValPair);
		assertEquals("John", parsedKeyValPair.get("name"));
	}
	
	@Test
	void testThatRealNestedObjectsCanBeParsed() throws JSONException, IOException{
		URL url = getClass().getResource("testSampleJsonAsString");
		File file = new File(url.getPath());
		
		BufferedReader br
        = new BufferedReader(new FileReader(file));

	    String st;
	    while ((st = br.readLine()) != null);
	    
	    JSONHandler jsonHandler = new JacksonJSONHandler(st);
	    Map<String,Object> parsedJSONObject = jsonHandler.parseString();
	     metaData = parsedJSONObject.getJSONObject("Meta Data");
	    System.out.println(metaData);
	    String symbol = (String) metaData.get("2. Symbol");
	    System.out.println(symbol);
	    assertEquals("IBM",symbol);
        
	    
	    
		
	}

}
