package webTraderBackEnd.messaging.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import webTraderBackEnd.messaging.domain.Message;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class SendMessageDTO{
	private Long conversationId;
	private String senderId;
	private String message;
	private Long replyTo;
}
