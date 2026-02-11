import SignIn from "../auth/SignIn";
import Clients from "../clients/Clients";
import ProtectedRoute from "./ProtectedRoutes";
import HomeRedirect from "./HomeRedirect";

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
        path: "/clients",
        element: (
            <ProtectedRoute>
                <Clients />
            </ProtectedRoute>
        ),
    },
];