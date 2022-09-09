package webTrader.webTraderBackEnd.HttpRequests;

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
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor
public class HttpClientService implements HTTPCallable{
	@Override
	public JSONObject fetchStockDataHttpRequest(String uri) {
        System.out.println(uri);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		ResponseHandler <JSONObject> responseHandler = response -> {
			int status = response.getStatusLine().getStatusCode();
			if(status >= 200 && status < 300) {
				HttpEntity entity = response.getEntity();
				try {
					return entity != null ? new JSONObject(EntityUtils.toString(entity)) : null;
				} catch (ParseException e) {
					e.printStackTrace();
				} catch (JSONException e) {
					e.printStackTrace();
				}
			} else{
				throw new ClientProtocolException("Unexpected response status: " + status);
			}
			throw new ClientProtocolException("Something went wrong with the function!");
			
		};
		try {
			return httpClient.execute(new HttpGet(uri),responseHandler);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
