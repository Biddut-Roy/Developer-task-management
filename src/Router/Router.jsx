import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage";
import Login from "../Page/Login/Login";
import Main from "../Layout/Main/Main";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Home from "../Page/HOme/Home";
import Task from "../Layout/Dashboard/Task/Task";
import Register from "../Page/Register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
      // dashboard route
      {
        path:"/dashboard" ,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/dashboard',
            element: <Task />,
          },
        ]
      },
]);

export default router;