package webTraderBackEnd.messaging.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.DtoConverters.ConversationToConversationDTOConverter;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.ConversationDTO;
import webTraderBackEnd.messaging.dtos.SendMessageDTO;
import webTraderBackEnd.messaging.exceptions.ConversationNotFoundException;
import webTraderBackEnd.messaging.repository.ConversationRepo;
import webTraderBackEnd.messaging.repository.MessageRepo;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;
import webTraderBackEnd.user.service.UserService;

@AllArgsConstructor
@Service
public class MessagingServiceImpl implements MessagingService{
	
	@Autowired
	ConversationToConversationDTOConverter conversationToConversationDTOConverter;
	
	@Autowired
	ConversationRepo conversationRepo;
	
	@Autowired 
	MessageRepo messageRepo;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	UserService userService;
	
	@Transactional
	@Override
	public Conversation startConversation(long firstUserId, long secondUserId){
		Optional<User> firstUser = userRepo.findById(firstUserId);
		Optional<User> secondUser = userRepo.findById(secondUserId);
		if(!(firstUser.isPresent() && secondUser.isPresent())) throw new UserNotFoundException("Sorry, one or more users are not found when trying to create a new convo :/");
		Conversation newConversation = new Conversation(firstUser.get(),secondUser.get());
		firstUser.get().addConversation(newConversation);
		secondUser.get().addConversation(newConversation);
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
	public Conversation sendMessage(SendMessageDTO dto){
		Optional<Conversation> conversationWrapper = conversationRepo.findById(dto.getConversationId());
		if(conversationWrapper.isEmpty()) throw new ConversationNotFoundException("Conversation with id:" + dto.getConversationId() + " is not found");
		Conversation conversation = conversationWrapper.get();
		Date currentDate = new Date();
		Optional<User> sender = userRepo.findById(Long.parseLong(dto.getSenderId()));
		if(sender.isEmpty()) throw new UserNotFoundException("User not found when seeking sender of the new message");
		Message newMessage = new Message(dto.getMessage(),currentDate, conversation, sender.get());
		if(dto.getReplyTo() != null){
			Optional<Message> repliedMessageWrapper = messageRepo.findById(dto.getReplyTo());
			if(repliedMessageWrapper.isEmpty()) throw new UserNotFoundException("Replied user not found");
			newMessage.setReplyTo(repliedMessageWrapper.get());
		}
		conversation.addNewMessage(newMessage);
		return conversation;
	}
	
	@Override
	public Set<ConversationDTO> getConversationsByUserId(long userId){
		Set<Conversation> conversationsFromDB = userRepo.findById(userId).get().getConversations();
		System.out.println("Number of conversations: " + conversationsFromDB.size());
		//TODO: this returns all messages twice when getting messages for an admin, write new method for attaining messages specifically for the admin
		Set<ConversationDTO>  conversations = conversationToConversationDTOConverter.convertConversationToConversationDTO(conversationsFromDB);
		return conversations;
	}
}

