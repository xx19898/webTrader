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
import webTraderBackEnd.user.domain.User;

@Getter	
@Entity
public class Message{
	public Message(
			Date date, 
			Conversation conversation,
			User sender)
	{
		this.conversation = conversation;
		this.date = date;
		this.sender = sender;
	}
	
	public Message(
			Date date, 
			Conversation conversation,
			User sender,
			Message replyTo)
	{
		this.conversation = conversation;
		this.date = date;
		this.sender = sender;
		this.replyTo = replyTo;
	}
	
	private Date date;
	
	@OneToMany(cascade = CascadeType.ALL)
	private Message replyTo;
	
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Conversation conversation;
	
	@OneToOne()
	private User sender;
	
}
