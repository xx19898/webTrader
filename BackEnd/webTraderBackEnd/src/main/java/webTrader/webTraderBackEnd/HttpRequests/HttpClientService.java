package webTrader.webTraderBackEnd.HttpRequests;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor
public class HttpClientService implements HTTPCallable{
	@Override
	public String fetchStockDataHttpRequest(String uri) {
	CloseableHttpClient httpClient = HttpClients.createDefault();
	ResponseHandler <String> responseHandler = response -> {
		int status = response.getStatusLine().getStatusCode();
		if(status >= 200 && status < 300) {
			HttpEntity entity = response.getEntity();
			return entity != null ? EntityUtils.toString(entity) : null;
		}else {
			throw new ClientProtocolException("Unexpected response status: " + status);
		}
	};
	try {
		return httpClient.execute(new HttpGet(uri),responseHandler);
	} catch (IOException e) {
		e.printStackTrace();
		return null;
	}
	}
}
