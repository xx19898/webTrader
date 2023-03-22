package webTraderBackEnd.messaging.DtoConverters;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.MessageDTO;

@NoArgsConstructor
@Component
public class MessagesToDTOConverter{
	public List<MessageDTO> convertMessagesToDTO(Set<Message> messages){
		List<MessageDTO> resultingDTOS = messages.stream().map(message -> convertMessageToDTO(message)).collect(Collectors.toList());
		return resultingDTOS;
	}
	
	private MessageDTO convertMessageToDTO(Message message){
		MessageDTO replyTo = null;
	//	System.out.println("Converted message:" + message.getMessage());
		if(message.getReplyTo() != null) replyTo = convertMessageToDTO(message.getReplyTo());
		MessageDTO createdDto = new MessageDTO(message.getMessage(), message.getSender().getUsername(), message.getDate(), message.getId(), replyTo);
		return createdDto;
	}

}
