import React, { ReactNode } from "react";
import "../css/mainPage/mainPage.css";
import "../css/styles.css";
import {RegisterIcon} from "../icons/registerIcon";
import { LoginIcon } from "../icons/loginIcon";
import { StocksViewer } from "../shared/stocksViewer";


export const MainPage  = () =>
 {
    return(
    
    <div className="ml-2 mr-2 flex-col items-center justify-center h-screen mt-14">

    <h1 className="text-white font-poppins text-xl text-left font-bold">Welcome to the</h1>
    <h2 className=" text-white underline decoration-primary font-poppins text-xl text-left font-bold ">WebTrader</h2>
    <h3 className="text-white font-poppins text-xl text-left font-bold ">application</h3>
    <p className="indent-3 text-white mt-[51px] font-poppins text-lg font-bold w-60">
    In this app you will be able to trade stocks, contact your personal coach and
manage your portfolio.
    </p>
    <div className="mt-[51px] bg-primary/30  rounded-md w-auto ">
        <p className="indent-3 font-poppins text-white text-lg">
        As an unauthenticated guest you can only browse the <span className="text-primary font-bold">stocks</span>. To make operations such as buy, sell and view your portfolio please log in or sign up.


        </p>
    </div>
    <div className="mt-[21px] bg-secondary-2 h-20 w-auto rounded-lg flex items-center content-between justify-around">
        <button className="bg-primary p-2 flex flex-row justify-center items-center content-between gap-2 rounded-lg " >
            <LoginIcon height={40}/>
            Login 
        </button>
        <button className="bg-primary p-2 flex flex-row justify-center items-center text-center content-between gap-2 rounded-lg">
            <RegisterIcon height={40}/>
            Register 
        </button>
    </div>

    <div className = "mt-[21px] bg-secondary-2 h-60 mb-4 rounded-lg flex flex-col justify-start items-center text-lg">
    <h1 className="font-bold">Stock Viewer</h1> 
    <StocksViewer name="hey"/>
    </div>
    
    </div>

    );


}



