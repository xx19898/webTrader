package webTraderBackEnd.messaging.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.dtos.ConversationDTO;
import webTraderBackEnd.messaging.repository.ConversationRepo;

public class AdminMessagingServiceImpl implements AdminMessagingService{
	
	
	public AdminMessagingServiceImpl(ConversationRepo convRepo) {
		
	}
	
	@Autowired
	private ConversationRepo convRepo;
	
	@Override
	public List<ConversationDTO> getConversationsWithCertainAdmin(Long id){
//		Optional<Conversation> conversations = convRepo.;
		List<ConversationDTO> mockList = new ArrayList<ConversationDTO>();
		return mockList;
	}

}
