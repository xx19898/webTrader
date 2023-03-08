import useAnimatedDropdown from "../../../pages/mainPage/adminMain/useAnimatedDropdown"
import {useRef} from 'react'
import { AdminDataForAdminPanel } from "../adminPanel"
import StartConvoIcon from "../../../icons/startConvoIcon"
import Chat from "../../chat/chat"
import { Conversation, Message } from "../../../state/messaging/messagingZodSchemas"




export default ({conversationId,messages,participants}:Conversation) => {
    
    return(
        <li className="flex flex-col justify-center items-center">
            <h2 className="text-center text-white font-semibold text-lg">{participants[0]}</h2>
            <section>
                <Chat messages={messages as Message[]} otherUser={participants[1]} conversationId={conversationId} />
            </section>
        </li>
    )
}