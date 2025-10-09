import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";
import ForgetPassPage from "../pages/ForgetPass";
import { useAuthStore } from "../store/useAuthStore";
import HomePage from "../pages/Homepage";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestPage from "../pages/Guest";
import ProfessorPage from "../pages/Professor";
import ArticleDetail from "../pages/Article";
import DoctorDetail from "../pages/Doctor";
import AppoinmentPage from "../pages/Appointment";
function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/accounts/login" replace />;
}
  
function GuestRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? <Navigate to="/" replace /> : children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      { 
        index: true, 
        element: <HomePage /> },
      {
        path: "articles/:articleID",
        element: <ArticleDetail />
      },
      { 
        path: "professor", 
        element: <ProfessorPage /> 
      },
      {
        path: "doctors/:userId",
        element: <DoctorDetail />
      },
      {
        path: "services",
        element: <AppoinmentPage />
      }
    ],
  },
  {
    path: "accounts",
    element: (
      <GuestRoute>
        <GuestLayout />
      </GuestRoute>
    ),
    children: [
      { index: true, 
        element: <GuestPage /> 
      },
      { 
        path: "login", 
        element: <LoginPage /> 
      },
      { path: "signup", 
        element: <SignUpPage /> 
      },
      { 
        path: "forget-password", 
        element: <ForgetPassPage /> 
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/accounts/login" replace />,
  },
]);

export default router;
