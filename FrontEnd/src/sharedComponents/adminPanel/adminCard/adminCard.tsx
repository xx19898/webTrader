import useAnimatedDropdown from "../../../pages/mainPage/adminMain/useAnimatedDropdown"
import {useRef} from 'react'
import { RootState } from "../../../store"
import StartConvoIcon from "../../../icons/startConvoIcon"
import Chat from "../../chat/chat"
import { Conversation, Message } from "../../../state/messaging/messagingZodSchemas"
import axios from "axios"
import { BASE_URL } from "../../../constants/urls"
import { useAppDispatch, useAppSelector } from "../../../reduxHooks"
import { AnyAction, Dispatch } from "redux"


interface IAdminCard{
    conversation: Conversation,
    adminId: number,
    adminUsername: string,
}


export default ({adminId,adminUsername,conversation}:IAdminCard) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.users.userId)
    const accessToken = useAppSelector(state => state.users.accessToken)
    
    return(
        <li className="flex flex-col justify-center items-center my-[40px]">
                <h2 className="text-center text-white text-[40px] font-semibold mb-2">{adminUsername}</h2>
                <section>
                <Chat messages={conversation.messages as Message[]} otherUser={adminUsername} conversationId={conversation.conversationId} />
                </section>
        </li>
    )}

    async function startConversation(accessToken:string,firstId:number,secondId:number,dispatch:Dispatch<AnyAction>){
        const serverResponse = await axios({
            method:'post',
            url: BASE_URL + "messaging/startConversation",
            data:{
                firstUserId: firstId,
                secondUserId: secondId,
            },
            withCredentials: true,
            headers:  {
                Authorization:accessToken,
            }
    })
        dispatch({type:'UPDATE_CONVERSATIONS'})
    }

