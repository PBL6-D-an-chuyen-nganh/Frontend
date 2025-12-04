import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarDisplay from '../AvatarDisplay';
import DoctorDropdown from '../DropdownMenu/DoctorDropdown';
import { useAuthStore } from "../../store/useAuthStore";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { fetchLogout } from '../../api/Logout';

const DoctorMenu = () => {
    const [active, setActive] = useState(false);
    const avatarRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const user = useAuthStore(state => state.user);
    const username = user?.name;
    const userId = user?.userId;
    const logout = useAuthStore(state => state.logout);

    const handleClickOutside = (event) => {
        if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setActive(false);
        }
    };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetchLogout(axiosPrivate);
      console.log(res);
      if (res.message) {
        logout();
        navigate('/accounts/login', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex-1 flex justify-center p-2 relative' ref={avatarRef}>
      <AvatarDisplay
        onClick={() => setActive(!active)}
        isActive={active}
        username={username}
      />
      {active && (
        <DoctorDropdown
          onLogout={handleLogout}
          userId={userId}
        />
      )}
    </div>
  );
};

export default DoctorMenu