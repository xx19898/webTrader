package webTraderBackEnd.messaging.service;

import java.util.List;

import webTraderBackEnd.messaging.dtos.ConversationDTO;

public interface AdminMessagingService{
	public List<ConversationDTO> getConversationsWithCertainAdmin(Long id);
}
