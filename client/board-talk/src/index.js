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
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { UserProvider } from "./context/userContext"
import Question from "./routes/Question"
import Container from './routes/container/Container';
import Root from "./routes/Root"
import Navigation from './routes/navigation';
import axios from "axios"

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <SignUp />,
        index: true
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/home",
        element: <Navigation />,
        children: [
          {
            path: "/home/dashboard",
            element: <Dashboard />
          },
          {
            path: "/home/question",
            element: <Question />
          },
          {
            path: "/home/whiteboard",
            element: <Container />
          }
        ]
      },

    ]
  },

  ,
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserProvider >
    <RouterProvider router={router}>

      <h1> Hello</h1>

    </RouterProvider>
  </UserProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
