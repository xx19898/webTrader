package webTraderBackEnd.messaging.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class startConversationDTO{
	private int firstUserId;
	private int secondUserId; 
}
