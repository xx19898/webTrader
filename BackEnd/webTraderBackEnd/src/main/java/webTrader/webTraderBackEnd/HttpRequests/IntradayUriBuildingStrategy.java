package webTrader.webTraderBackEnd.HttpRequests;

import java.util.HashMap;
import java.util.Map;

import webTrader.webTraderBackEnd.security.ApiKeys;

public class IntradayUriBuildingStrategy implements UriBuildingStrategy {
	Map<String, String> paramMap;
	public IntradayUriBuildingStrategy(String functionName, String symbol, String interval) {
		paramMap = new HashMap<String,String>();
		paramMap.put("functionName", functionName);
		paramMap.put("symbolName", symbol);
		paramMap.put("intervalName", interval);			
	}
	@Override
	public String formUri() {
		return String.format("https://www.alphavantage.co/query?function=$1s&symbol=$2s&interval=$3s&apikey=$4s",
				new Object[] {paramMap.get("functionName"),paramMap.get("symbolName"),paramMap.get("intervalName"),ApiKeys.getAlphaVantageKey()});
	}
	@Override
	public void changeSymbol(String newSymbol) {
		paramMap.remove("symbolName");
		paramMap.put("symbolName", newSymbol);
	}
	
}
