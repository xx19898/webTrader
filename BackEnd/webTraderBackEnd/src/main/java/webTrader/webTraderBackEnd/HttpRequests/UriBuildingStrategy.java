package webTrader.webTraderBackEnd.HttpRequests;

import java.util.Map;

public interface UriBuildingStrategy {
	String formUri();
	void changeSymbol(String newSymbol);
}
