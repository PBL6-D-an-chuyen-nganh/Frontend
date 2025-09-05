import React, { useState } from 'react'   
import { Link } from 'react-router-dom' 

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='w-full max-w-lg p-8 bg-white/30 backdrop-blur-xs rounded-lg shadow-neutral-300 relative'>
        <div className='mb-8'>
            <h2 className='text-2xl font-normal mb-6 text-green-950'>Quên mật khẩu</h2>
            <p className='text-gray-500 text-sm font-light'>Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</p>
        </div>
        <div className='mb-8'>
            <input 
                className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
                type='email' 
                id='email' 
                placeholder='Nhập email của bạn' 
            />
        </div>

        <div className='space-y-3'>
             <button className='w-full p-3 border-1 rounded-lg bg-green-900 text-white cursor-pointer hover:bg-white hover:text-green-900'>Gửi mã xác thực</button>
            <Link
                to="/login"
                className="text-green-900 font-medium hover:underline flex justify-center"
            >
                Tạo tài khoản mới
            </Link>
        </div>
       
    </div>
  )
}

export default Login
