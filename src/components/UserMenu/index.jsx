import { useState, useRef, useEffect } from 'react';
import AvatarDisplay from '../AvatarDisplay';
import DropdownMenu from '../DropdownMenu';
import { useAuthStore } from "../../store/useAuthStore";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UserMenu = () => {
    const [active, setActive] = useState(false);
    const avatarRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();

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
      if (res.message) {
        logout();
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
        <DropdownMenu
          onLogout={handleLogout}
          userId={userId}
        />
      )}
    </div>
  );
};

export default UserMenu;