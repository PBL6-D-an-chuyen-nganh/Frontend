import {Navigate, createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";
import ForgetPassPage from "../pages/ForgetPass";
import { useAuthStore } from "../store/useAuthStore";
import HomePage from "../pages/Homepage";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestPage from "../pages/Guest";
import ProfessorPage from "../pages/Professor";
function PrivateRoute({ children }) {
  const token = useAuthStore(s => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

function RouteSelector() {
  const token = useAuthStore(s => s.token);
  return token ? <DefaultLayout /> : <GuestLayout />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteSelector />,
    children: [
      // Guest-only pages
      {
        index: true,
        element: <GuestPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "forget-password",
        element: <ForgetPassPage />,
      },

      // Authenticated pages 
      {
        path: "home",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute> 
        ),
      },
      {
        path: "professor",
        element: (
          <PrivateRoute>
            <ProfessorPage />
          </PrivateRoute>
        ),
      },
    ],
  },


  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;