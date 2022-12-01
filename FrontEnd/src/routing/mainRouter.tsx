import { createBrowserRouter } from "react-router-dom";
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
    }
  ])