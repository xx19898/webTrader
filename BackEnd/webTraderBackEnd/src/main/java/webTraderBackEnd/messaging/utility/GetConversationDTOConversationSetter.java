package webTraderBackEnd.messaging.utility;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.dtos.GetConversationDTO;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;

@NoArgsConstructor
@Component
public class GetConversationDTOConversationSetter{
	public GetConversationDTO setConversationOnGetConversationDTO(AdminUsernameAndId adminUsernameAndId,Set<Conversation> conversations){
		List <Conversation> convoList = conversations.stream().filter(conversation -> conversation.userIsParticipant( (int) adminUsernameAndId.getUser_Id() )).collect(Collectors.toList());
		if(convoList.size() == 0) { return new GetConversationDTO((int) adminUsernameAndId.getUser_Id(), adminUsernameAndId.getUsername()); }
		return new GetConversationDTO((int) adminUsernameAndId.getUser_Id(), adminUsernameAndId.getUsername(), convoList.get(0));	
	}	
}
