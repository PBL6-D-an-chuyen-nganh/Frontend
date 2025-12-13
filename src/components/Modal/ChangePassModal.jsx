import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Btn from '../Button'; 

export const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '' 
  });
  
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // 1. Biến kiểm tra: Mật khẩu mới trùng mật khẩu cũ
  const isSamePassword = 
    formData.newPassword && 
    formData.oldPassword && 
    formData.newPassword === formData.oldPassword;

  // 2. Cập nhật điều kiện disable nút Lưu
  const isSaveDisabled = 
    !formData.oldPassword || 
    !formData.newPassword || 
    formData.newPassword.length < 6 ||
    !formData.confirmPassword ||
    formData.newPassword !== formData.confirmPassword ||
    isSamePassword; // Thêm điều kiện này vào

  const handleSave = () => {
    const newErrors = {};
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (formData.newPassword === formData.oldPassword) {
       return; 
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (onSave) {
      const payload = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      };
      onSave(payload);
    }

    onClose();
  };

  const handleCancel = () => {
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-green-900">THAY ĐỔI MẬT KHẨU</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Mật khẩu cũ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu cũ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.old ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10 ${
                  errors.oldPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập mật khẩu cũ"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('old')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.old ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                // 3. Highlight đỏ viền input nếu trùng mật khẩu cũ
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10 ${
                   isSamePassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* 4. Hiển thị thông báo lỗi dưới input */}
            {isSamePassword && (
              <p className="text-red-500 text-sm mt-1">
                Mật khẩu mới không được trùng với mật khẩu cũ
              </p>
            )}
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhập lại mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10 ${
                   (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword) 
                   ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập lại mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Mật khẩu không khớp</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 bg-gray-50 rounded-b-lg">
          <Btn
            title={"Huỷ"}
            onClick={handleCancel}
          />
          <div className={isSaveDisabled ? "opacity-50 pointer-events-none" : ""}>
             <Btn
                title={"Lưu thay đổi"}
                onClick={handleSave}
                primary
                disabled={isSaveDisabled} 
             />
          </div>
        </div>
      </div>
    </div>
  );
};