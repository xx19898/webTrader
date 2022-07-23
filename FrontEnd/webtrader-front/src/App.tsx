import React from 'react';
import {
  
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./mainPage/mainPage";

import {MainPage} from './mainPage/mainPage';

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
