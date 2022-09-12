package httpRequests;

import java.io.IOException;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import webTraderBackEnd.jsonHandling.StockDataJSONHandler;

@Component
@NoArgsConstructor
public class HttpClientService implements HTTPCallable{
	@Autowired
	StockDataJSONHandler jsonParser;
	
	@Override
	public JSONObject fetchStockDataHttpRequest(String uri) throws IOException {
		System.out.println("hello");
        System.out.println(uri);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		ResponseHandler <JSONObject> responseHandler = response -> {
			int status = response.getStatusLine().getStatusCode();
			if(status >= 200 && status < 300) {
				HttpEntity entity = response.getEntity();
				String serverResponse = EntityUtils.toString(entity);
			}else{
				throw new ClientProtocolException("Unexpected response status: " + status);
			}
			throw new ClientProtocolException("Something went wrong with the function!");
			
		};
		try{
			return httpClient.execute(new HttpGet(uri),responseHandler);
		}catch(IOException e){
			e.printStackTrace();
			throw new IOException("Caught IOException when trying to execute httpRequest to attain the stock data");
		}
	}
}
