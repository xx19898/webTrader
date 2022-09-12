package httpRequests;

import java.util.HashMap;
import java.util.Map;

import security.ApiKeys;

public class IntradayUriBuildingStrategy implements UriBuildingStrategy {
	private final Map<String, String> paramMap;
	
	public IntradayUriBuildingStrategy(Map<String,String> paramMap) {
		this.paramMap = paramMap;			
	}
	
	@Override
	public String formUri() {
		return String.format("https://www.alphavantage.co/query?function=$1s&symbol=$2s&interval=$3s&apikey=$4s",
				new Object[]{
						paramMap.get("functionName"),paramMap.get("symbolName"),paramMap.get("intervalName"),
						ApiKeys.getAlphaVantageKey()
						});
	}
	
	@Override
	public void changeSymbol(String newSymbol) {
		paramMap.remove("symbolName");
		paramMap.put("symbolName", newSymbol);
	}
}
