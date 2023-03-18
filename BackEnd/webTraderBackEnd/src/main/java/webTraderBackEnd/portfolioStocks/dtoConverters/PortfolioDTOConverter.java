package webTraderBackEnd.portfolioStocks.dtoConverters;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;

@AllArgsConstructor
@Component
public class PortfolioDTOConverter{
	
	@Autowired
	private PortfolioStockDTOConverter portfolioStockDTOConverter;
	
	
	public PortfolioDTO convert(Portfolio portfolio){
		return new PortfolioDTO(
				portfolio.getId(),
				portfolio.getPortfolioStocks()
				.stream()
				.map(
						stock -> portfolioStockDTOConverter.convert(stock))
				.collect(Collectors.toList()),
				portfolio.getUser().getId(),
				portfolio.getBalance()
				);
	}

}
