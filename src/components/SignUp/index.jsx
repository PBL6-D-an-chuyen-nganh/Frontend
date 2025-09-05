import { useState } from 'react'   
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { fetchRegister } from '../../api/Registe';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [enterpassagain, setEnterPassAgain] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: "",
    password: "",
    enterpassagain: "",
    phoneNumber: "",
    name: ""
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailBlur = async () => {
    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        email: "Vui lòng nhập email hợp lệ.",
      }));
    }
  };

  const handleFullnameBlur = () => {
    if (name.length === 0) {
      setError((prev) => ({
        ...prev,
        name: "Vui lòng nhập tên đầy đủ.",
      }));
    } else {
      setError((prev) => ({ ...prev, name: "" }));
    }
  };

   const handlePhoneNumberBlur = () => {
    if (phoneNumber.length === 0) {
      setError((prev) => ({
        ...prev,
        phoneNumber: "Vui lòng nhập số điện thoại.",
      }));
    } else {
      setError((prev) => ({ ...prev, phoneNumber: "" }));
    }
  };

  const handlePasswordBlur = () => {
    if (password.length != 8) {
      setError((prev) => ({
        ...prev,
        password: "Mật khẩu phải có chính xác 8 ký tự.",
      }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleRegister = async () => {
    try {
      const user = await fetchRegister(name, email, phoneNumber, password);
      navigate(`/login`);
    } catch (error) {
      console.error("Register failed:", error);
      setError(error.message);
    } 
  };

  const checkEnterPassAgain = (e) => {
    if(e.target.value !== password) {
      setError((prev) => ({
        ...prev,
        enterpassagain: "Mật khẩu nhập lại không khớp.",
      }));
    } else {
      setError((prev) => ({ ...prev, enterpassagain: "" }));
    }
  };
  const isRegisterDisabled =
    name.trim() === "" ||
    email.trim() === "" ||
    phoneNumber.trim() === "" ||
    password.length != 8 ||
    enterpassagain != password ||
    Object.values(error).some((e) => e !== "");

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setEnterPassAgain("");
    setError({
      email: "",
      password: "",
      phoneNumber: "",
      name: "",
      enterpassagain: ""
    });
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleFullnameBlur}
            />  
            {error.name && (
              <span className="mb-1 text-xs text-red-500 text-center">
                {error.name}
              </span>
            )}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={handlePhoneNumberBlur}
            />
            {error.phoneNumber && (
              <span className="mb-1 text-xs text-red-500 text-center">
                {error.phoneNumber}
              </span>
            )}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
            />
            {error.email && (
              <span className="mb-1 text-xs text-red-500 text-center">
                {error.email}
              </span>
            )}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {error.password && (
            <span className="mb-1 text-xs text-red-500 text-center">
              {error.password}
            </span>
          )}
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
            onBlur={checkEnterPassAgain}
          />
           {error.enterpassagain && (
            <span className="mb-1 text-xs text-red-500 text-center">
              {error.enterpassagain}
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}  
          </button>
        </div>
         <div className='space-y-3'>
                  <button 
                    className='w-full p-3 rounded-lg bg-green-900 text-white cursor-pointer hover:bg-white hover:text-green-900'
                    onClick={handleRegister}
                    disabled={isRegisterDisabled}
                  >
                    Đăng ký
                  </button>
                  <button 
                    className='w-full p-3 rounded-lg bg-stone-500 text-white cursor-pointer hover:bg-white hover:text-green-900'
                    onClick={handleReset}
                  >
                      Hoàn tác</button>
                </div>
      </div>
    </div>
  )
}

export default SignUp
