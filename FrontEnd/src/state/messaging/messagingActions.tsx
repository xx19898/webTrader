import axios from "axios"
import { BASE_URL } from "../../constants/urls"
import { getConversationApiResponse } from "./messagingZodSchemas"


export async function updateConversations(accessToken:string,userId:number){
    const apiResponse = await axios.get(`${BASE_URL}messaging/getConversations`,{
        headers:{
            Authorization: accessToken,
        },
        withCredentials:true,
    })

    return getConversationApiResponse.parse(apiResponse.data)
} 