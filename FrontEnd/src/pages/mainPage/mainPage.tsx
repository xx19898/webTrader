import React, { ReactNode } from "react";
import { RegisterIcon } from "../../icons/registerIcon";
import { LoginIcon } from "../../icons/loginIcon";
import  StocksViewer from "../../sharedComponents/stocksViewer/stocksViewer";


export const MainPage  = () =>
 {
    return(
    <div className="flex w-auto h-auto  bg-secondary-2 items-center justify-center z-2">
        <div className=" bg-secondary-2 mt-[2rem] mx-[10rem] flex flex-col  items-center justify-center h-auto w-auto">
            <h1 className="mt-[0rem] text-white font-poppins text-xl text-center font-bold">Welcome to the</h1>
            <h2 className=" text-primary font-poppins text-xl text-center font-bold ">WebTrader</h2>
            <p className="indent-3 text-white mt-[2rem] font-poppins text-lg font-bold w-auto text-center">
            In this app you will be able to trade stocks, contact your personal mentor and
        manage your portfolio.
            </p>

            <div className="mt-[2rem] w-auto">
                <p className="indent-3 text-center font-poppins bg-secondary/50 rounded-sm py-[1em] px-[0.5em] text-white text-lg">
                As an unauthenticated guest you can only browse the <span className="text-primary font-bold">stocks</span>. To make operations such as buy, sell and view your portfolio please log in or sign up.
                </p>
            </div>

            <div className="mt-[2rem] h-auto w-full rounded-sm flex content-center justify-center gap-[2rem]">
                <button className="bg-primary text-white w-40 h-10 p-2 flex flex-row justify-center items-center content-between gap-2 rounded-sm " >
                    <LoginIcon height={25}/>
                    Login 
                </button>
                <button className="bg-primary text-white w-40 h-10 p-2 flex flex-row justify-center items-center text-center content-between gap-2 rounded-sm">
                    <RegisterIcon height={25}/>
                    Register 
                </button>
            </div>
            
            <div className = "pb-[1px] mt-[2rem] mb-[100px] h-auto w-full rounded-sm flex flex-col justify-between items-center  text-lg bg-secondary">
                <h1 className="font-bold mt-[20px] text-white">Stock Viewer</h1> 
                <StocksViewer/>
            </div>
        </div>
        
    </div>

    );


}



