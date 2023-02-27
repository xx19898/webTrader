package webTraderBackEnd.messaging.service;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;

public interface MessagingService{
	public Conversation sendMessage(long conversationId,Message message);
	public Conversation startConversation(long firstUserId,long secondUserId);
	public Conversation getConversation(long conversationId);
}
