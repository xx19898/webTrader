package webTraderBackEnd.portfolioStocks.dtos;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StockDealDTO{
	private int quantity;
	private double stockPriceAtTheAcquirement;
	private String dealStatus;
	private String operationType;
	private Instant createdDate;
	private long id;
	private String ownerName;
	private long userId;	
}
