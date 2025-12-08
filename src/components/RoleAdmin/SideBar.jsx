import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard', path: '/admin' },
    { id: 'doctors', icon: FaUserMd, label: 'Doctors Management', path: '/admin/doctors' },
    { id: 'patients', icon: FaUserInjured, label: 'Patient Management', path: '/admin/patients' }
  ];

  const handleClick = (item) => {
    setActiveMenu(item.id);
    navigate(item.path);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`${isOpen ? 'w-64' : 'w-20'} bg-green-900 text-white 
          transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && <h1 className="text-xl font-bold">Skin+</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg cursor-pointer transition-colors"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'bg-white text-green-900 shadow-lg cursor-pointer'
                      : 'hover:bg-white hover:text-green-900 cursor-pointer'
                  }`}
                >
                  <item.icon size={24} />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4">
            <p className="text-sm text-green-200">Skin+</p>
          </div>
        )}
      </div>
    </div>
  );
}
