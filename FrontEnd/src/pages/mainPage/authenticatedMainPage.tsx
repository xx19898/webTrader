import React,{ useState,useEffect } from "react"
import AdminPanel from "../../sharedComponents/adminPanel/adminPanel"
import PortfolioManager from "../../sharedComponents/portfolioManager/portfolioManager"
import StocksViewer from "../../sharedComponents/stocksViewer/stocksViewer"




const AuthenticatedMainPage = ({authenticatedUser}:{authenticatedUser:string}) => { 

    return(
<div className="absolute w-full min-h-[100vh] h-auto bg-secondary-2 overflow-y-scroll">
    <div className="bg-transparent mx-[10%] flex flex-col  items-stretch justify-center h-auto w-auto">
        <h1 className="mt-[1rem] text-white font-poppins text-xl text-center font-bold">Welcome to the</h1>
        <h2 className=" text-primary font-poppins text-xl text-center font-bold ">WebTrader</h2>
        <h3 className=" text-white">{authenticatedUser}</h3>
        <p className="indent-3 text-white mt-[2rem] font-poppins text-lg font-bold w-auto text-center">
        In this app you will be able to trade stocks, contact your personal mentor and
    manage your portfolio.
        </p>
        <AdminPanel />
        <div className = "pb-[1px] mt-[2rem] h-auto w-full rounded-sm flex flex-col justify-streth items-center  text-lg bg-transparent">
            <h1 className="font-bold mt-[20px] text-white">Stock Viewer</h1> 
            <StocksViewer/>
        </div>
        <div className="bg-transparent h-auto w-full mb-[2rem]">
            <h1 className="font-bold mt-[2rem] mb-[2rem] text-white text-lg text-center">Portfolio Manager</h1>
            <PortfolioManager />
        </div>
    </div>
</div>
)


}

export {AuthenticatedMainPage}