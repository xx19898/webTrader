package webTraderBackEnd.messaging.DtoConverters;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.dtos.ConversationDTO;
import webTraderBackEnd.messaging.dtos.ParticipantDTO;

@NoArgsConstructor
@AllArgsConstructor
@Component
public class ConversationToConversationDTOConverter{
	@Autowired
	MessagesToDTOConverter messagesConverter;
	
	public Set<ConversationDTO> convertConversationToConversationDTO(Set<Conversation> conversations){
		Set<ConversationDTO> resultingObject = conversations
				.stream()
				.map(conversation -> new ConversationDTO(messagesConverter.convertMessagesToDTO(conversation.getMessages()),conversation.getId(),conversation.getParticipants()
						.stream()
						.map(participant -> new ParticipantDTO(participant.getId(),participant.getUsername())).collect(Collectors.toList()))).collect(Collectors.toSet());
		
		return resultingObject;
	}
}
