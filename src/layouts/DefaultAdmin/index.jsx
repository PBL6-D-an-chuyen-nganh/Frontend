import { Outlet } from "react-router-dom";
import Sidebar from "../../components/RoleAdmin/SideBar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />

      {/* PHẢI có Outlet ở đây */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
