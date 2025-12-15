import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-24 grow bg-gray-50">
        <Outlet /> 
      </div>
    </div>
  );
}

export default GuestLayout;