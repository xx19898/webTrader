import axios from "axios"
import gsap,{Bounce} from "gsap"
import { useEffect, useState,useRef} from "react"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../../../constants/urls"
import { SearchIcon } from "../../../icons/searchIcon"
import { useAppSelector,useAppDispatch } from "../../../reduxHooks"
import { DealStatus } from "../../../sharedComponents/portfolioManager/portfolioDataSchemas"
import { AdminMainPage } from "./adminMainPage"
import { GetUserInfoApiResponse, getUserInfoApiResponse } from "./adminMainPageSchema"
import DealsDropdown from "./dealsDropdown"
import MessageDropdown from "./messageDropdown"
import useAdminPage from "./useAdminPage"
import UserInfoVisualizer, { UserInfoAdmin } from "./userInfoVisualizer"

const pending: DealStatus = 'PENDING'




//TODO: test and fix visuals with storybook    
export default () => {
    const searchIconRef = useRef<SVGSVGElement>(null)
    const conversations = useAppSelector(state => state.messaging.conversations)

    console.log({conversations})

    const {
        searchedUsername,
        setSearchedUsername,
        usersData
    } = useAdminPage({searchIconRef})

    return(
        <AdminMainPage 
        searchedUsername={searchedUsername}
        conversations={conversations} 
        setSearchedUsernameCallback={setSearchedUsername} 
        usersData={usersData}
        ref={searchIconRef} />
    )

}