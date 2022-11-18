package webTraderBackEnd.stocksRequests.exceptions;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiCallLimitExceededException extends RuntimeException{
	private Date timestamp;
	private int[] waitingArrayInSecs;
}
