import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiAward } from 'react-icons/fi';
import { MdLocalHospital } from 'react-icons/md';
import Dropdown from '../Dropdown';

const EditModal = ({ isOpen, onClose, doctorData, onSave }) => {
  const degreeOptions = [
    { id: 6, label: "GS" },
    { id: 5, label: "PGS" },
    { id: 4, label: "TS" },
    { id: 3, label: "ThS" },
    { id: 2, label: "CKII" },
    { id: 1, label: "CKI" }
  ];

  const specialtyOptions = [
    { id: 1, label: "Khoa khám da" },
    { id: 2, label: "Khoa thẩm mỹ" }
  ];

  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    phoneNumber: '',
    position: '',
    degree: '',
    specialty: ''
  });

  const [errors, setErrors] = useState({});

  // Cập nhật formData khi doctorData thay đổi
  useEffect(() => {
    if (doctorData) {
      setFormData({
        userId: doctorData.userId || '',
        name: doctorData.name || '',
        email: doctorData.email || '',
        phoneNumber: doctorData.phoneNumber || '',
        position: doctorData.position || '',
        degree: doctorData.degree || '',
        specialty: doctorData.specialty || ''
      });
    }
  }, [doctorData]);

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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải có 10 chữ số';
    }
    if (!formData.position.trim()) newErrors.position = 'Vui lòng nhập chức vụ';
    if (!formData.degree.trim()) newErrors.degree = 'Vui lòng nhập học vị';
    if (!formData.specialty.trim()) newErrors.specialty = 'Vui lòng nhập chuyên khoa';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Tạo payload đúng format như Postman
      const payload = {
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        position: formData.position,
        degree: formData.degree,
        specialty: formData.specialty
      };
      
      console.log('Payload gửi đi:', payload); // Debug
      onSave(payload);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Chỉnh sửa thông tin bác sĩ</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FiUser className="mr-2 text-gray-500" />
                Họ và tên <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập họ và tên"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FiMail className="mr-2 text-gray-500" />
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="mr-2 text-gray-500" />
                Số điện thoại <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập số điện thoại"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FiBriefcase className="mr-2 text-gray-500" />
                Chức vụ <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                  errors.position ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập chức vụ"
              />
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Học vị */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiAward className="mr-2 text-gray-500" />
                  Học vị <span className="text-red-500 ml-1">*</span>
                </label>
                <Dropdown
                  options={degreeOptions}
                  selected={formData.degree || "Chọn học vị"}
                  onSelect={(opt) =>
                    setFormData((prev) => ({
                      ...prev,
                      degree: opt.label
                    }))
                  }
                />
                {errors.degree && (
                  <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
                )}
              </div>

              {/* Chuyên khoa */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdLocalHospital className="mr-2 text-gray-500" />
                  Chuyên khoa <span className="text-red-500 ml-1">*</span>
                </label>
                <Dropdown
                  options={specialtyOptions}
                  selected={formData.specialty || "Chọn chuyên khoa"}
                  onSelect={(opt) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialty: opt.label
                    }))
                  }
                />
                {errors.specialty && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-900 text-white rounded-lg hover:bg-white hover:text-green-900 border-2 border-green-900 transition-colors font-medium"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;