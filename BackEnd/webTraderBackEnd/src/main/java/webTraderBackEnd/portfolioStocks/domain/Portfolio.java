package webTraderBackEnd.portfolioStocks.domain;

import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.util.List;
import java.util.Set;import java.util.stream.Collector;
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
import lombok.Setter;
import webTraderBackEnd.portfolioStocks.exceptions.MultiplePortfolioStocksWithSameNameException;
import webTraderBackEnd.portfolioStocks.exceptions.NotEnoughFundsException;
import webTraderBackEnd.portfolioStocks.exceptions.PortfolioStockNotFound;
import webTraderBackEnd.user.domain.User;

@Setter
@Getter
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
	
	private void changeBalance(String operationType,double totalSumOfOperation){
		if(operationType.equals("BUY")){
			balance = balance - totalSumOfOperation;
		}else{
			balance = balance + totalSumOfOperation;
		}
	}
	
	public void implementBuyingOperation(String symbol, int quantity,double price){
		if( balance < quantity * price ) throw new NotEnoughFundsException("Not enough funds to finish the transaction");
		
		changeBalance("BUY", price * quantity);
		addNewStock(symbol, quantity, price);
	}
	
	public void implementSellingOperation(String symbol, int quantity, double price){
		int amountOfSameStockInPortfolio = getAmountOfStockInsidePortfolio(symbol);
		if(amountOfSameStockInPortfolio < quantity) throw new PortfolioStockNotFound();
		
		changeBalance("SELL", price * quantity);
		removeStock(symbol, quantity);
	}
	
	public int getAmountOfStockInsidePortfolio(String symbol){
		String symbolName = symbol.trim().toUpperCase();
		
		List<PortfolioStock> foundStocksWithSameNameAsNewStock = portfolioStocks.stream()
		.filter(stock -> stock.getSymbol().equals(symbolName))
		.collect(Collectors.toList());
		
		return foundStocksWithSameNameAsNewStock.size();
	}
	
	private void addNewStock(String symbol, int quantity,double price){
		PortfolioStock newStock = new PortfolioStock(symbol,quantity,price,this);
		Set<PortfolioStock> stocksAlreadyInPortfolio = this.portfolioStocks;
		portfolioStocks.add(newStock);
	}
	
	private PortfolioStock checkIfTheSameStockAndRemoveIfIs(PortfolioStock portfolioStock,String symbol,int remainingStocksToBeRemoved;){
		PortfolioStock newPortfolioStock = portfolioStock;
		if(portfolioStock.getSymbol().equals(symbol)){
			if(portfolioStock.getQuantity() >= remainingStocksToBeRemoved){
				newPortfolioStock.setQuantity(portfolioStock.getQuantity() - remainingStocksToBeRemoved);
				return newPortfolioStock;
			}else{
				newPortfolioStock.setQuantity(0);
				remainingStocksToBeRemoved = 
			}
		}
	}
	
	public void removeStock(String symbol,int quantity){
		String cleanedStockToRemoveName = symbol.trim().toUpperCase();
		// loop through stocks and reduce number of stocks with symbol name of 'symbol' with quantity
		int remainingStocksToBeRemoved = quantity;
		Set<PortfolioStock> renewedPortfolioStocks = this.portfolioStocks.stream().map(stock -> stock).collect(Collectors.toSet());
		//TODO: loop through the stocks and delete 'quantity' amount of them.
		//TODO: There can be multiple stocks with same name, so have to loop through them 
		//TODO:: and keep in memory remaining number of stocks that should be removed.
		//TODO: Afterwards loop through the set of portfolioStocks and filter out the ones with quantity = 0
		
	}
	
	
	}
