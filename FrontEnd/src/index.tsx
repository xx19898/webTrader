import ReactDOM from 'react-dom/client';
import App, { router } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import './css/styles.css';
import React from 'react';
import { RouterProvider } from 'react-router';


export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
);



