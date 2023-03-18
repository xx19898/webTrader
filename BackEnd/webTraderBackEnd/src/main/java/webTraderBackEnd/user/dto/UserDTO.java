package webTraderBackEnd.user.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO{
	private Long id;
	private String username;
	private PortfolioDTO portfolio;
	private List<StockDealDTO> stockDeals;
	
	
}
