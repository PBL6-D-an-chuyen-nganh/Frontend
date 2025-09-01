import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

function GuestLayout() {
  return (
    <div>
      <Navbar />
      <Outlet /> 
    </div>
  );
}

export default GuestLayout;
