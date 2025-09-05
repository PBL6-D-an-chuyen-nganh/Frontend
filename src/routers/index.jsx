import {Navigate, createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";
import ForgetPassPage from "../pages/ForgetPass";
import { useAuthStore } from "../store/useAuthStore";

function GuestRoute({ children }) {
  return children;
}

function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
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
            },
            {
                path: "forget-password",
                element: <ForgetPassPage />
            }
        ]
       
    },
    {
        path: "/home",
        element: (
            <PrivateRoute>
                <h1>Home Page - Protected</h1>
            </PrivateRoute>
        )
    }
]);

export default router;