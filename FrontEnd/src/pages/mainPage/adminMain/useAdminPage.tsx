import { useEffect, useState,useReducer } from "react"
import { gsap } from "gsap/src"
import { Bounce } from "gsap"
import axios from "axios"
import { BASE_URL } from "../../../constants/urls"
import { useAppSelector, useAppDispatch } from "../../../reduxHooks"
import { GetUserInfoApiResponse, getUserInfoApiResponse } from "./adminMainPageSchema"


export default ({searchIconRef}:{searchIconRef:React.RefObject<SVGSVGElement>}) => {
    const [searchedUsername,setSearchedUsername] = useState<string>("")
    const access_token = useAppSelector(state => state.users.accessToken as string)
    const usersData = useAppSelector(state => state.admin.userData)
    const reduxDispatch = useAppDispatch()
    const [ignored,forceUpdate] = useReducer(x => x + 1, 0)


    useEffect(() => {
        reduxDispatch({type:'UPDATE_CONVERSATIONS'})
        reduxDispatch({type:'UPDATE_USER_DATA'})
    },[])

    useEffect(() => {
        gsap.fromTo(searchIconRef.current,{scale:0},{scale:1,duration:0.5,ease: Bounce.easeOut})
    },[true])


    return {
        searchedUsername,
        setSearchedUsername,
        usersData,
    }
}