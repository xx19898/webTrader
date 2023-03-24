package webTraderBackEnd.portfolioStocks.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PortfolioAndStockDealsDTO{
	
	PortfolioDTO portfolio;
	List<StockDealDTO> stockDeals;
	
}
