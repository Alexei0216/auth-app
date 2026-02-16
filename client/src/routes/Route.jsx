import SignIn from "../auth/SignIn";
import Clients from "../clients/Clients";
import ProtectedRoute from "./ProtectedRoutes";
import HomeRedirect from "./HomeRedirect";
import SignUp from "../auth/SignUp";
import Forbidden from "./Forbidden";

export const routes = [
    {
        path: "/",
        element: <HomeRedirect />,
    },
    {
        path: "/login",
        element: <SignIn />,
    },
    {
        path: "/register",
        element: <SignUp />,
    },
    {
        path: "/forbidden",
        element: <Forbidden />,
    },
    {
        path: "/clients",
        element: (
            <ProtectedRoute role="admin">
                <Clients />
            </ProtectedRoute>
        ),
    },
];
