package webTrader.webTraderBackEnd.service;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;

import com.fasterxml.jackson.databind.util.JSONPObject;

public interface StocksService{
	String getInitialStockData() throws ClientProtocolException, IOException;
}
