import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Determine active menu based on URL
  const activeMenu =
    location.pathname.startsWith("/admin/doctors")
      ? "doctors"
      : location.pathname.startsWith("/admin/patients")
      ? "patients"
      : "dashboard";

  const menuItems = [
    { id: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard', path: '/admin' },
    { id: 'doctors', icon: FaUserMd, label: 'Doctors Management', path: '/admin/doctors' },
    { id: 'patients', icon: FaUserInjured, label: 'Patient Management', path: '/admin/patients' }
  ];

  const handleClick = (item) => {
    navigate(item.path);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-green-900 text-white transition-all`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && <h1 className="text-xl font-bold">Skin+</h1>}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition ${
                    activeMenu === item.id
                      ? 'bg-white text-green-900 shadow-lg'
                      : 'hover:bg-white hover:text-green-900'
                  }`}
                >
                  <item.icon size={24} />
                  {isOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
