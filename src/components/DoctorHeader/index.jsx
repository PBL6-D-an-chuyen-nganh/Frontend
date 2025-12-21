import React from 'react'
import DoctorMenu from '../DoctorMenu';
import logo from '../../assets/Frame.svg'
import MenuItem from '../MenuItem'
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
function DoctorHeader() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.userId;

    const menuItems = [
        { id: "homepage", title: "Trang chủ", path: `/doctor`, end: true },
        { id: "appointments", title: "Lịch hẹn", path: `/doctor/appointments` },
        { id: "patients", title: "Bệnh nhân", path: `/doctor/patients` },
        { id: "schedule", title: "Lịch làm việc", path: `/doctor/schedules` },
    ];


  return (
    <nav className='bg-white flex items-center justify-between px-8 py-6 shadow-md'>
            <Link to="/" className='flex items-center gap-2'>
                <img src={logo} className='w-12 h-12 cursor-pointer' />
                <h1 className='text-green-900 text-3xl font-medium cursor-pointer'>Skin+</h1>
            </Link>

        <div className='w-3/4'>
            <div className='w-full flex items-center justify-start max-w-lg ml-3'>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        path={item.path}
                        title={item.title}
                        end={item.end}
                    />
                ))}
            </div>
        </div>
        <div className='w-1/4 flex items-center gap-4'>
            <DoctorMenu />
        </div>
    </nav>
  )
}

export default DoctorHeader
