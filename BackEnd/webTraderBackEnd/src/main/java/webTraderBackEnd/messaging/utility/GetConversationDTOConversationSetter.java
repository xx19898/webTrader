package webTraderBackEnd.messaging.utility;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.ConversationDTO;
import webTraderBackEnd.messaging.dtos.GetConversationDTO;
import webTraderBackEnd.messaging.dtos.MessageDTO;
import webTraderBackEnd.messaging.DtoConverters.MessageToDTOConverter;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;

@NoArgsConstructor
@Component
public class GetConversationDTOConversationSetter{
	public GetConversationDTOConversationSetter(MessageToDTOConverter messageToDtoConverter){
		this.messageToDtoConverter = messageToDtoConverter;
	}
	
	@Autowired
	private MessageToDTOConverter messageToDtoConverter;
	
	public GetConversationDTO setConversationOnGetConversationDTO(AdminUsernameAndId adminUsernameAndId,Set<Conversation> conversations){
		List <Conversation> convoList = conversations.stream().filter(conversation -> conversation.userIsParticipant( (int) adminUsernameAndId.getUser_Id() )).collect(Collectors.toList());
		if(convoList.size() == 0) { return new GetConversationDTO((int) adminUsernameAndId.getUser_Id(), adminUsernameAndId.getUsername()); }
		Conversation convo = convoList.get(0);
		List<MessageDTO> messages = convo.getMessages().stream().map(message -> messageToDtoConverter.convertMessageToDTO(message)).collect(Collectors.toList());
		return new GetConversationDTO((int) adminUsernameAndId.getUser_Id(), adminUsernameAndId.getUsername(), new ConversationDTO(messages,(int) convo.getId(),convo.getParticipantsUsernames()));
		//TODO: write a class scheme for starting messaging, finish creating conversationDTO
	}
}
