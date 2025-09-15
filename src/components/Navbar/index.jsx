import { Link } from 'react-router-dom';
import logo from '../../assets/Frame.svg'
import MenuItem from '../MenuItem'

function Navbar() {
    const menuItems = [
        { id: "home", title: "Trang chủ", path: "/" },
        { id: "professor", title: "Chuyên gia", path: "/professor" },
        { id: "service", title: "Dịch vụ", path: "/service" },
        { id: "forum", title: "Diễn đàn", path: "/forum" },
        { id: "analysis", title: "Phân tích", path: "/analysis" },
    ];
  return (
    <nav className='bg-white flex items-center justify-between px-8 py-6 shadow-md'>
        <div className='flex items-center gap-2'>
            <img src={logo} className='w-12 h-12' />
            <h1 className='text-green-900 text-3xl font-medium'>Skin+</h1>
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
            <Link to="/login">
                <button className='border-1 rounded-lg px-6 py-1 text-green-900 cursor-pointer hover:bg-green-900 hover:text-white' 
                        style={{ borderColor: "#E0E8E0" }}
                >
                Đăng nhập
                </button>
            </Link>
        
            <Link to="/signup">
                <button className='border-1 rounded-lg bg-green-900 text-white px-6 py-1 cursor-pointer hover:bg-white hover:text-green-900'>
                Đăng ký
                </button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar