import {Navigate, createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";
import ForgetPassPage from "../pages/ForgetPass";
import { useAuthStore } from "../store/useAuthStore";
import HomePage from "../pages/Homepage";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestPage from "../pages/Guest";

function GuestRoute({ children }) {
  const token = useAuthStore(s => s.token);
  return token ? <Navigate to="/home" replace /> : children;
}

function PrivateRoute({ children }) {
  const token = useAuthStore(s => s.token);
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
      { index: true, element: <GuestPage /> },  
      { path: "home", element: <HomePage /> },  
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "forget-password", element: <ForgetPassPage /> },
    ],
  },

  {
    path: "/home",
    element: (
      <PrivateRoute>
        <DefaultLayout/>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },

    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
