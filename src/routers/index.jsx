import { Navigate, createBrowserRouter } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import GuestLayout from "../layouts/DefaultGuest";
import ForgetPassPage from "../pages/ForgetPass";
import HomePage from "../pages/Homepage";
import DefaultLayout from "../layouts/DefaultLayout";
import DoctorLayout from "../layouts/DefaultDoctorLayout";
import GuestPage from "../pages/Guest";
import ProfessorPage from "../pages/Professor";
import ArticleDetail from "../pages/Article";
import DoctorDetail from "../pages/Doctor";
import AppoinmentPage from "../pages/Appointment";
import AppointmentHistory from "../pages/AppointmentHistory";
import DoctorAppointments from "../pages/RoleDoctor/Appointment";
import ScheduleRegister from "../pages/RoleDoctor/ScheduleRegister";
import PatientList from "../pages/RoleDoctor/PatientList";
import MedicalReport from "../pages/RoleDoctor/DiagnosisDetail";
import CreateDiagnosis from "../pages/RoleDoctor/CreateDiagnosis";
import DoctorHomepage from "../pages/RoleDoctor/DoctorHomepage";
import GuestHome from "../pages/Guest/GuestHome";
import GuestProfessor from "../pages/Guest/GuestProfessor";
import DiagnosisHistory from "../pages/DiagnosisHistory";
import DiagnosisDetail from "../pages/DiagnosisHistory/DiagnosisDetail";
import Dashboard from "../pages/RoleAdmin/Dashboard";
import DoctorList from "../pages/RoleAdmin/DoctorList";
import AdminLayout from "../layouts/DefaultAdmin";

function RoleRoute({ children, allowedRoles = [] }) {
  const { token, user, loading } = useAuthStore();
  if (loading) return <div>Loading...</div>;
  if (!token) {
    return <Navigate to="/accounts" replace />;
  }
  if (allowedRoles.length > 0) {
    const role = user?.role;
    if (!role || !allowedRoles.includes(role)) {
      if (role === "ROLE_DOCTOR") return <Navigate to="/doctor" replace />;
      if (role === "ROLE_USER") return <Navigate to="/" replace />;
      return <Navigate to="/accounts" replace />;
    }
  }

  return children;
}

function GuestRoute({ children }) {
  const { token, user, loading } = useAuthStore();
  if (loading) return <div>Loading...</div>;
  if (!token) return children;
  if (user?.role === "ROLE_DOCTOR") return <Navigate to="/doctor" replace />;
  if (user?.role === "ROLE_USER") return <Navigate to="/" replace />;
  if ( user?.role === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
  return <Navigate to="/accounts" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RoleRoute allowedRoles={["ROLE_USER"]}>
        <DefaultLayout />
      </RoleRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "articles/:articleID", element: <ArticleDetail /> },
      { path: "professor", element: <ProfessorPage /> },
      { path: "doctors/:userId", element: <DoctorDetail /> },
      { path: "services", element: <AppoinmentPage /> },
      { path: "appointments/:userId", element: <AppointmentHistory /> },
      { path: "diagnosis-history/:userId", element: <DiagnosisHistory /> },
      { path: "diagnoses/:diagnosisId/detail", element: <DiagnosisDetail /> },
    ],
  },

  {
    path: "/doctor",
    element: (
      <RoleRoute allowedRoles={["ROLE_DOCTOR"]}>
        <DoctorLayout />
      </RoleRoute>
    ),
    children: [
      { index: true, element: <DoctorHomepage /> },
      { path: "articles/:articleID", element: <ArticleDetail /> },
      { path: ":doctorId/appointments", element: <DoctorAppointments /> },
      { path: "schedule/:doctorId", element: <ScheduleRegister /> },
      { path: ":doctorId/patients", element: <PatientList /> },
      { path: "diagnosis/:diagnosisId", element: <MedicalReport /> },
      { path: ":doctorId/create-diagnosis", element: <CreateDiagnosis /> },
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
      { path: "home", element: <GuestHome /> },
      { path: "articles/:articleID", element: <ArticleDetail /> },
      { path: "professor", element: <GuestProfessor /> },
      { path: "doctors/:userId", element: <DoctorDetail /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "forget-password", element: <ForgetPassPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
        <AdminLayout />
      </RoleRoute>
    ),
    children: 
      [
          { index: true, element: <Dashboard /> },
          { path: "doctors", element: <DoctorList /> },
      ],
  },
  {
    path: "*",
    element: <Navigate to="/accounts" replace />,
  },
]);

export default router;