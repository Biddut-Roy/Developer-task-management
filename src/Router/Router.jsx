import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage";
import Login from "../Page/Login/Login";
import Main from "../Layout/Main/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

export default router;