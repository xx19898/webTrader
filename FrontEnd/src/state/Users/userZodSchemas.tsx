import { z } from "zod";


export const loginResponseSchema = z.object({
    access_token: z.string(),
    logged_in_user: z.string(),
})

export type loginResponseType = z.infer<typeof loginResponseSchema>