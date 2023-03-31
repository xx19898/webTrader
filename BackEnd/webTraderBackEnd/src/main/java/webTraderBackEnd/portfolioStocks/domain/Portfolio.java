package webTraderBackEnd.portfolioStocks.domain;



import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
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
import javax.transaction.Transactional;

import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webTraderBackEnd.portfolioStocks.exceptions.MultiplePortfolioStocksWithSameNameException;
import webTraderBackEnd.portfolioStocks.exceptions.NotEnoughFundsException;
import webTraderBackEnd.portfolioStocks.exceptions.PortfolioStockNotFound;
import webTraderBackEnd.user.domain.User;

@Setter
@Getter
@Entity
@Table(name="portfolios")
@NoArgsConstructor
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
	
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private Set<PortfolioStock> portfolioStocks;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id",referencedColumnName = "id")
	private User user;
	
	private double balance;
		
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
	}
