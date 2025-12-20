import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../Notification/index.jsx';
import { PasswordModal } from './PasswordModal';
import { forgotPass } from '../../api/forgotPass';
import { resetPass } from '../../api/resetPass';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [modalStep, setModalStep] = useState('NONE'); 
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const handleSendEmail = async () => {
    setEmailError('');
    if (!email) {
      setEmailError("Vui lòng nhập email!");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPass(email);
      setModalStep('OTP');
    } catch (error) {
      console.error(error);
      setEmailError(error.response?.data?.message || "Có lỗi xảy ra hoặc email không tồn tại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    setOtpError('');
    if (!otp) {
      setOtpError("Vui lòng nhập mã xác thực!");
      return;
    }
    setModalStep('RESET_PASSWORD');
  };

  const handleResetPassword = async () => {
    setPasswordError('');
    
    if (!newPassword || !confirmPassword) {
        setPasswordError("Vui lòng nhập đầy đủ mật khẩu.");
        return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await resetPass(email, otp, newPassword);
      setToast({ message: 'Đổi mật khẩu thành công!', type: 'success' });
      setModalStep('NONE'); 
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      setToast({ message: errorMsg, type: 'error' });
    }
  };

  return (
    <div className='w-full max-w-lg p-8 bg-white/30 backdrop-blur-xs rounded-lg shadow-neutral-300 relative'>
        <div className='mb-8'>
            <h2 className='text-2xl font-normal mb-6 text-green-950'>Quên mật khẩu</h2>
            <p className='text-gray-500 text-sm font-light'>Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</p>
        </div>
        
        {/* Form nhập Email */}
        <div className='mb-8'>
            <input 
                className={`w-full p-3 bg-white rounded-lg font-light focus:outline-none focus:ring-2 focus:border-transparent ${emailError ? 'ring-2 ring-red-500 border-red-500' : 'focus:ring-green-900'}`}
                type='email' 
                id='email' 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if(emailError) setEmailError(''); 
                }}
                placeholder='Nhập email của bạn' 
            />
            {emailError && (
                <p className="text-red-500 text-sm mt-1 text-left">{emailError}</p>
            )}
        </div>

        <div className='space-y-3'>
             <button 
                onClick={handleSendEmail}
                disabled={isLoading}
                className={`w-full p-3 border-1 rounded-lg text-white font-medium transition-all ${
                    isLoading 
                    ? 'bg-gray-400 border-gray-400 cursor-not-allowed' 
                    : 'bg-green-900 border-green-900 cursor-pointer hover:bg-white hover:text-green-900'
                }`}
             >
                {isLoading ? "Đang gửi..." : "Gửi mã xác thực"}
             </button>
            <Link
                to="/signup"
                className="text-green-900 font-medium hover:underline flex justify-center"
            >
                Tạo tài khoản mới
            </Link>
        </div>

        {/* Modal nhập OTP */}
        <PasswordModal 
          isOpen={modalStep === 'OTP'} 
          onClose={() => setModalStep('NONE')}
          title="Nhập mã xác thực"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Mã xác thực đã được gửi đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư.
            </p>
            <div>
                <input 
                type="text" 
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-center tracking-widest text-lg ${otpError ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-green-900'}`}
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => {
                    setOtp(e.target.value);
                    if(otpError) setOtpError('');
                }}
                />
                {otpError && <p className="text-red-500 text-sm mt-1 text-center">{otpError}</p>}
            </div>
            
            <button 
              onClick={handleVerifyOtp}
              className="w-full p-3 rounded-lg bg-green-900 text-white hover:bg-green-800 transition-colors"
            >
              Xác nhận
            </button>
            <div className="text-center">
                <button className="text-sm text-gray-500 hover:text-green-900 underline">Gửi lại mã?</button>
            </div>
          </div>
        </PasswordModal>

        {/* Modal Đặt lại mật khẩu */}
        <PasswordModal 
          isOpen={modalStep === 'RESET_PASSWORD'} 
          onClose={() => setModalStep('NONE')}
          title="Đặt lại mật khẩu"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
              <input 
                type="password" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-green-900'}`}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if(passwordError) setPasswordError('');
                }}
              />
               {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <button 
              onClick={handleResetPassword}
              className="w-full p-3 rounded-lg bg-green-900 text-white hover:bg-green-800 transition-colors mt-2"
            >
              Cập nhật mật khẩu
            </button>
          </div>
        </PasswordModal>

        {/* Chỉ hiển thị Toast khi có message */}
        {toast.message && (
            <Toast  
            message={toast.message} 
            type={toast.type} 
            duration={3000}
            onClose={() => setToast({ message: '', type: '' })} 
            />
        )}
    </div>
  )
}

export default ForgotPassword;