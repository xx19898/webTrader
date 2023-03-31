package webTraderBackEnd.portfolioStocks.domain;

import java.time.Instant;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.assertj.core.util.Arrays;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webTraderBackEnd.user.domain.User;

@Setter
@Getter
@Entity
@Table
@NoArgsConstructor
public class StockDeal{
	
	@JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
	public StockDeal(@JsonProperty("symbol") String symbol,
					@JsonProperty("quantity") int quantity,
					@JsonProperty("price") double price,
					@JsonProperty("operation_type") String operationType){
		this.symbol = symbol;
		this.quantity = quantity;
		this.stockPriceAtTheAcquirement = price;
		this.operationType = operationType;
	}
	
	public StockDeal(
			String symbol,
			String status,
			int quantity,
			double price,
			String operationType,
			User user)
	{
		this.symbol = symbol;
		this.dealStatus = status;
		this.quantity = quantity;
		this.stockPriceAtTheAcquirement = price;
		this.operationType = operationType;
		this.user = user;
	}
	
	private String symbol;
	
	public static boolean dealStatusValueIsCorrect(String value){
		String[] possibleValues = {"PENDING","CANCELLED","APPROVED","DISAPPROVED"};
		boolean valueIsCorrect = Arrays.asList(possibleValues).stream().anyMatch(member -> member.equals(value));
		return valueIsCorrect;
	}
	
	public static boolean operationTypeValueIsCorrect(String value){
		String[] possibleValues = {"BUY","SELL"};
		boolean valueIsCorrect = Arrays.asList(possibleValues).stream().anyMatch(member -> member.equals(value));
		return valueIsCorrect;
	}
	
	public void cancelDeal(){
		this.operationType = "CANCELLED";
	}
	
	private int quantity;
	
	private double stockPriceAtTheAcquirement;

	private String dealStatus;
	
	private String operationType;
	
	@CreationTimestamp
	private Instant createdDate;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
}
