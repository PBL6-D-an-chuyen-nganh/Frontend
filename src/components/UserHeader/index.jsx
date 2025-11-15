import React from 'react'
import UserMenu from '../UserMenu';
import logo from '../../assets/Frame.svg'
import MenuItem from '../MenuItem'
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
function UserHeader() {
    const user = useAuthStore((state) => state.user);
    const userId = user?.userId;

    const menuItems = [
        { id: "homepage", title: "Trang chủ", path: "/" },
        { id: "professor", title: "Chuyên gia", path: "/professor" },
        { id: "service", title: "Dịch vụ", path: "/services" },
        { id: "appoinments", title: "Lịch sử đặt lịch", path: `/appointments/${userId}` },
        { id: "diagnosis", title: "Lịch sử khám bệnh", path: `/diagnosis/${userId}` },
    ];

  return (
    <nav className='bg-white flex items-center justify-between px-8 py-6 shadow-md'>
            <Link to="/" className='flex items-center gap-2'>
                <img src={logo} className='w-12 h-12 cursor-pointer' />
                <h1 className='text-green-900 text-3xl font-medium cursor-pointer'>Skin+</h1>
            </Link>

        <div className='w-3/4'>
            <div className='w-full flex items-center justify-start ml-3'>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        path={item.path}
                        title={item.title}
                    />
                ))}
            </div>
        </div>
        <div className='w-1/4 flex items-center gap-4'>
                <UserMenu/>
        </div>
    </nav>
  )
}

export default UserHeader