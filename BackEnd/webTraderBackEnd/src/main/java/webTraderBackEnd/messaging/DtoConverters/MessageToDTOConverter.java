package webTraderBackEnd.messaging.DtoConverters;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Message;
import webTraderBackEnd.messaging.dtos.MessageDTO;

@NoArgsConstructor
@Component
public class MessageToDTOConverter{
	public MessageDTO convertMessageToDTO(Message message){
		MessageDTO replyTo = null;
		if(message.getReplyTo() != null) replyTo = convertMessageToDTO(message.getReplyTo());
		MessageDTO createdDto = new MessageDTO(message.getMessage(), message.getSender().getUsername(), message.getDate(), message.getId(), replyTo);
		return createdDto;
	}

}
