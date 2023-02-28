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

//{userIsAuthenticated ?  <AuthenticatedMainPage  authenticatedUser={loggedInUser}/> :
//<AnonymousMainPage />


/*
         {(() => {
            switch(userRole){
                case 'USER':
                    return <AuthenticatedMainPage  authenticatedUser={loggedInUser as string}/>
                case 'ADMIN':
                    return <AdminMainPage />
                default:
                    return <AnonymousMainPage />
            }
         })
         }
*/



export const MainPage  = () => {
    const loggedInUser = useSelector((state:RootState) => state.users.loggedUser)
    const userRole = useSelector((state:RootState) => state.users.userRole) 

    return(
        <>
        {
        loggedInUser != undefined ?  <AuthenticatedMainPage  authenticatedUser={loggedInUser as string} /> :
        <AnonymousMainPage />
        }
        </>
    )
}



