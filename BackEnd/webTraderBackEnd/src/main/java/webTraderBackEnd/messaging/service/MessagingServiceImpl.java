package webTraderBackEnd.messaging.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.exceptions.ConversationNotFoundException;
import webTraderBackEnd.messaging.repository.ConversationInsertRepo;
import webTraderBackEnd.messaging.repository.ConversationRepo;
import webTraderBackEnd.messaging.repository.MessageRepo;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;


@Service
public class MessagingServiceImpl implements MessagingService{
	
	
	@Autowired
	ConversationRepo conversationRepo;
	
	@Autowired 
	ConversationInsertRepo conversationInsertRepo;
	
	@Autowired 
	MessageRepo messageRepo;
	
	@Autowired
	UserRepo userRepo;
	
	public MessagingServiceImpl(ConversationRepo conversationRepo,MessageRepo messageRepo,ConversationInsertRepo conversationInsertRepo,UserRepo userRepo){
		this.conversationInsertRepo = conversationInsertRepo;
		this.messageRepo = messageRepo;
		this.userRepo = userRepo;
		this.conversationRepo = conversationRepo;
	}
	
	@Override
	public Conversation startConversation(long firstUserId, long secondUserId){
		Optional<User> firstUser = userRepo.findById(firstUserId);
		Optional<User> secondUser = userRepo.findById(secondUserId);
		if(!(firstUser.isPresent() && secondUser.isPresent())) throw new UserNotFoundException("Sorry, one or more users are not found when trying to create a new convo :/");
		Conversation newConversation = new Conversation(firstUser.get(),secondUser.get());
		conversationInsertRepo.insertWithQuery(newConversation);
		return newConversation;
	}
	
	@Override
	public Conversation getConversation(long conversationId) {
		Optional<Conversation> conversation = conversationRepo.findById(conversationId);
		if (conversation.isEmpty()) {
			throw new ConversationNotFoundException("Sought conversation is not found");
		}
		return conversation.get();
	}
	
	
	@Transactional
	@Override
	public Conversation sendMessage(long conversationId, Message message){
		Optional<Conversation> conversationWrapper = conversationRepo.findById(conversationId);
		if(conversationWrapper.isEmpty()) throw new ConversationNotFoundException("Conversation with id:" + conversationId + " is not found");
		Conversation conversation = conversationWrapper.get();
		conversation.addNewMessage(message);
		return conversation;
	}

}
