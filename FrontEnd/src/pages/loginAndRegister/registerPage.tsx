import { FormEvent, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "../../sharedComponents/inputs/textInputWithDecoration"
import { REGISTER } from "../../state/Users/usersActionTypes";


const initialRegisterFormState = {
    username: "",
    password: "",
}
const formReducer = (state:{[key:string]:boolean | string  }, action:{field:string,payload:string}) => {
    return {
        ...state,
        [action.field]: action.payload,
           }
        }

export default () => {
    const [formState,dispatch] = useReducer(formReducer,initialRegisterFormState)
    const reduxDispatch = useDispatch()
    const formIsCorrect = ((formState.username as string).length != 0 && (formState.password as string).length != 0) ? true : false 
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            field:event.target.name,
            payload:event.target.value
        })
    }
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        reduxDispatch({type:REGISTER,payload:{username:formState.username,password:formState.password}})
    }
    return(
        <div className="flex h-full w-full p-0 bg-secondary justify-center items-center content-center">
        <div className="flex flex-col h-auto w-auto bg-white  relative bottom-[5rem] rounded-md">
            <form onSubmit={(e) => handleSubmit(e)} className="p-[4rem] w-auto h-auto flex flex-col justify-start items-start content-between gap-[1rem]">
                <h1 className="mx-auto w-auto text-center font-semibold text-lg text-secondary">Register</h1>
                <TextInputWithDecoration name="username" value={formState.username as string} setValue={handleInputChange}/>
                <TextInputWithDecoration name="password" value={formState.password as string} setValue={handleInputChange}/> 
                <SubmitButton active={formIsCorrect} text={"Register"} marginTop={1}/>
            </form>
        </div>
        </div>
    )

}