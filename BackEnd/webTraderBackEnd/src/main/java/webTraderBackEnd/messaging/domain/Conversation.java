package webTraderBackEnd.messaging.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.exceptions.MessageNotBelongingToAnyAllowedSenderException;
import webTraderBackEnd.user.domain.User;




@Getter	
@Entity
@NoArgsConstructor
public class Conversation{
	
	public Conversation(User firstParticipant,User secondParticipant){
		this.participants = new ArrayList<User>(Arrays.asList(firstParticipant,secondParticipant));
		this.messages = new HashSet<Message>();
	}
	
	
	
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;
	
	@CreatedDate
	private Instant createdDate;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private List<User> participants;
	
	public List<String> getParticipantsUsernames() {
		return this.participants.stream().map(participant -> participant.getUsername()).collect(Collectors.toList());
	}
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER, mappedBy = "conversation")
	private Set<Message> messages;
	
	
	
	public boolean userIsParticipant(int userId){
		boolean userIsParticipant = this.participants.stream().anyMatch( user -> user.getId() == userId);
		return userIsParticipant;
	}	
	
	
	public void addNewMessage(Message newMessage){
		String errorMessage = "Message does not belong in this conversation as it's sender id does correlate to either of participants. Participants of the convo are: " + participants.get(0).getId() + " and " + participants.get(1).getId() + ". And message senders Id is: " + newMessage.getSender().getId();
		if(!(newMessage.getSender().getId() == participants.get(0).getId() || newMessage.getSender().getId() == participants.get(1).getId())) throw new MessageNotBelongingToAnyAllowedSenderException(errorMessage);
		this.messages.add(newMessage);
	}	
}
