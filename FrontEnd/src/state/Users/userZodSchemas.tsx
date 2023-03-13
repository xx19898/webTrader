import { z } from "zod";
import { UserAuthority } from "./usersSlice";

const authoritiesSchema = z.array(z.enum(UserAuthority))
export type Authorities = z.infer<typeof authoritiesSchema>



export const loginResponseSchema = z.object({
    access_token: z.string(),
    logged_in_user: z.string(),
    logged_in_user_id: z.coerce.number(),
    authorities: authoritiesSchema,
})

export type loginResponseType = z.infer<typeof loginResponseSchema>