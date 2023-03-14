package webTraderBackEnd.messaging.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webTraderBackEnd.user.domain.User;

@Getter	
@Entity
@Setter
@NoArgsConstructor
public class Message{
	public Message(
			String message,
			Date date, 
			Conversation conversation,
			User sender)
	{
		this.message = message;
		this.conversation = conversation;
		this.date = date;
		this.sender = sender;
	}
	
	public Message(
			String message,
			Date date, 
			Conversation conversation,
			User sender,
			Message replyTo)
	{
		this.message = message;
		this.conversation = conversation;
		this.date = date;
		this.sender = sender;
		this.replyTo = replyTo;
	}
	
	private Date date;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Message replyTo;
	
	private String message;
	
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Conversation conversation;
	
	@OneToOne()
	private User sender;
	
}
