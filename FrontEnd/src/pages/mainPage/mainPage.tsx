import React, { ReactNode } from "react";
import { RegisterIcon } from "../../icons/registerIcon";
import { LoginIcon } from "../../icons/loginIcon";
import  StocksViewer from "../../sharedComponents/stocksViewer/stocksViewer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";
import PortfolioManager from "../../sharedComponents/portfolioManager/portfolioManager";
import { AuthenticatedMainPage } from "./authenticatedMainPage";


export const MainPage  = () => {
    const loggedInUser = useSelector((state:RootState) => state.users.loggedUser)
    const userIsAuthenticated = loggedInUser != undefined

    

    return (<AuthenticatedMainPage authenticatedUser={'Test User'}/>)
}



