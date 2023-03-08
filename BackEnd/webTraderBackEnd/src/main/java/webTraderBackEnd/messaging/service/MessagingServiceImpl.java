package webTraderBackEnd.messaging.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.GetConversationDTO;
import webTraderBackEnd.messaging.exceptions.ConversationNotFoundException;
import webTraderBackEnd.messaging.repository.ConversationRepo;
import webTraderBackEnd.messaging.repository.MessageRepo;
import webTraderBackEnd.messaging.utility.GetConversationDTOConversationSetter;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;
import webTraderBackEnd.user.service.UserService;


@Service
public class MessagingServiceImpl implements MessagingService{
	
	public MessagingServiceImpl(GetConversationDTOConversationSetter getConversationDTOConversationSetter,UserService userService,ConversationRepo conversationRepo,MessageRepo messageRepo,UserRepo userRepo){
		this.conversationRepo = conversationRepo;
		this.getConversationDTOConversationSetter = getConversationDTOConversationSetter;
		this.messageRepo = messageRepo;
		this.userRepo = userRepo;
		this.userService = userService;
	}
	
	@Autowired
	GetConversationDTOConversationSetter getConversationDTOConversationSetter;
	
	@Autowired
	ConversationRepo conversationRepo;
	
	@Autowired 
	MessageRepo messageRepo;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	UserService userService;
	
	@Override
	public Conversation startConversation(long firstUserId, long secondUserId){
		Optional<User> firstUser = userRepo.findById(firstUserId);
		Optional<User> secondUser = userRepo.findById(secondUserId);
		if(!(firstUser.isPresent() && secondUser.isPresent())) throw new UserNotFoundException("Sorry, one or more users are not found when trying to create a new convo :/");
		Conversation newConversation = new Conversation(firstUser.get(),secondUser.get());
		Conversation savedConversation = conversationRepo.save(newConversation);
		return savedConversation;
	}
	
	@Override
	public Conversation getConversationByConversationId(long conversationId){
		Optional<Conversation> conversation = conversationRepo.findById(conversationId);
		if (conversation.isEmpty()){
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
	
	@Override
	public Set<GetConversationDTO> getConversationsByUserId(long userId){
		Set <AdminUsernameAndId> adminsWithUsernamesAndIds = userRepo.findUsersWithAdminRole();
		System.out.println("ADMIN USERNAME " + adminsWithUsernamesAndIds.iterator().next().getUser_Id());
		Set<Conversation> conversations = userRepo.findById(userId).get().getConversations();
		Set<GetConversationDTO> adminsAndConversations = adminsWithUsernamesAndIds.stream().
				map( adminObjectWithoutConversation -> getConversationDTOConversationSetter.setConversationOnGetConversationDTO(adminObjectWithoutConversation, conversations)).collect(Collectors.toSet());
		return adminsAndConversations;
	}
}

