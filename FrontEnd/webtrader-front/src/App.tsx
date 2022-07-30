import React from 'react';
import { Provider } from 'react-redux';
import {
  
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./mainPage/mainPage";

import {MainPage} from './mainPage/mainPage';
import { store } from './store';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
