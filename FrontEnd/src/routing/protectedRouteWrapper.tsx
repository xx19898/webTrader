import { useNavigate } from "react-router"
import { useAppSelector } from "../reduxHooks"


export default ({protectedComponent}:{protectedComponent:React.ReactNode}) => {
   /* const navigate = useNavigate()
    const authenticatedUser = useAppSelector(state => state.users.loggedUser)
    if(authenticatedUser == undefined || authenticatedUser == null) navigate("/main")
    */
   //TODO: temporary comment out, comment in when actually testing with the backend turned on
    return <>{protectedComponent}</>
}