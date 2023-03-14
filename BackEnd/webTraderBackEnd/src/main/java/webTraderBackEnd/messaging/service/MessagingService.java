package webTraderBackEnd.messaging.service;

import java.util.Set;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.GetConversationDTO;
import webTraderBackEnd.messaging.dtos.SendMessageDTO;

public interface MessagingService{
	public Conversation sendMessage(SendMessageDTO dto);
	public Conversation startConversation(long firstUserId,long secondUserId);
	public Conversation getConversationByConversationId(long conversationId);
	public Set<GetConversationDTO> getConversationsByUserId(long userId);
}
