package webTrader.webTraderBackEnd.service;
import java.io.IOException;
import java.util.Map;
import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import webTrader.webTraderBackEnd.HttpRequests.StockRequestService;

@Service
public class StocksRequestServiceImpl implements StocksRequestService{
	HTTPCallable httpRequestHandler;

	@Override
	public String getStockData(Map<String, String> params){
		return httpRequestHandler.
	}
	

}
