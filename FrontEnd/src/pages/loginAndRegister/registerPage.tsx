import { useState } from "react";
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "./textInputWithDecoration"


export default () => {
     

    return(
        <div className="w-auto mx-4 mt-[60px] bg-secondary/70 h-[400px] overflow-scroll">
            <form className="w-auto mx-[60px] mt-16 flex flex-col">
            <h1 className="mx-auto w-auto text-center font-semibold text-white">Register</h1>
            <TextInputWithDecoration text="USERNAME"/>
            <SubmitButton active={true} text={"Register"} marginTop={1}/>
            </form>
        </div>
    )

}