import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/loginAndRegister/loginPage";
import RegisterPage from "../pages/loginAndRegister/registerPage";
import { MainPage } from "../pages/mainPage/mainPage";


export const router = createBrowserRouter
(
  [
    {
    element: <h1>basic</h1>,
    path: "/"
  },
  {
      element: <MainPage/>,
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
  ])