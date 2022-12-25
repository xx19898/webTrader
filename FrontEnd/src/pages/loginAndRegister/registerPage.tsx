import { useReducer, useState } from "react";
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "../../sharedComponents/inputs/textInputWithDecoration"


const initialRegisterFormState = {
    username: "",
    password: "",
}
//TODO: IMPLEMENT THE REDUCER
const formReducer = (state:{[key:string]:boolean | string  }, action:{field:string,payload:string}) => {
    return {
        ...state,
        [action.field]: action.payload,
           }
        }

export default () => {
    const [formState,dispatch] = useReducer(formReducer,initialRegisterFormState)

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            field:event.target.name,
            payload:event.target.value
        })
    }
    return(
        <div className="flex h-full w-full p-0 bg-secondary-2 justify-center items-center content-center">
        <div className="flex flex-col h-auto w-auto bg-white  relative bottom-[5rem] rounded-md">
            <h1>username: {formState.username}</h1>
            <h2>password: {formState.password}</h2>
            <form className="p-[4rem] w-auto h-auto flex flex-col justify-start items-start content-between gap-[1rem]">
                <h1 className="mx-auto w-auto text-center font-semibold text-lg text-secondary">Register</h1>
                <TextInputWithDecoration name="username" value={formState.username as string} setValue={handleInputChange}/>
                <TextInputWithDecoration name="password" value={formState.password as string} setValue={handleInputChange}/> 
                <SubmitButton active={true} text={"Register"} marginTop={1}/>
            </form>
        </div>
        </div>
    )

}