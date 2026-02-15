import SignIn from "../auth/SignIn";
import Clients from "../clients/Clients";
import ProtectedRoute from "./ProtectedRoutes";
import HomeRedirect from "./HomeRedirect";
import SignUp from "../auth/SignUp";

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
        path: "/clients",
        element: (
            <ProtectedRoute role="admin">
                <Clients />
            </ProtectedRoute>
        ),
    },
];