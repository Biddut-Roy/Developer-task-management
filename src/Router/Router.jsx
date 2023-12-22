import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage";
import Login from "../Page/Login/Login";
import Main from "../Layout/Main/Main";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Home from "../Page/HOme/Home";
import Task from "../Layout/Dashboard/Task/Task";
import Register from "../Page/Register/Register";
import CreateTask from "../Layout/Dashboard/Task/CreateTask";
import AllTask from "../Layout/Dashboard/Component/AllTask";
import Services from "../Page/Services/Services";
import Contact from "../Page/Contact/Contact";
import Gallery from "../Page/Gallary/Gallery";


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
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/gallery",
                element: <Gallery />,
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
            element: <CreateTask />,
          },
          {
            path: '/dashboard/task',
            element: <Task />,
          },
          {
            path: '/dashboard/all',
            element: <AllTask />,
          },
        ]
      },
]);

export default router;