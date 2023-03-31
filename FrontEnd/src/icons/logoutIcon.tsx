import { useAppSelector } from "../reduxHooks"
import Cookies from 'js-cookie'
import { stat } from "fs"
import axios from "axios"
import { BASE_URL } from "../constants/urls"


export const LogoutIcon = ({height,callback}:{height:number,callback?: () => void}) => {
    const user = useAppSelector(state => state.users.loggedUser)
    const access_token = useAppSelector(state => state.users.accessToken) as string
    if(user === undefined) return null

    return(
            <div className="flex flex-col bg-secondary-2 justify-center items-start z-3">
            <svg height={height} className="bg-transparent mt-5 ml-5 cursor-pointer" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490.3 490.3" onClick={() => logout()}>
            <path d="M0 121.05v248.2c0 34.2 27.9 62.1 62.1 62.1h200.6c34.2 0 62.1-27.9 62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3s-12.3 5.5-12.3 12.3v40.2c0 20.7-16.9 37.6-37.6 37.6H62.1c-20.7 0-37.6-16.9-37.6-37.6v-248.2c0-20.7 16.9-37.6 37.6-37.6h200.6c20.7 0 37.6 16.9 37.6 37.6v40.2c0 6.8 5.5 12.3 12.3 12.3s12.3-5.5 12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1c-34.2 0-62.1 27.8-62.1 62.1z"/>
            <path d="M385.4 337.65c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l83.9-83.9c4.8-4.8 4.8-12.5 0-17.3l-83.9-83.9c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l63 63H218.6c-6.8 0-12.3 5.5-12.3 12.3 0 6.8 5.5 12.3 12.3 12.3h229.8l-63 63c-4.8 4.7-4.8 12.5 0 17.2z"/></svg>
            </div>
            )
    async function logout(){
        const response = await axios.get(BASE_URL + 'users/logout',{
            headers:{
                Authorization: access_token
            },
            withCredentials:true,
        })
        window.location.reload()
    }
        }