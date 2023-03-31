import { createBrowserRouter } from "react-router-dom";
import { LogoutIcon } from "../icons/logoutIcon";
import LoginPage from "../pages/loginAndRegister/loginPage";
import RegisterPage from "../pages/loginAndRegister/registerPage";
import { MainPage } from "../pages/mainPage/mainPage";
import PortfolioManagerPage from "../pages/PortfolioManagerPage";
import StocksViewerPage from "../pages/StocksViewerPage";
import ProtectedRouteWrapper from "./protectedRouteWrapper";


export const router = createBrowserRouter
(
  [
    {
    element: <h1>basic</h1>,
    path: "/"
  },
  {
      element: 
      <MainPage/>,
      path:"main",
  },
  {
    element: <LoginPage/>,
    path:"login"
  },
  {
    element: <RegisterPage/>,
    path:"register"
  },
  {
    element: <ProtectedRouteWrapper protectedComponent={<StocksViewerPage />} />,
    path: "stocksViewer"
  },
  {
    element: <ProtectedRouteWrapper protectedComponent={<PortfolioManagerPage />} />,
    path: "portfolioManager"
  }
  ])