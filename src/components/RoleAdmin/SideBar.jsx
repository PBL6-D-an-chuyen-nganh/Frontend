import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { fetchLogout } from '../../api/Logout';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAuthStore } from '../../store/useAuthStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const logout = useAuthStore(state => state.logout);
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await fetchLogout(axiosPrivate);
      logout();
      navigate('/accounts/login', { replace: true });
    } catch (err) {
      console.error(err);
      logout();
      navigate('/accounts/login', { replace: true });
    }
  };

  const activeMenu =
    location.pathname.startsWith("/admin/doctors")
      ? "doctors"
      : location.pathname.startsWith("/admin/users")
      ? "patients"
      : "dashboard";

  const menuItems = [
    { id: 'dashboard', icon: FaTachometerAlt, label: 'Bảng điều khiển', path: '/admin' },
    { id: 'doctors', icon: FaUserMd, label: 'Quản lý bác sĩ', path: '/admin/doctors' },
    { id: 'patients', icon: FaUserInjured, label: 'Quản lý người dùng', path: '/admin/users' },
    { id: 'logout', icon: FaSignOutAlt, label: 'Đăng xuất', path: '/logout' }
  ];

  const handleClick = (item) => {
    if (item.id === 'logout') {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-green-900 text-white transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 h-16">
          {isOpen && <h1 className="text-xl font-bold whitespace-nowrap">Skin+</h1>}
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-green-800 rounded">
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    activeMenu === item.id 
                      ? 'bg-white text-green-900 shadow-lg font-bold'
                      : 'hover:bg-green-800 text-gray-100'
                  } `}
                >
                  <item.icon size={24} className="min-w-6" />
                  <span className={`${isOpen ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap overflow-hidden`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}