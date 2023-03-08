import axios from "axios"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../../constants/urls"
import { DropDownArrowIcon } from "../../icons/dropdownArrowIcon"
import useAnimatedDropdown from "../../pages/mainPage/adminMain/useAnimatedDropdown"
import { useAppSelector } from "../../reduxHooks"
import { Conversation } from "../../state/messaging/messagingZodSchemas"
import AdminCard from "./adminCard/adminCard"




export type AdminDataForAdminPanel = {
    adminId: number,
    adminName: string,
    conversation: Conversation
}

export type AdminsDataForAdminPanel = AdminDataForAdminPanel[]

export default () => {
    const dispatch = useDispatch()
    const userId = useAppSelector(state => state.users.userId)
    const userName = useAppSelector(state => state.users.loggedUser)
    const conversations = useAppSelector(state => state.messaging.conversations)
    const lastUpdated = useAppSelector(state => state.messaging.lastUpdated)

    const dropdownArrowRef = useRef<SVGSVGElement>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)
    const {open,handleClick} = useAnimatedDropdown({dropdownRef,dropdownArrowRef})

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

    return(
        <>
        {
            ! open ? 
            <div className="w-fit p-2 px-4 flex flex-col justify-center items-center border border-white border-solid">
                <h2 className="text-white text-lg font-semibold mb-1">Admins</h2>
                <DropDownArrowIcon height={10} ref={dropdownArrowRef}/>
            </div>
            :
            <ul ref={dropdownRef}>
                {

                }
            </ul>   
        }
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