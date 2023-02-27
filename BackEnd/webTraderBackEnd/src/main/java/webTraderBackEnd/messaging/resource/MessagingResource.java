package webTraderBackEnd.messaging.resource;

import java.util.Map;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.SendMessageDTO;
import webTraderBackEnd.messaging.service.MessagingService;

@RestController
@RequestMapping(path="/messaging")
@RolesAllowed("ROLE_USER")
public class MessagingResource{
	
	
	@Autowired
	MessagingService messagingService;
	
	
	@PostMapping(path="/startConversation")
	public ResponseEntity<Void> startConversation(Map<String,Integer> valueMap){
		int firstUserId = valueMap.get("firstUserId");
		int secondUserId = valueMap.get("secondUserId");
		messagingService.startConversation(firstUserId, secondUserId);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@PostMapping(path="/sendMessage")
	public ResponseEntity<Message> startConversation(@RequestBody SendMessageDTO dto){
		messagingService.sendMessage(dto.getConversationId(),dto.getMessage());
		return new ResponseEntity<Message>(dto.getMessage(),HttpStatus.ACCEPTED);
	}
	
	@GetMapping(path="/")
	public ResponseEntity<Conversation> getConversation(@RequestBody int conversationId){
		return new ResponseEntity<Conversation>(messagingService.getConversation(conversationId),HttpStatus.ACCEPTED);
	}

}
