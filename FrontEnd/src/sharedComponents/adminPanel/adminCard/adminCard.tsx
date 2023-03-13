import useAnimatedDropdown from "../../../pages/mainPage/adminMain/useAnimatedDropdown"
import {useRef} from 'react'
import { RootState } from "../../../store"
import { AdminDataForAdminPanel } from "../adminPanel"
import StartConvoIcon from "../../../icons/startConvoIcon"
import Chat from "../../chat/chat"
import { Conversation, Message } from "../../../state/messaging/messagingZodSchemas"
import axios from "axios"
import { BASE_URL } from "../../../constants/urls"
import { useAppDispatch, useAppSelector } from "../../../reduxHooks"
import { AnyAction, Dispatch } from "redux"


interface IAdminCard{
    conversation?: Conversation,
    adminId: number,
    adminUsername: string,
}


export default ({adminId,adminUsername,conversation}:IAdminCard) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.users.userId)
    const accessToken = useAppSelector(state => state.users.accessToken)
    if(conversation === undefined){
        return(
            <li className="flex flex-col justify-center items-center bg-darker-secondary-2 rounded-lg py-3 px-2">
                <h2 className="text-white text-lg font-semibold mb-2">{adminUsername}</h2>
                <button onClick={() => startConversation(accessToken as string,adminId,userId as number,dispatch,)} className="text-white p-1 px-2 border-solid border border-white">
                    Start Conversation
                </button>
            </li>
        )} 
    else{
        return(
        <li className="flex flex-col justify-center items-center">
                <h2 className="text-center text-white font-semibold text-lg">{conversation.conversationId}</h2>
                <section>
                <Chat messages={conversation.messages as Message[]} otherUser={conversation.participants[0]} conversationId={conversation.conversationId} />
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

}