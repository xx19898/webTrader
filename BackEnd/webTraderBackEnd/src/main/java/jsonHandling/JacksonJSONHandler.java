package jsonHandling;

import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonJSONHandler implements JSONHandler{
	//TODO: CONTINUE IMPLEMENTING THE JACKSON JSONHANDLER. NOW HAVE TO GET A WAY TO HANDLE LISTS OF KEY VALUE PAIRS WHERE KEYS ARE DATES AND VALUES ARE JSON OBJECTS 
	//THAT ARE RELATED TO THOSE DATES.
	private Object content;
	
	public JacksonJSONHandler(String content){
		this.content = content;
	}

	@Override
	public Map<String,Object> parseString() throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String,Object> map = mapper.readValue(content,Map.class);
		return map;
	}

	@Override
	public void setContent(Object newContent) {
		this.content = newContent;
	}
}
