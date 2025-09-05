import React, { useState } from 'react'   
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='w-full max-w-sm p-8 bg-white/30 backdrop-blur-xs rounded-lg shadow-neutral-300 relative sm:max-w-md md:max-w-lg '>
      <div className='mb-8'>
        <h2 className='text-2xl font-normal mb-6 text-green-950'>Đăng nhập</h2>
        <p className='text-gray-500 text-sm font-light'>
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/signup"
            className="text-green-900 font-medium hover:underline"
          >
            Đăng ký ngay.
          </Link>
        </p>
      </div>
    
      <div>
        <div className='mb-4'>
          <label 
            className='block text-gray-500 text-sm font-light mb-2' 
            htmlFor='email'
          >
            Email
          </label>
          <input 
            className='w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent' 
            type='email' 
            id='email' 
            placeholder='Nhập email của bạn' 
          />
        </div>

        <div className='mb-6 relative'>
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
            placeholder='Nhập mật khẩu của bạn' 
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
          <button className='w-full p-3 border-1 rounded-lg bg-green-900 text-white cursor-pointer hover:bg-white hover:text-green-900'>Đăng nhập</button>
          <button className='w-full p-3 border-1 rounded-lg bg-stone-500 text-white cursor-pointer hover:bg-white hover:text-green-900'>Đặt lại</button>
          <Link 
            to="/forgot_password"
            className='flex justify-center text-green-900 font-medium text-sm hover:underline'>
            Quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
