import { useReducer, useState } from "react";
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "./textInputWithDecoration"


const initialRegisterFormState = {
    username: "",
    password: "",
}
//TODO: IMPLEMENT THE REDUCER
const reducer = (state:{[key:string]:string}, action:{type:string,payload:string}) => {
    switch(action.type){
        case 'USERNAME':
            return{
                ...state,
                []
            }
    }
}

export default () => {
    const [state,dispatch] = useReducer(reducer, initialRegisterFormState)
    return(
        <div className="flex h-full w-full p-0 bg-secondary-2 justify-center items-center content-center">
        <div className="flex flex-col h-auto w-auto bg-white  relative bottom-[5rem] rounded-md">
            <form className="p-[4rem] w-auto h-auto flex flex-col justify-start items-start content-between gap-[1rem]">
                <h1 className="mx-auto w-auto text-center font-semibold text-lg text-secondary">Register</h1>
                <TextInputWithDecoration text="USERNAME"/>
                <TextInputWithDecoration text="PASSWORD"/> 
                <SubmitButton active={true} text={"Register"} marginTop={1}/>
            </form>
        </div>
        </div>
    )

}