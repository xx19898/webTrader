import { useReducer } from "react"
import { useDispatch } from "react-redux"
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "../../sharedComponents/inputs/textInputWithDecoration"
import { LOGIN } from "../../state/Users/usersActionTypes"
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
 const LoginPage = () => {
    const [formState,formDispatch] = useReducer(reducer,initialState)
    const reduxDispatch = useDispatch()
    const checkFormIsCorrect = () => {
        return ((formState.username as string).length != 0 && (formState.username as string).length != 0)
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        reduxDispatch({type:LOGIN,payload:{username:formState.username as string,password:formState.password as string}})
    }
    return(
        <div className="w-auto h-full bg-secondary flex flex-row justify-center items-center">
            <form className="bg-white flex pt-5 gap-[1rem] pb-12 flex-col justify-between text-center px-[2rem] items-center text-secondary h-auto w-auto rounded-sm"
            onSubmit={(e) => handleSubmit(e)}>
                <h1 className="font-semibold font-xl w-auto">Login</h1>
                <TextInputWithDecoration name="username" setValue={(event) => formDispatch({field:'username',payload:event.target.value})} value={formState.username as string}/>
                <TextInputWithDecoration name="password" setValue={(event) => formDispatch({field:'password',payload:event.target.value})} value={formState.password as string}/>
                <SubmitButton active={checkFormIsCorrect()} marginTop={0} text='Login' />
            </form>
        </div>
    )
}

export default LoginPage