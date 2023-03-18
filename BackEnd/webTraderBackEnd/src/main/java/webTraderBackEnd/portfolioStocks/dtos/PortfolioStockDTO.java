package webTraderBackEnd.portfolioStocks.dtos;

import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioStockDTO{
	private Long userId;
	private String symbol;
	private Long portfolioId;
	private double priceAtAcquirement;
	private int quantity;
}
