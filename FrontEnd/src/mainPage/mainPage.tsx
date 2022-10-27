import React, { ReactNode } from "react";
import "../css/mainPage/mainPage.css";
import "../css/styles.css";
import {RegisterIcon} from "../icons/registerIcon";
import { LoginIcon } from "../icons/loginIcon";
import  StocksViewer from "../sharedComponents/stocksViewer/stocksViewer";


export const MainPage  = () =>
 {
    return(
    
    <div className="mx-10 mb-10 flex-col items-center justify-center h-screen w-auto">
    <h1 className="mt-[50px] text-white font-poppins text-xl text-center font-bold">Welcome to the</h1>
    <h2 className=" text-primary font-poppins text-xl text-center font-bold ">WebTrader</h2>
    <p className="indent-3 text-white mt-[51px] font-poppins text-lg font-bold w-auto text-center">
    In this app you will be able to trade stocks, contact your personal mentor and
manage your portfolio.
    </p>
    <div className="mt-[51px] ">
        <p className="indent-3 font-poppins text-white text-lg">
        As an unauthenticated guest you can only browse the <span className="text-primary font-bold">stocks</span>. To make operations such as buy, sell and view your portfolio please log in or sign up.
        </p>
    </div>
    <div className="mt-[49px] h-auto w-auto rounded-sm flex items-center content-between justify-around">
        <button className="bg-primary text-white w-40 h-10 p-2 flex flex-row justify-center items-center content-between gap-2 rounded-sm " >
            <LoginIcon height={25}/>
            Login 
        </button>
        <button className="bg-primary text-white w-40 h-10 p-2 flex flex-row justify-center items-center text-center content-between gap-2 rounded-sm">
            <RegisterIcon height={25}/>
            Register 
        </button>
    </div>

    <div className = "mt-[49px] h-auto rounded-sm flex flex-col justify-start items-center text-lg bg-[#3F1A4D]">
    <h1 className="font-bold mt-[20px] text-white">Stock Viewer</h1> 
    <StocksViewer/>
    </div>
    
    </div>

    );


}



