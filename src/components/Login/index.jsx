import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useAuthStore } from '../../store/useAuthStore';
import { fetchLogin } from '../../api/Login';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const login = useAuthStore(state => state.login);
  const setToken = useAuthStore(state => state.setToken);
  const isLoginDisabled = email.trim() === "" || password.trim() === "";

  const handleLogin = async () => {
    setErrorMessage(""); 
    try {
      const { user, token } = await fetchLogin(email, password);

      if (!token) {
        setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
        return;
      }
      login({ token, user });
      navigate("/home");
    } catch (err) {
      const status = err?.response?.status;

      if (status === 500) {
        setErrorMessage("Email hoặc mật khẩu không đúng!");
        return;
      }
      setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  return (
    <div className='w-full max-w-sm p-8 bg-white/30 backdrop-blur-xs rounded-lg shadow-neutral-300 relative sm:max-w-md md:max-w-lg'>
      <div className='mb-8'>
        <h2 className='text-2xl font-normal mb-6 text-green-950'>Đăng nhập</h2>
        <p className='text-green-900 text-sm font-medium'>
          Vui lòng đăng nhập để truy cập các chức năng của hệ thống
        </p>
        <p className='text-gray-500 text-sm font-light'>
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/accounts/signup"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center text-sm mb-4">{errorMessage}</p>
        )}

        <div className='space-y-3'>
          <button
            className='w-full p-3 border-1 rounded-lg bg-green-900 text-white cursor-pointer hover:bg-white hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleLogin}
            disabled={isLoginDisabled}
          >
            Đăng nhập
          </button>

          <button
            className='w-full p-3 border-1 rounded-lg bg-stone-500 text-white cursor-pointer hover:bg-white hover:text-green-900'
            onClick={handleReset}
          >
            Đặt lại
          </button>

          <Link
            to="/accounts/forget-password"
            className='flex justify-center text-green-900 font-medium text-sm hover:underline'>
            Quên mật khẩu?
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
