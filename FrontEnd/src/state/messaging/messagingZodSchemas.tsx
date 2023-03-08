import { z } from "zod"


export const messageSchema:z.ZodType<Message> = z.object({
    message: z.string(),
    senderUsername: z.string(),
    date: z.date(),
    id: z.number(),
    replyTo: z.lazy(() => messageSchema)
})

export type Message = {
    message: string,
    senderUsername: string,
    date: Date,
    id: number,
    replyTo: Message
}

const conversationSchema = 
        z.object({
        messages:z.nullable(z.array(messageSchema)),
        conversationId: z.number(),
        participants: z.array(z.string())
    })

export type Conversation = z.infer<typeof conversationSchema>


export const getConversationApiResponse = z.array(
    z.object({
        adminId: z.number(),
        adminUsername: z.string(),
        conversations: z.optional(z.array(conversationSchema))
    })
)

export type GetConversationApiResponse = z.infer<typeof getConversationApiResponse>

