import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import './css/styles.css';
import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routing/mainRouter'; 
import { LogoutIcon } from './icons/logoutIcon';


export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
      <LogoutIcon height={50}/>
      <RouterProvider router={router}/>
    </Provider>
);

