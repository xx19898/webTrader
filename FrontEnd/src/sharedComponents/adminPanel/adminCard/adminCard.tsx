import useAnimatedDropdown from "../../../pages/mainPage/adminMain/useAnimatedDropdown"
import {useRef} from 'react'
import { AdminDataForAdminPanel } from "../adminPanel"
import StartConvoIcon from "../../../icons/startConvoIcon"
import Chat from "../../chat/chat"
import { Conversation, Message } from "../../../state/messaging/messagingZodSchemas"


interface IAdminCard{
    conversation?: Conversation,
    adminId: number,
    adminUsername: string,
}


export default ({adminId,adminUsername,conversation}:IAdminCard) => {
    
    if(conversation === undefined){
        return(
            <li className="flex flex-col justify-center items-center">
                <button>Start Conversation</button>
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
}