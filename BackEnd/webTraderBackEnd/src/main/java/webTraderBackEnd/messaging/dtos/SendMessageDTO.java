package webTraderBackEnd.messaging.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import webTraderBackEnd.messaging.domain.Message;

@AllArgsConstructor
@Getter
public class SendMessageDTO {
	
	Long conversationId;
	Message message;

}
