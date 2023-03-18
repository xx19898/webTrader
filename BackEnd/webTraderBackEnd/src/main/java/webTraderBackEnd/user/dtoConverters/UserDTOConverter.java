package webTraderBackEnd.user.dtoConverters;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webTraderBackEnd.portfolioStocks.dtoConverters.PortfolioDTOConverter;
import webTraderBackEnd.portfolioStocks.dtoConverters.StockDealDTOConverter;
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
		return new UserDTO(
				user.getId(),
				user.getUsername(),
				portfolioDTOConverter.convert(user.getPortfolio()),
				user.getStockDeals()
				.stream()
				.map(stockDeal -> stockDealDTOConverter.convert(stockDeal))
				.collect(Collectors.toList())
				);			
	}
	
	
	
	
}
