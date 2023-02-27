package webTraderBackEnd.messaging.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import webTraderBackEnd.messaging.exceptions.MessageNotBelongingToAnyAllowedSenderException;
import webTraderBackEnd.user.domain.User;

@Getter	
@Entity
public class Conversation{
	
	public Conversation(User firstPart,User secondPart){
		this.firstPart = firstPart;
		this.secondPart = secondPart;
		this.messages = new ArrayList<Message>();
	}
	
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private User firstPart;
	
	@CreatedDate
	private Instant createdDate;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private User secondPart;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY, mappedBy = "id")
	private List<Message> messages;
	
	public void addNewMessage(Message newMessage){
		if(!(newMessage.getSender().getId() == firstPart.getId() || newMessage.getSender().getId() == secondPart.getId())) throw new MessageNotBelongingToAnyAllowedSenderException("Message does not belong in this conversation as it's sender id does correlate to either of participants");
		this.messages.add(newMessage);
	}
	
	
}
