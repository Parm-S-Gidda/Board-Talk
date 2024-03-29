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
import { UserProvider } from "./context/userContext"
import Question from "./routes/Question"
import QuestionCreate from "./routes/Question-Create"
import Container from './routes/container/Container';

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
    path: "/question",
    element: <Question />
  },
  {
    path: "/question-create",
    element: <QuestionCreate />
  },
  {
    path: "/whiteboard",
    element: <Container />
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
