package webTrader.webTraderBackEnd.utility;

import org.json.JSONException;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;


public class JSONStockDataObject implements StockDataObject<JSONObject>{
	JSONObject jsonStockDataObjects;
	public JSONStockDataObject() {
		this.jsonStockDataObjects = new JSONObject();
	}
	
	private static Logger logger = LogManager.getLogger(JSONStockDataObject.class);
    private void addPartStockDataObject(JSONObject partStockDataObject) {
    	try {
			JSONObject MetaDataJSONObject = partStockDataObject.getJSONObject("Meta Data");
			String symbolName = partStockDataObject.getString("2. Symbol");
			jsonStockDataObjects.put(symbolName, partStockDataObject);
		} catch (JSONException e) {
			logger.error(e.getMessage());
		}	
    }
	@Override
	public void composeAnStockDataObjectFromMultipleDataObjects(List<JSONObject> dataObjects) {
		for(JSONObject partObject : dataObjects) {
			addPartStockDataObject(partObject);
		}
	}
	@Override
	public JSONObject getComposedDataObject() {
		return this.jsonStockDataObjects;
	}
}
