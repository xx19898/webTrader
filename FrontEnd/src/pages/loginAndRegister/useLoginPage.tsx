import axios from "axios"
import { useState, useReducer } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { constructAxiosBodyForLoginRequest } from "../../state/Users/usersActions"
import { userActions } from "../../state/Users/usersSlice"
import { loginResponseSchema } from "../../state/Users/userZodSchemas"

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
const LoginStatus = ['ACTIVE','SUCCESSFUL','UNSUCCESSFUL'] as const
type LoginOperationStatus = typeof LoginStatus[number]

const initialLoginOperationStatus = 'ACTIVE'

const useLoginPage = () => {
    const [loginProgressStatus,setLoginProgressStatus] = useState<LoginOperationStatus>(initialLoginOperationStatus)
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

            reduxDispatch(userActions.SET_NEW_LOGGED_USER(parsedResponse.logged_in_user))
            reduxDispatch(userActions.SET_NEW_ACCESS_TOKEN(parsedResponse.access_token))
            navigate("/main")
        }).catch(
            (e) => {
                console.log("FAILED TO LOGIN WITH ERROR :" + e)
            })}
            return {loginProgressStatus,setLoginProgressStatus,formState,formDispatch,checkFormIsCorrect,handleSubmit}
}

export default useLoginPage