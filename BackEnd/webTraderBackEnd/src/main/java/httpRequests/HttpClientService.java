package httpRequests;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jsonHandling.StockDataJSONHandler;
import lombok.NoArgsConstructor;
import stockRequestProcessing.StockRequest;

@Component
@NoArgsConstructor
public class HttpClientService implements HTTPCallable{
	
	@Override
	public String fetchStockDataHttpRequest(String uri) throws IOException{
		CloseableHttpClient httpClient = HttpClients.createDefault();
		ResponseHandler <String> responseHandler = response -> {
			int status = response.getStatusLine().getStatusCode();
			if(status >= 200 && status < 300){
				HttpEntity entity = response.getEntity();
				String serverResponse = EntityUtils.toString(entity);
				return serverResponse;
			}else{
				throw new ClientProtocolException("Unexpected response status: " + status);
			}
			
		};
		try{
			return httpClient.execute(new HttpGet(uri),responseHandler);
		}catch(IOException e){
			e.printStackTrace();
			throw new IOException("Caught IOException when trying to execute httpRequest to attain the stock data");
		}
	}
}
