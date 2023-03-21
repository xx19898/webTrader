package webTraderBackEnd.messaging.service;

import java.util.List;

import webTraderBackEnd.messaging.dtos.ConversationDTO;
import webTraderBackEnd.messaging.dtos.GetConversationDTOAdmin;

public interface AdminMessagingService{
	public List<GetConversationDTOAdmin> getConversationsWithCertainAdmin(Long id);
}
