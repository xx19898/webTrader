package webTraderBackEnd.portfolioStocks.dtoConverters;

import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

@NoArgsConstructor
@Component
public class StockDealDTOConverter{
	public StockDealDTO convert(StockDeal stockDeal){
		return new StockDealDTO(
				stockDeal.getQuantity(),
				stockDeal.getStockPriceAtTheAcquirement(),
				stockDeal.getDealStatus(),
				stockDeal.getOperationType(),
				stockDeal.getCreatedDate(),
				stockDeal.getId(),
				stockDeal.getUser().getUsername(),
				stockDeal.getUser().getId());			
	}

}
