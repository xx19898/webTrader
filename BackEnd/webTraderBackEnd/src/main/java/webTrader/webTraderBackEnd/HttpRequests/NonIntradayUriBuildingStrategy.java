package webTrader.webTraderBackEnd.HttpRequests;

import java.util.HashMap;
import java.util.Map;

import webTrader.webTraderBackEnd.security.ApiKeys;

public class NonIntradayUriBuildingStrategy implements UriBuildingStrategy{
	Map<String,String> paramMap;
	public NonIntradayUriBuildingStrategy(String functionName, String symbol) {
		paramMap = new HashMap<String,String>();
		paramMap.put("functionName",functionName);
		paramMap.put("symbolName", symbol);	
	}
	@Override
	public String formUri() {
		return String.format("https://www.alphavantage.co/query?function=$1s&symbol=$2s&apikey=$3s",
				(new Object[] {paramMap.get("functionName"),paramMap.get("symbolName"),ApiKeys.getAlphaVantageKey()}));
	}
	@Override
	public void changeSymbol(String newSymbol) {
		paramMap.remove("symbolName");
		paramMap.put("symbolName", newSymbol);
	}
}
