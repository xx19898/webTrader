package webTraderBackEnd.portfolioStocks.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioDTO{
	private Long id;
	private List<PortfolioStockDTO> portfolioStocks;
	private Long ownerId;
	private double balance;
}
