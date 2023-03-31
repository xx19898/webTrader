
import axios from "axios"
import gsap,{Bounce} from "gsap"
import {useReducer,useRef} from "react"
import { useAppSelector} from "../../../reduxHooks"
import { AdminMainPage } from "./adminMainPage"
import useAdminPage from "./useAdminPage"
  
export default () => {
    const searchIconRef = useRef<SVGSVGElement>(null)
    const conversations = useAppSelector(state => state.messaging.conversations)

    const {
        searchedUsername,
        setSearchedUsername,
        usersData,
    } = useAdminPage({searchIconRef})

    return(
        <AdminMainPage 
        searchedUsername={searchedUsername}
        conversations={conversations} 
        setSearchedUsernameCallback={setSearchedUsername} 
        usersData={usersData}
        ref={searchIconRef}
        />
    )
}