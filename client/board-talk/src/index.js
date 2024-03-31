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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/question",
        element: <Question />
      },
      {
        path: "/whiteboard",
        element: <Container />
      }
    ]
  },

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
