import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <div>Hello world!</div>,
            },
        ],
    },
]);

export default router;