import {Navigate, createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";



function GuestRoute({ children }) {
  return children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <GuestRoute>
                <GuestLayout />
            </GuestRoute>
        ),
        children: [
            {
                index: true,
                element: <LoginPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <SignUpPage />
            }
        ]
       
    }
]);

export default router;