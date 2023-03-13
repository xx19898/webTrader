package webTraderBackEnd.messaging.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import webTraderBackEnd.messaging.domain.Conversation;

@AllArgsConstructor
@Getter
public class GetConversationDTO{
	private int adminId;
	private String adminUsername;
	private ConversationDTO conversation;
	
	public GetConversationDTO(int adminId,String adminUsername){
		this.adminId = adminId;
		this.adminUsername = adminUsername;
	}
	
	public void setConversation(ConversationDTO convo){
		this.conversation = convo;
	}
}
