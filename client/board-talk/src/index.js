import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './routes/Signup';
import Dashboard from './routes/Dashboard';
import Notification from './routes/Notification'
import { UserProvider } from "./context/userContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/notification",
    element: <Notification />
  }
  ,
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserProvider >
    <RouterProvider router={router}>

    </RouterProvider>
  </UserProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
