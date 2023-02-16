import { useReducer, useState } from "react"
import { useDispatch } from "react-redux"
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "../../sharedComponents/inputs/textInputWithDecoration"
import { LOGIN} from "../../state/Users/usersActionTypes"
import {constructAxiosBodyForLoginRequest} from "../../state/Users/usersActions"
import { LOGIN_URL } from "../../constants/urls"
import axios from "axios"
import { loginResponseSchema } from "../../state/Users/userZodSchemas"
import { useNavigate } from "react-router"
import { parse } from "path"
import { userActions } from "../../state/Users/usersSlice"
import useLoginPage from "./useLoginPage"




 const LoginPage = () => {
    const 
    {
        loginProgressStatus,
        setLoginProgressStatus,
        formState,
        formDispatch,
        checkFormIsCorrect,
        handleSubmit
    } = useLoginPage()
    
    return(
        <div className="w-auto h-full bg-secondary flex flex-row justify-center items-center">
            <div className="mx-[25%]">
            <form className=" bg-white flex pt-5 gap-[1rem] pb-12 flex-col justify-between text-center px-[2rem] items-center text-secondary h-auto w-auto rounded-sm"
            onSubmit={(e) => handleSubmit(e)} onFocus={() => setLoginProgressStatus('ACTIVE')}>
                <h1 className="font-semibold font-poppins text-xl font w-auto">Login</h1>
                <TextInputWithDecoration name="username" setValue={(event) => formDispatch({field:'username',payload:event.target.value})} value={formState.username as string}/>
                <TextInputWithDecoration name="password" setValue={(event) => formDispatch({field:'password',payload:event.target.value})} value={formState.password as string}/>
                <SubmitButton active={checkFormIsCorrect()} marginTop={0} text='Login' />
                {
                    loginProgressStatus == 'UNSUCCESSFUL' ? 
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