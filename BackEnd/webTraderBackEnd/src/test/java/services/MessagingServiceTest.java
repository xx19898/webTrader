package services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;

import webTraderBackEnd.WebTraderBackEndApplication;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.dtos.GetConversationDTO;
import webTraderBackEnd.messaging.service.MessagingService;
import webTraderBackEnd.messaging.utility.GetConversationDTOConversationSetter;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.repository.UserRepo;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;
import webTraderBackEnd.user.service.UserService;

@SpringBootTest
@ContextConfiguration(classes=WebTraderBackEndApplication.class)
public class MessagingServiceTest{
	@Autowired
	GetConversationDTOConversationSetter getConversationDTOConversationSetter;
	
	
	@Test
	public void testGetConversationDTO() {
AdminUsernameAndId firstAdmin = new AdminUsernameAndId(){
			
			@Override
			public String getUsername(){
				// TODO Auto-generated method stub
				return "firstAdmin";
			}
			
			@Override
			public long getUser_Id(){
				// TODO Auto-generated method stub
				return 1;
			}
		};
		
			AdminUsernameAndId secondAdmin = new AdminUsernameAndId() {
			
			@Override
			public String getUsername(){
				// TODO Auto-generated method stub
				return "secondAdmin";
			}
			
			@Override
			public long getUser_Id(){
				// TODO Auto-generated method stub
				return 2;
			}
		};
		
		User user = new User("user1",(long) 0);
		User userFirstAdmin = new User(firstAdmin.getUsername(),firstAdmin.getUser_Id());
		User userSecondAdmin = new User(firstAdmin.getUsername(),secondAdmin.getUser_Id());
		Conversation firstConversation = new Conversation(userFirstAdmin,user);
		user.addConversation(firstConversation);
		
		Set<AdminUsernameAndId> adminsWithUsernamesAndIds = Arrays.asList(firstAdmin,secondAdmin).stream().collect(Collectors.toSet());
		Set<Conversation> conversations = new HashSet<Conversation>();
		conversations.add(firstConversation);
		GetConversationDTO firstDTO = getConversationDTOConversationSetter.setConversationOnGetConversationDTO(firstAdmin, conversations);
		GetConversationDTO secondDTO = getConversationDTOConversationSetter.setConversationOnGetConversationDTO(secondAdmin, conversations);

		System.out.println("FINISHED");
		assertEquals(firstDTO.getAdminUsername(),"firstAdmin");
		assertEquals(secondDTO.getConversation(),null);
	}
	
	

}
