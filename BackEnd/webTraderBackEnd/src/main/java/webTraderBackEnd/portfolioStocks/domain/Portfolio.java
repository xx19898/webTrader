package webTraderBackEnd.portfolioStocks.domain;

import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.util.ArrayList;
import java.util.Comparator;
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
	
	public Portfolio(User user,Set<PortfolioStock> portfolioStocks,double balance){
		this.user = user;
		this.portfolioStocks = portfolioStocks;
		this.balance = balance;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@OneToMany(fetch = FetchType.LAZY)
	private Set<PortfolioStock> portfolioStocks;
	
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
		
		int sum = foundStocksWithSameNameAsNewStock.stream().map(stock -> stock.getQuantity()).collect(Collectors.toList()).stream().reduce(0, (a,b) -> a + b);
		
		return sum;
	}
	
	public void addNewStock(PortfolioStock newStock){
		this.portfolioStocks.add(newStock);
	}
	
	private void addNewStock(String symbol, int quantity,double price){
		PortfolioStock newStock = new PortfolioStock(symbol,quantity,price,this);
		portfolioStocks.add(newStock);
	}

	public void removeStock(String symbol,int quantity){
		
		List<PortfolioStock> portfolioStocksWithSameSymbol = this.portfolioStocks
				.stream()
				.filter(portfolioStock -> portfolioStock.getSymbol().equals(symbol))
				.collect(Collectors.toList());
		
		portfolioStocksWithSameSymbol.sort(new Comparator<PortfolioStock>() {
			@Override
			public int compare(PortfolioStock p1,PortfolioStock p2){
				if(p1.getPriceAtAcquirement() == p2.getPriceAtAcquirement()) {
					return 0;
				}else if(p1.getPriceAtAcquirement() < p2.getPriceAtAcquirement()){
					return -1;
				}else{
					return 1;
				}
			}
		});
		
		int stocksToRemove = quantity;
		int index = 0;
		while(stocksToRemove > 0){
			int currQuantity = portfolioStocksWithSameSymbol.get(index).getQuantity();
			if(currQuantity > stocksToRemove){
				portfolioStocksWithSameSymbol.get(index).setQuantity(currQuantity - stocksToRemove);
				stocksToRemove = 0;
			}else{
				portfolioStocksWithSameSymbol.get(index).setQuantity(0);
				stocksToRemove = stocksToRemove - currQuantity;
				index++;
			}
		}
		
		List<PortfolioStock> portfolioStocksWithoutSameSymbol = this.portfolioStocks
				.stream().filter(portfolioStock -> !portfolioStock.getSymbol().equals(symbol))
				.collect(Collectors.toList());
		
		portfolioStocksWithSameSymbol = portfolioStocksWithSameSymbol
				.stream()
				.filter(stock -> stock.getQuantity() != 0).collect(Collectors.toList());
		
		List<PortfolioStock> unitedList = new ArrayList<>();
		unitedList.addAll(portfolioStocksWithoutSameSymbol);
		unitedList.addAll(portfolioStocksWithSameSymbol);
		this.portfolioStocks = unitedList
				.stream()
				.collect(Collectors.toSet());
		}
	}
