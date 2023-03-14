package webTraderBackEnd.messaging.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import webTraderBackEnd.messaging.domain.Message;

@AllArgsConstructor
@Getter
public class ConversationDTO{
	private List<MessageDTO> messages;
	private int conversationId;
	private List<String> participants;
}
