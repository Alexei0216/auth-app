import SignIn from "../auth/SignIn";
import Clients from "../clients/Clients";


export const routes = [
    {
        path: "/",
        element: <SignIn />,
    }
    ,
    {
        path: "/clients",
        element: <Clients />,
    }
];