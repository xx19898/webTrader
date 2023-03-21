import { useEffect, useState } from "react"
import { gsap } from "gsap/src"
import { Bounce } from "gsap"
import axios from "axios"
import { BASE_URL } from "../../../constants/urls"
import { useAppSelector, useAppDispatch } from "../../../reduxHooks"
import { GetUserInfoApiResponse, getUserInfoApiResponse } from "./adminMainPageSchema"


export default ({searchIconRef}:{searchIconRef:React.RefObject<SVGSVGElement>}) => {
    const [searchedUsername,setSearchedUsername] = useState<string>("")
    const [usersData,setUsersData] = useState<GetUserInfoApiResponse>([])
    const access_token = useAppSelector(state => state.users.accessToken as string)
    const reduxDispatch = useAppDispatch()

    useEffect(() => {
        reduxDispatch({type:'UPDATE_CONVERSATIONS'})
        let ignore = false
        const response = attainUserPortfolioData(access_token).then(
            result => {
                if(!ignore){
                    setUsersData(result)
                    console.log({usersData})
                }
            }
        )
        return () => {
            ignore = true
        }
    },[])

    useEffect(() => {
        gsap.fromTo(searchIconRef.current,{scale:0},{scale:1,duration:0.5,ease: Bounce.easeOut})
    },[])

    async function attainUserPortfolioData(accessToken: string){
        const response = await axios({
            method: 'get',
            withCredentials:true,
            url: BASE_URL + "admin/allUserData",
            headers:{
                Authorization: accessToken,
            },
        })
        return getUserInfoApiResponse.parse(response.data)
    }

    return {
        searchedUsername,
        setSearchedUsername,
        usersData}
    
}