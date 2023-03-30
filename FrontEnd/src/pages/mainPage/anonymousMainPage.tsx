import { useNavigate } from "react-router"
import { LoginIcon } from "../../icons/loginIcon"
import { RegisterIcon } from "../../icons/registerIcon"
import { router } from "../../routing/mainRouter"


    export default  () => {
        const router = useNavigate() 
        return(
        <div className=" bg-secondary-2 w-auto h-full flex flex-col justify-start items-center content-center">
            <div className="bg-secondary-2 w-auto h-auto flex flex-col justify-center items-center content-center mx-[2rem]">
            <h1 className="mt-[2rem] text-white font-poppins text-xl text-center font-bold">Welcome to the</h1>
            <h2 className=" text-primary font-poppins text-xl text-center font-bold ">WebTrader</h2>
            <p className="indent-3 text-white mt-[2rem] font-poppins text-lg font-bold w-auto text-center">
            In this app you will be able to trade stocks, contact your personal mentor and
        manage your portfolio.
            </p>
            <div className="mt-[2rem] h-auto w-full rounded-sm flex content-center justify-center gap-[2rem]">
                <button
                onClick={(event) => router('/login')}
                className="bg-primary text-white w-40 h-10 rounded-[17px] p-2 py-4 flex flex-row justify-center items-center content-between gap-2  " >
                    <LoginIcon height={25}/>
                    Login 
                </button>
                <button
                onClick={(event) => router('/register')}
                className="bg-primary text-white w-40 h-10 p-2 py-4 flex flex-row justify-center items-center text-center content-between gap-2 rounded-[17px]">
                    <RegisterIcon height={25} />
                    Register 
                </button>
            </div>
            </div>
            <div className="mt-[2rem] mx-[10%] w-auto">
                <p className="indent-3 text-center font-poppins bg-secondary/50 rounded-[17px] py-[1em] px-[0.5em] text-white text-lg">
                As an unauthenticated guest you can only view this page. To make operations such as view stocks, buy, sell and view your portfolio please log in or sign up.
                </p>
            </div>
        </div>
        )

    }
    