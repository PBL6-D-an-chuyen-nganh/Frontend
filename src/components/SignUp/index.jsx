import { useState } from 'react'   
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='w-full mt-6 max-w-lg p-8 bg-white/30 backdrop-blur-xs rounded-lg shadow-neutral-300 relative'>
      <div className='mb-4'>
        <h2 className='text-2xl font-normal mb-4 text-green-950'>Đăng ký</h2>
        <p className='text-gray-500 text-sm font-light'>
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-green-900 font-medium hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    
      <div>
        <div className='mb-3'>
            <label 
                className='block text-gray-500 text-sm font-light mb-2' 
                htmlFor='name'
            >
                Họ và tên
            </label>
            <input 
                className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
                type='text' 
                id='name' 
                placeholder='Nhập họ và tên' 
            />
        </div>

            <div className='mb-3'>
            <label 
                className='block text-gray-500 text-sm font-light mb-2' 
                htmlFor='name'
            >
               Số điện thoại 
            </label>
            <input 
                className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
                type='text' 
                id='numberphone' 
                placeholder='Nhập số điện thoại ' 
            />
        </div>

            <div className='mb-3'>
            <label 
                className='block text-gray-500 text-sm font-light mb-2' 
                htmlFor='name'
            >
                Email
            </label>
            <input 
                className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
                type='email' 
                id='email' 
                placeholder='Nhập địa chỉ email ' 
            />
        </div>

        <div className='mb-3 relative'>
            <label 
            className='block text-gray-500 text-sm font-light mb-2' 
            htmlFor='password'
          >
            Mật khẩu
          </label>
          <input 
            className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
            type={showPassword ? 'text' : 'password'}  
            id='password' 
            placeholder='Nhập mật khẩu ' 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}  
          </button>
        </div>

        <div className='mb-6 relative'>
          <label 
            className='block text-gray-500 text-sm font-light mb-2' 
            htmlFor='password'
          >
            Nhập lại mật khẩu
          </label>
          <input 
            className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
            type={showPassword ? 'text' : 'password'}  
            id='password' 
            placeholder='Nhập lại mật khẩu' 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}  
          </button>
        </div>
         <div className='space-y-3'>
                  <button className='w-full p-3 rounded-lg bg-green-900 text-white cursor-pointer hover:bg-white hover:text-green-900'>Đăng ký</button>
                  <button className='w-full p-3 rounded-lg bg-stone-500 text-white cursor-pointer hover:bg-white hover:text-green-900'>Hoàn tác</button>
                </div>
      </div>
    </div>
  )
}

export default SignUp
