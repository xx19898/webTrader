
import SubmitButton from "../../sharedComponents/buttons/submitButton"
import TextInputWithDecoration from "../../sharedComponents/inputs/textInputWithDecoration"
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
        <div className="w-full h-full bg-secondary-2 flex flex-row justify-center items-center">
            <form className=" bg-white flex pt-5 gap-[1rem] pb-12 flex-col justify-between text-center px-[2rem] items-center text-black h-auto sm:w-[80%] md:w-[60%] lg:w-[40%] rounded-[17px] drop-shadow-md"
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
    )
}

export default LoginPage