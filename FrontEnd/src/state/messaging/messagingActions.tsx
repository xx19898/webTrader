import axios from "axios"
import { BASE_URL } from "../../constants/urls"
import { conversationsSchema } from "./messagingZodSchemas"


export async function updateConversations(accessToken:string,userId:number){
    const apiResponse = await axios.get(`${BASE_URL}messaging/getConversations`,{
        headers:{
            Authorization: accessToken,
        },
        withCredentials:true,
    })

    return conversationsSchema.parse(apiResponse.data)
} 