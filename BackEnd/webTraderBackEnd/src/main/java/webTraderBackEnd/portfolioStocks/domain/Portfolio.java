package webTraderBackEnd.portfolioStocks.domain;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import webTraderBackEnd.portfolioStocks.exceptions.MultiplePortfolioStocksWithSameNameException;
import webTraderBackEnd.portfolioStocks.exceptions.PortfolioStockNotFound;
import webTraderBackEnd.user.domain.User;

@Entity
@Table(name="portfolios")
public class Portfolio{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@OneToMany(fetch = FetchType.LAZY)
	private Set<PortfolioStock> portfolioStocks;
	
	@Getter
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id",referencedColumnName = "id")
	private User user;
	
	private double balance;
	
	public void addNewStock(String symbol, int quantity,double price){
		PortfolioStock newStock = new PortfolioStock(symbol,quantity,price,this);
		Set<PortfolioStock> stocksAlreadyInPortfolio = this.portfolioStocks;
		
		String trimmedNewStockName = newStock.getSymbol().trim().toUpperCase();
		
		List<PortfolioStock> foundStocksWithSameNameAsNewStock = stocksAlreadyInPortfolio.stream()
		.filter(stock -> stock.getSymbol().equals(trimmedNewStockName))
		.collect(Collectors.toList());
		portfolioStocks.add(newStock);
		
	}
	
	public void removeStock(String symbol,int quantity){
		String cleanedStockToRemoveName = symbol.trim().toUpperCase();
		List<PortfolioStock> foundStocksWithSameNameAsStockToRemove = this.portfolioStocks
				.stream()
				.filter(portfolioStock -> portfolioStock.getSymbol().equals(cleanedStockToRemoveName))
				.collect(Collectors.toList());
		if(foundStocksWithSameNameAsStockToRemove.size() != 0){
			if(foundStocksWithSameNameAsStockToRemove.size() > 1) throw new MultiplePortfolioStocksWithSameNameException("found multiple stocks with same name in portfolio of the user: " + this.getUser().getUsername());
			foundStocksWithSameNameAsStockToRemove.get(0).setQuantity(foundStocksWithSameNameAsStockToRemove.get(0).getQuantity() - quantity);
		}else{
			throw new PortfolioStockNotFound("No such stocks found in the portfolio");
		}
	}	
}
