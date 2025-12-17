import React, { useState } from 'react'   
import { Link } from 'react-router-dom' 
import { PasswordModal } from './PasswordModal';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [modalStep, setModalStep] = useState('NONE'); 
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSendEmail = () => {
    if (!email) {
      alert("Vui lòng nhập email!");
      return;
    }
    console.log("Đang gửi OTP đến:", email);
    setModalStep('OTP');
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Vui lòng nhập mã xác thực!");
      return;
    }
    console.log("Xác thực OTP:", otp);
    setModalStep('RESET_PASSWORD');
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Đổi mật khẩu thành công:", newPassword);

    alert("Đổi mật khẩu thành công!");
    setModalStep('NONE'); 
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Nhập email của bạn' 
            />
        </div>

        <div className='space-y-3'>
             <button 
                onClick={handleSendEmail}
                className='w-full p-3 border-1 border-green-900 rounded-lg bg-green-900 text-white cursor-pointer hover:bg-white hover:text-green-900 transition-all font-medium'
             >
                Gửi mã xác thực
             </button>
            <Link
                to="/signup"
                className="text-green-900 font-medium hover:underline flex justify-center"
            >
                Tạo tài khoản mới
            </Link>
        </div>
        <Modal 
          isOpen={modalStep === 'OTP'} 
          onClose={() => setModalStep('NONE')}
          title="Nhập mã xác thực"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Mã xác thực đã được gửi đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư.
            </p>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 text-center tracking-widest text-lg"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
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
        </Modal>

        {/* Bước 2: Modal Đặt lại mật khẩu */}
        <Modal 
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button 
              onClick={handleResetPassword}
              className="w-full p-3 rounded-lg bg-green-900 text-white hover:bg-green-800 transition-colors mt-2"
            >
              Cập nhật mật khẩu
            </button>
          </div>
        </Modal>
    </div>
  )
}

export default ForgotPassword
