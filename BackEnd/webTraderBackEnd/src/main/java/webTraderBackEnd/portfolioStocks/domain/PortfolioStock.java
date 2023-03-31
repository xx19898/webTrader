package webTraderBackEnd.portfolioStocks.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name="portfolio_stocks")
@NoArgsConstructor
public class PortfolioStock{
	
	@JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
	public PortfolioStock( @JsonProperty("symbol") String symbol,@JsonProperty("quantity") int quantity,@JsonProperty("price") double price,@JsonProperty("portfolio") Portfolio portfolio){
		this.symbol = symbol;
		this.quantity = quantity;
		this.priceAtAcquirement = price;
		this.portfolio = portfolio;
	}
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Getter
	@Column(nullable=false)
	private String symbol;
	
	@Setter
	@Getter
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(referencedColumnName = "id")
	private Portfolio portfolio;
	
	@Getter
	@Column(nullable = false)
	private double priceAtAcquirement;
	
	@Getter
	@Setter
	@Column(nullable = false)
	private int quantity;
	
}
