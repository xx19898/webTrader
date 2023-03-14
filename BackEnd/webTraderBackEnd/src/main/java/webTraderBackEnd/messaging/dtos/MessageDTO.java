package webTraderBackEnd.messaging.dtos;

import java.util.Date;

import org.springframework.context.annotation.Bean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MessageDTO{
	private String message;
	private String senderUsername;
	private Date date;
	private long id;
	private MessageDTO replyTo;
}
//TODO: create converter for converting messages to message dtos

