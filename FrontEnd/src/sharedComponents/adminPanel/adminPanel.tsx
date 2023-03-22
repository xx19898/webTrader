import axios from "axios"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../../constants/urls"
import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon"
import useAnimatedDropdown from "../../pages/mainPage/adminMain/useAnimatedDropdown"
import { useAppSelector } from "../../reduxHooks"
import { Conversation } from "../../state/messaging/messagingZodSchemas"
import AdminCard from "./adminCard/adminCard"


/*
const dispatch = useDispatch()
    const userId = 0
    const userName = 'user'
    const conversations:GetConversationApiResponse = [{
        adminId:1,
        adminUsername: 'admin1',
        conversations:{
            conversationId:1,
            messages:[{
                date: new Date(2010, 10, 9),
                id: 1,
                message: "hi",
                replyTo: undefined,
                senderUsername: 'user'
            }],
            participants: ['user','admin1']
        }
    },{
        adminId: 2,
        adminUsername: 'admin2',
        conversations:{
            conversationId:2,
            participants:['admin2','user'],
            messages:[{
                date: new Date(2012,9,10),
                id: 2,
                message: 'Hello',
                replyTo: undefined,
                senderUsername: 'admin2'
            }]
        },
    }] 
    const lastUpdated = new Date()
*/


//TODO: getConversation comes through to redux state from backend, next is getting ui part of adminPanel to work and then implementing the messaging functionality
export type AdminDataForAdminPanel = {
    adminId: number,
    adminName: string,
    conversation: Conversation
}

export type AdminsDataForAdminPanel = AdminDataForAdminPanel[]

export default () => {
    //TODO: mock the state and test that ui functionality for opening, closing and accessing the chat works as it should

    const dispatch = useDispatch()
    const userId = useAppSelector(state => state.users.userId)
    const userName = useAppSelector(state => state.users.loggedUser)
    const conversations = useAppSelector(state => state.messaging.conversations)
    const lastUpdated = useAppSelector(state => state.messaging.lastUpdated)

    useEffect(() => {
        if(lastUpdated === undefined) dispatch({type:'UPDATE_CONVERSATIONS'})
        else{
            const currentDateAndTime = new Date()
            const timeElapsedSinceLastUpdate = Math.abs(currentDateAndTime.getTime() - lastUpdated.getTime()) * 1000
            if(timeElapsedSinceLastUpdate > 60){
                dispatch({type:'UPDATE_CONVERSATIONS'})
            }
        }
    },[])

    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef,dropdownArrowRef})

    return(
        <>
         
            <div className="min-w-full p-2 px-4 flex flex-col justify-center items-center border border-white border-solid">
                <h2 className="text-white text-lg font-semibold mb-1">Admins</h2>
                {
                open ?  
                <ul ref={dropdownRef} className="mb-10">
                {
                    conversations.map(conversationInfo => {
                        return(
                            <AdminCard
                            adminId={conversationInfo.participants.find(participant => participant.participantId != userId)?.participantId as number}
                            adminUsername={conversationInfo.participants.find(participant => participant.participantId != userId)?.participantName as string}
                            conversation={conversationInfo}/>
                        )
                    })
                }
                </ul> : null

                }
                <DropDownArrowIcon onClickCallback={handleClick} height={10} ref={dropdownArrowRef} />
            </div>
               
        </>
    )

    function getAdminId(participantsIds: number[]){
        const adminId = participantsIds.find(id => id != userId)
        if(adminId === undefined) throw new Error("No admin id found")
        return adminId
    }

    function getAdminName(participantsNames: string[]){
        const adminName = participantsNames.find(name => name != userName)
        if(adminName === undefined) throw new Error("No admin name found")
        return adminName
    }
}