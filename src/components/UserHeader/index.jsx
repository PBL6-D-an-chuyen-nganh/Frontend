import React from 'react'
import UserMenu from '../UserMenu';
import logo from '../../assets/Frame.svg'
import MenuItem from '../MenuItem'
function UserHeader() {
   const menuItems = [
        { id: "homepage", title: "Trang chủ", path: "/" },
        { id: "professor", title: "Chuyên gia", path: "/professor" },
        { id: "service", title: "Dịch vụ", path: "/services" },
        { id: "forum", title: "Diễn đàn", path: "/forum" },
        { id: "analysis", title: "Phân tích", path: "/analysis" },
    ];

  return (
    <nav className='bg-white flex items-center justify-between px-8 py-6 shadow-md'>
            <div className='flex items-center gap-2'>
                <img src={logo} className='w-12 h-12 cursor-pointer' />
                <h1 className='text-green-900 text-3xl font-medium cursor-pointer'>Skin+</h1>
            </div>
        <div className='w-3/4'>
            <div className='w-full flex items-center justify-center max-w-lg mx-px'>
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