import React, { ReactNode } from "react";
import { RegisterIcon } from "../../icons/registerIcon";
import { LoginIcon } from "../../icons/loginIcon";
import  StocksViewer from "../../sharedComponents/stocksViewer/stocksViewer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";
import PortfolioManager from "../../sharedComponents/portfolioManager/portfolioManager";
import { AuthenticatedMainPage } from "./authenticatedMainPage";
import AdminMainPage from "./adminMain/adminMainPage";
import AnonymousMainPage from "./anonymousMainPage";

export const MainPage  = () => {
    const loggedInUser = useSelector((state:RootState) => state.users.loggedUser)
    const userAuthorities = useSelector((state:RootState) => state.users.userAuthorities)

    if(loggedInUser != undefined){
        if(userAuthorities?.includes("ROLE_ADMIN")) return <><AdminMainPage /></>
        return <><AuthenticatedMainPage authenticatedUser={loggedInUser} /></>
    }
    return <AnonymousMainPage />
}



