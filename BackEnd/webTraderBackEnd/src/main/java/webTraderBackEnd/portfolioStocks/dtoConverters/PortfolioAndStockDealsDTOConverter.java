package webTraderBackEnd.portfolioStocks.dtoConverters;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioAndStockDealsDTO;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

@Component
public class PortfolioAndStockDealsDTOConverter{
	@Autowired
	StockDealDTOConverter stockDealConverter;
	
	@Autowired
	PortfolioDTOConverter portfolioConverter;
	
	public PortfolioAndStockDealsDTO  convert(Portfolio portfolio, List<StockDeal> stockDeals){
		List<StockDealDTO> stockDealDTOs = stockDeals.stream().map(stockDeal -> stockDealConverter.convert(stockDeal)).collect(Collectors.toList());
		PortfolioDTO portfolioDTO = portfolioConverter.convert(portfolio);
		PortfolioAndStockDealsDTO finalObject = new PortfolioAndStockDealsDTO(portfolioDTO, stockDealDTOs);
		return finalObject;
	}

}
