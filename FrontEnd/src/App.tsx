import {
  Routes,
  Route,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./mainPage/mainPage";

import {MainPage} from './mainPage/mainPage';

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
function App() {
  return (
    
    <BrowserRouter>
      
    </BrowserRouter>

    
  );
}

export default App;
