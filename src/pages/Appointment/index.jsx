import React, { useState } from 'react'
import pageimg from '../../assets/img/book.webp'
import Btn from '../../components/Button'
import Dropdown from '../../components/Dropdown'

function AppointmentPage() {
  const [formData, setFormData] = useState({
    facility: '',
    date: '',
    time: '',
    department: '',
    purpose: '',
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    phone: '',
    reason: ''
  })

  // Dropdown options
  const departmentOptions = [
    { id: 'dept1', label: 'Khoa Khám da' },
    { id: 'dept2', label: 'Khoa Thẩm mỹ da liễu' }
  ];

  const purposeOptions = [
    { id: 'first', label: 'Khám lần đầu' },
    { id: 'second', label: 'Tái khám' }
  ];

  const genderOptions = [
    { id: 'male', label: 'Nam' },
    { id: 'female', label: 'Nữ' },
    { id: 'other', label: 'Khác' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDropdownSelect = (name) => (option) => {
    setFormData(prev => ({
      ...prev,
      [name]: option.id
    }))
  }

  const getSelectedLabel = (options, value, defaultText) => {
    const selected = options.find(opt => opt.id === value);
    return selected ? selected.label : defaultText;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Image */}
     <div className='w-full overflow-hidden'>
        <img src={pageimg} alt="homepage" className='w-full h-full object-cover'/>
      </div>

      {/* Main Form Container */}
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='bg-white rounded-2xl shadow-sm p-8'>
          
          {/* Appointment Details Section */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-green-900 mb-6'>NỘI DUNG CHI TIẾT ĐẶT LỊCH HẸN</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Chọn ngày */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn ngày <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='date'
                  value={formData.date}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='dd/mm/yyyy'
                />
              </div>

              {/* Chọn giờ */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn giờ <span className='text-red-500'>*</span>
                </label>
                <input
                  type='time'
                  name='time'
                  value={formData.time}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='--:--'
                />
              </div>
            </div>

            {/* Note */}
            <p className='text-sm text-gray-600 mt-3'>
              *Lưu ý: Thời gian trên chi là thời gian dự kiến, tổng đài sẽ liên hệ xác nhận thời gian chính xác tới quý khách sau khi quý khách đặt hẹn.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
              {/* Chọn chuyên khoa */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn chuyên khoa <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={departmentOptions}
                  selected={getSelectedLabel(departmentOptions, formData.department, 'Chọn chuyên khoa')}
                  onSelect={handleDropdownSelect('department')}
                />
              </div>

              {/* Mục đích đặt lịch */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Mục đích đặt lịch <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={purposeOptions}
                  selected={getSelectedLabel(purposeOptions, formData.purpose, 'Khám lần đầu')}
                  onSelect={handleDropdownSelect('purpose')}
                />
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-green-900 mb-6'>THÔNG TIN BỆNH NHÂN</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Họ và tên */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Họ và tên'
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Email'
                />
              </div>

              {/* Chọn giới tính */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn giới tính <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={genderOptions}
                  selected={getSelectedLabel(genderOptions, formData.gender, 'Chọn giới tính')}
                  onSelect={handleDropdownSelect('gender')}
                />
              </div>

              {/* Ngày tháng năm sinh */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Ngày tháng năm sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='dd/mm/yyyy'
                />
              </div>

              {/* Số điện thoại */}
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Số điện thoại <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Số điện thoại'
                />
              </div>

              {/* Lý do khám */}
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Lý do khám <span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='reason'
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none'
                  placeholder='Tình trạng sức khỏe của bạn, các vấn đề cần khám hoặc câu hỏi dành cho bác sĩ'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <Btn title="ĐẶT LỊCH HẸN" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage