package webTrader.webTraderBackEnd.utility;

import org.json.JSONException;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class JSONStockDataObject implements StockDataObject<JSONObject>{
	
	private static Logger logger = LogManager.getLogger(JSONStockDataObject.class);
    private void addPartStockDataObject(JSONObject mainJsonObject,JSONObject partStockDataObject) {
    	try {
			JSONObject MetaDataJSONObject = partStockDataObject.getJSONObject("Meta Data");
			String symbolName = MetaDataJSONObject.getString("2. Symbol");
			mainJsonObject.put(symbolName, partStockDataObject);
		} catch (JSONException e) {
			logger.error(e.getMessage());
		}	
    }
    
	@Override
	public JSONObject composeAnStockDataObjectFromMultipleDataObjects(List<JSONObject> dataObjects) {
		JSONObject mainObject = new JSONObject();
		for(JSONObject partObject : dataObjects) {
			addPartStockDataObject(mainObject,partObject);
		}	
		return mainObject;
	}
}
