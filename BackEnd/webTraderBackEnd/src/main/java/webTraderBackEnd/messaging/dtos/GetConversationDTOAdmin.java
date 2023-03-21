package webTraderBackEnd.messaging.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetConversationDTOAdmin{
	private long userId;
	private String username;
	private ConversationDTO conversation;
}
