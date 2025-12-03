import { Link } from 'react-router-dom';
import logo from '../../assets/Frame.svg'
import MenuItem from '../MenuItem'

function Navbar() {
    const menuItems = [
        { id: "guest", title: "Trang chủ", path: "/accounts" },
        { id: "professor", title: "Chuyên gia", path: "/professor" },
        { id: "service", title: "Dịch vụ", path: "/service" },
    ];
  return (
    <nav className='bg-white flex items-center justify-between px-8 py-6 shadow-md'>
        <Link to={"/"}>
            <div className='flex items-center gap-2'>
                <img src={logo} className='w-12 h-12 cursor-pointer' />
                <h1 className='text-green-900 text-3xl font-medium cursor-pointer'>Skin+</h1>
            </div>
        </Link>
        
        <div className='w-3/4'>
            <div className='w-full flex items-center justify-start max-w-lg ml-3'>
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
            <Link to="login">
                <button className='border-1 rounded-lg px-6 py-1 text-green-900 cursor-pointer hover:bg-green-900 hover:text-white' 
                        style={{ borderColor: "#E0E8E0" }}
                >
                Đăng nhập
                </button>
            </Link>
        
            <Link to="signup">
                <button className='border-1 rounded-lg bg-green-900 text-white px-6 py-1 cursor-pointer hover:bg-white hover:text-green-900'>
                Đăng ký
                </button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar