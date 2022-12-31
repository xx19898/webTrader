import { useReducer, useState } from "react"
import { useDispatch } from "react-redux"
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "../../sharedComponents/inputs/textInputWithDecoration"
import { LOGIN, usersActionTypes } from "../../state/Users/usersActionTypes"
import {constructAxiosBodyForLoginRequest} from "../../state/Users/usersActions"
import { LOGIN_URL } from "../../constants/urls"
import axios from "axios"
import { loginResponseSchema } from "../../state/Users/userZodSchemas"
import { useNavigate } from "react-router"

const reducer = (state:{[field:string]:string | boolean},action:{field:string,payload: string | boolean}) => {
    return{
        ... state,
        [action.field]:action.payload
    }
}
const initialState = {
    username: "",
    password: ""
}

enum LoginProgressStatus{
     IN_PROGRESS,SUCCESSFUL,UNSUCCESSFUL
}
const initialLoginProgressStatus = LoginProgressStatus.IN_PROGRESS

 const LoginPage = () => {
    const [loginProgressStatus,setLoginProgressStatus] = useState(initialLoginProgressStatus)
    const [formState,formDispatch] = useReducer(reducer,initialState)
    const reduxDispatch = useDispatch()
    const navigate = useNavigate()
    const checkFormIsCorrect = () => {
        return ((formState.username as string).length != 0 && (formState.username as string).length != 0)
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const loginRequestBody = constructAxiosBodyForLoginRequest({username:formState.username as string,password:formState.password as string})
        const apiResponse = await axios(loginRequestBody).then( (response) => {
            const parsedResponse = loginResponseSchema.parse(response.data)

            console.log('LOGIN_SUCCEEDED')

            reduxDispatch({type:usersActionTypes.SET_NEW_LOGGED_USER,payload: parsedResponse.logged_in_user})
            reduxDispatch({type:usersActionTypes.SET_NEW_ACCESS_TOKEN,payload: parsedResponse.access_token})
            navigate("/main")
        }).catch(
            (e) => {
                console.log("FAILED TO LOGIN WITH ERROR :" + e)
            })}
    return(
        <div className="w-auto h-full bg-secondary flex flex-row justify-center items-center">
            <div className="mx-[25%]">
            <form className=" bg-white flex pt-5 gap-[1rem] pb-12 flex-col justify-between text-center px-[2rem] items-center text-secondary h-auto w-auto rounded-sm"
            onSubmit={(e) => handleSubmit(e)} onFocus={() => setLoginProgressStatus(LoginProgressStatus.IN_PROGRESS)}>
                <h1 className="font-semibold font-poppins text-xl font w-auto">Login</h1>
                <TextInputWithDecoration name="username" setValue={(event) => formDispatch({field:'username',payload:event.target.value})} value={formState.username as string}/>
                <TextInputWithDecoration name="password" setValue={(event) => formDispatch({field:'password',payload:event.target.value})} value={formState.password as string}/>
                <SubmitButton active={checkFormIsCorrect()} marginTop={0} text='Login' />
                {
                    loginProgressStatus == LoginProgressStatus.UNSUCCESSFUL ? 
                    <div className="bg-transparent border-red-600 border-solid border-[2px] rounded-xl w-full py-[1rem] px-4">
                        Your login information is wrong, please check that your username and password are entered correctly and <b>CAPS LOCK</b> is turned off</div>
                        :
                    null
                }
            </form>
            </div>
            </div>
    )
}

export default LoginPage