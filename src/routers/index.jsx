import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";
import ForgetPassPage from "../pages/ForgetPass";
import { useAuthStore } from "../store/useAuthStore";
import HomePage from "../pages/Homepage";
import DefaultLayout from "../layouts/DefaultLayout";
import DoctorLayout from "../layouts/DefaultDoctorLayout";
import GuestPage from "../pages/Guest";
import ProfessorPage from "../pages/Professor";
import ArticleDetail from "../pages/Article";
import DoctorDetail from "../pages/Doctor";
import AppoinmentPage from "../pages/Appointment";
import AppointmentHistory from "../pages/AppointmentHistory";
import DoctorAppointments from '../pages/RoleDoctor/Appointment';
import ScheduleRegister from '../pages/RoleDoctor/ScheduleRegister';
import PatientList from "../pages/RoleDoctor/PatientList";
import MedicalReport from "../pages/RoleDoctor/DiagnosisDetail";
import CreateDiagnosis from "../pages/RoleDoctor/CreateDiagnosis";
import DoctorHomepage from "../pages/RoleDoctor/DoctorHomepage";

function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/accounts" replace />;
}
  
function GuestRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  if (!token) {
    return children;
  }
  if (user?.role === 'ROLE_DOCTOR') {
    return <Navigate to="/doctor" replace />;
  }
  return <Navigate to="/" replace />;
}

function DoctorRoute({ children }) {
  const { user, token } = useAuthStore();

  if (!token) {
    return <Navigate to="/accounts" replace />;
  }
  
  if (user?.role !== 'ROLE_DOCTOR') {
    return <Navigate to="/" replace />;
  }
  
  return children;
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
      { index: true, element: <HomePage /> },
      { path: "articles/:articleID", element: <ArticleDetail /> },
      { path: "professor", element: <ProfessorPage /> },
      { path: "doctors/:userId", element: <DoctorDetail /> },
      { path: "services", element: <AppoinmentPage /> },
      { path: "appointments/:userId", element: <AppointmentHistory /> },
    ],
  },
  {
    path: "/doctor",
    element: (
      <DoctorRoute>
        <DoctorLayout />
      </DoctorRoute>
    ),
    children: [
      { index: true, element: <DoctorHomepage /> },
      { path: ":doctorId/appointments", element: <DoctorAppointments /> },
      { path: "schedule/:doctorId", element: <ScheduleRegister /> },
      { path: ":doctorId/patients", element: <PatientList /> },
      { path: "diagnosis/:diagnosisId", element: <MedicalReport />},
      { path: ":doctorId/create-diagnosis", element: <CreateDiagnosis />}
    ],
  },
  {
    path: "/accounts",
    element: (
      <GuestRoute>
        <GuestLayout />
      </GuestRoute>
    ),
    children: [
      { index: true, element: <GuestPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "forget-password", element: <ForgetPassPage /> },
    ],
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/accounts" replace />,
  // },
]);

export default router;
