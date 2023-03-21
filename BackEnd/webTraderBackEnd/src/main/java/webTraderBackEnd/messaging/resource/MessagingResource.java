package webTraderBackEnd.messaging.resource;

import java.security.Principal;
import java.util.Map;
import java.util.Set;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.GetConversationDTO;
import webTraderBackEnd.messaging.dtos.SendMessageDTO;
import webTraderBackEnd.messaging.service.MessagingService;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.service.UserService;

@RestController
@RequestMapping(path="/messaging")
@RolesAllowed({"ROLE_USER","ROLE_ADMIN"})
public class MessagingResource{	
	
	@Autowired
	MessagingService messagingService;

	@PostMapping(path="/startConversation")
	public ResponseEntity<Void> startConversation(@RequestBody Map<String,Integer> valueMap){
		int firstUserId = valueMap.get("firstUserId");
		int secondUserId = valueMap.get("secondUserId");
		messagingService.startConversation(firstUserId, secondUserId);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@PostMapping(path="/sendMessage")
	public ResponseEntity<Void> sendMessage(@RequestBody SendMessageDTO dto){
		messagingService.sendMessage(dto);
		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}
	
	@GetMapping(path="/getConversations")
	public ResponseEntity<Set<GetConversationDTO>> getConversation(Principal principal){
		System.out.println("PRINCIPAL ID " + principal.getName());
		return new ResponseEntity<Set<GetConversationDTO>>(messagingService.getConversationsByUserId(Long.parseLong(principal.getName())),HttpStatus.ACCEPTED);
	}
}
