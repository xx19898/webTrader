package webTraderBackEnd.user.dtoConverters;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.dtoConverters.PortfolioDTOConverter;
import webTraderBackEnd.portfolioStocks.dtoConverters.StockDealDTOConverter;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.dto.UserDTO;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Component
public class UserDTOConverter{
	@Autowired 
	private PortfolioDTOConverter portfolioDTOConverter;
	
	@Autowired
	private StockDealDTOConverter stockDealDTOConverter;
	
	public UserDTO convert(User user){
		PortfolioDTO portfolio;
		if(user.getPortfolio() == null) portfolio = null;
		else {
			portfolio = portfolioDTOConverter.convert(user.getPortfolio());
		}
		return new UserDTO(
				user.getId(),
				user.getUsername(),
				portfolio,
				user.getStockDeals()
				.stream()
				.map(stockDeal -> stockDealDTOConverter.convert(stockDeal))
				.collect(Collectors.toList())
				);			
	}
	
	
	
	
}
