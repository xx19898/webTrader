import axios from "axios"
import { A } from "msw/lib/glossary-dc3fd077"
import { RefObject, useEffect, useRef, useState } from "react"
import { trackPromise, usePromiseTracker } from "react-promise-tracker"
import { useDispatch } from "react-redux"
import { z } from "zod"
import { BASE_URL } from "../../constants/urls"
import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon"
import useAnimatedDropdown from "../../pages/mainPage/adminMain/useAnimatedDropdown"
import { useAppSelector } from "../../reduxHooks"
import { Conversation } from "../../state/messaging/messagingZodSchemas"
import AdminCard from "./adminCard/adminCard"

const singleAdminData = z.object({
    user_Id:z.number(),
    username: z.string(),
})

type SingleAdminData = z.infer<typeof singleAdminData>

const adminData = z.array(singleAdminData)

type AdminDataForAdminPanel = z.infer<typeof adminData>

export type AdminsDataForAdminPanel = AdminDataForAdminPanel[]

type panelData = {
    adminInfo:{adminName: string,adminId: number},
    conversation: Conversation | undefined
}[]

export default () => {

    const dispatch = useDispatch()
    const userId = useAppSelector(state => state.users.userId)
    const userName = useAppSelector(state => state.users.loggedUser)
    const conversations = useAppSelector(state => state.messaging.conversations)
    const lastUpdated = useAppSelector(state => state.messaging.lastUpdated)
    const accessToken = useAppSelector(state => state.users.accessToken)

    const [panelData,setPanelData] = useState<panelData | null>(null)

    const promiseInProgress = usePromiseTracker()

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

    useEffect(() => {
        trackPromise(
            attainAdminInfoFromDB(accessToken as string)
        )
    },[conversations])

    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef,dropdownArrowRef})

    return(
        <>
         
            <div className="min-w-full p-2 px-4 flex flex-col justify-center items-center border border-white border-solid rounded-[17px]">
                <h2 className="text-white text-[40px] font-semibold mb-1">Admins</h2>
                {
                open ?  
                <ul ref={dropdownRef} className="mb-10">
                {
                    panelData ?
                    panelData.map(adminInformation => {{
                        return adminInformation.conversation ? 
                            <AdminCard
                            adminId={adminInformation.conversation.participants.find(participant => participant.participantId != userId)?.participantId as number}
                            adminUsername={adminInformation.conversation.participants.find(participant => participant.participantId != userId)?.participantName as string}
                            conversation={adminInformation.conversation}/>
                        :
                        <div className="flex flex-col justify-center items-center my-[40px] mx-[10px]">
                            <h3 className="text-white text-[30px] font-semibold">{adminInformation.adminInfo.adminName}</h3>
                            <p className="text-white text-[20px] my-[20px]">You have not yet started conversation with admin {adminInformation.adminInfo.adminName}. Click on the button below if you wish to do it now.</p>
                            <button className="text-white text-[20px] rounded-[17px] bg-secondary p-3 px-6 mt-[20px]"
                            onClick={(e) => startNewConversation(adminInformation.adminInfo.adminId)}>Click </button>
                        </div>
                    }})
                    :
                    <p>Sorry, nothing to show here</p>
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

    async function attainAdminInfoFromDB(accesToken:string){
        console.log("STARTING")
        const response = await axios({
            method:'get',
            url: BASE_URL + 'users/getAdmins',
            withCredentials:true,
            headers:{
                Authorization: accessToken as string,
            },
        })
        console.log({data:response.data})
        const result = adminData.parse(response.data)

        console.log("GOT HERE")
        const adminInfoAndConversationObjectsCombined = [...result].map(adminInfo => {
            return {
                adminInfo:{
                    adminName:adminInfo.username,
                    adminId:adminInfo.user_Id,},
                conversation: conversations.find( conversation => conversation.participants.find(participant => participant.participantId === adminInfo.user_Id))
            }
        })
        console.log("DONE COMBINING!")
        console.log({adminInfoAndConversationObjectsCombined})

        setPanelData(adminInfoAndConversationObjectsCombined)
    }

    async function startNewConversation(adminId:number){
        const result = await axios({
            withCredentials:true,
            method:'post',
            url: BASE_URL + 'messaging/startConversation',
            data:{
                firstUserId: userId,
                secondUserId: adminId,
            },
            headers:{
                Authorization: accessToken as string,
            }
        })

        if (result.status === 200) dispatch({type:'UPDATE_CONVERSATIONS'})
        else{
            console.log({status:result.status})
        }
    }


}