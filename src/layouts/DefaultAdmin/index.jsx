import { Outlet } from "react-router-dom";
import Sidebar from "../../components/RoleAdmin/SideBar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
