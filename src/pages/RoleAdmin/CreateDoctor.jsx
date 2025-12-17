import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaUser, FaEnvelope, FaBriefcase, FaLock, FaStethoscope } from 'react-icons/fa';
import { CreateDoctor as CreateDoctorApi } from '../../api/createDoctor';
import Toast from '../../components/Notification';
import Btn from '../../components/Button';

export default function CreateDoctor() {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createNewDoctor = async (doctorData) => {
    setLoading(true);
    const { message, error } = await CreateDoctorApi(doctorData);
    setLoading(false);
    if (message) {
      setToast({ type: "success", message: "Thêm bác sĩ thành công!" });
      setTimeout(() => {
        navigate("/admin/doctors");
      }, 3000);
    } else {
      setToast({ type: "error", message: error || "Đã xảy ra lỗi khi thêm bác sĩ." });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    specialty: ""
  });

  const [errors, setErrors] = useState({});

  const specialties = [
    "Khoa khám da",
    "Khoa thẩm mỹ",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.position.trim()) newErrors.position = "Vui lòng nhập chức vụ";
    if (!formData.specialty.trim()) newErrors.specialty = "Vui lòng chọn chuyên khoa";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createNewDoctor(formData);
    }
    setFormData({
      name: "",
      email: "",
      position: "",
      specialty: ""
    });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      position: "",
      specialty: ""
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3">
        <FaUserMd className="text-green-900 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÍ BÁC SĨ</h1>
      </div>
      <p className='mt-2 text-gray-600'>Thêm bác sĩ vào hệ thống</p>

      <div className="max-w-3xl mx-auto">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus: outline-none focus:ring-2 focus:ring-gray-200 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập họ và tên"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Password */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus: outline-none focus:ring-2 focus:ring-gray-200 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div> */}

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus: outline-none focus:ring-2 focus:ring-gray-200 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Position */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Chức vụ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus: outline-none focus:ring-2 focus:ring-gray-200 ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="VD: Bác sĩ chuyên khoa"
                />
              </div>
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            {/* Specialty (Dropdown) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Chuyên khoa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaStethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus: outline-none bg-white focus:ring-2 focus:ring-gray-200 appearance-none ${
                    errors.specialty ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Chọn chuyên khoa</option>
                  {specialties.map((sp) => (
                    <option key={sp} value={sp}>{sp}</option>
                  ))}
                </select>
              </div>

              {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Btn
                onClick={handleCancel}
                title="Hủy"
                disabled={loading}
              />
              <Btn
                onClick={handleSubmit}
                title={loading ? "Đang thêm..." : "Thêm bác sĩ"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={"3000"}
        />
      )}
    </div>
  );
}
