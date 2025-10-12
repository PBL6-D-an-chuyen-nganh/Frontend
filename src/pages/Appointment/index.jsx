import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Mail, Phone, FileText, Sparkles, Heart, CheckCircle } from 'lucide-react'
import pageimg from '../../assets/img/book.webp'
import Btn from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { createAppointment } from '../../api/createAppointment'
import { getBusyDate } from '../../api/getBusyDate'
import { getBusyTime } from '../../api/getBusyTime'
import Toast from '../../components/Notification'
import useDateStore from '../../store/useDateStore'
import useTimeStore from '../../store/useTimeStore'

function AppointmentPage() {
  const axiosPrivate = useAxiosPrivate()
  const [toast, setToast] = useState(null)
  const { busyDates, setBusyDates } = useDateStore()
  const { busySlots, setBusySlots, clearBusySlots } = useTimeStore()

  const [formData, setFormData] = useState({
    patientInfo: {
      name: '',
      email: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: ''
    },
    time: '',
    note: '',
    specialtyId: '',
    purpose: ''
  })

  const [dateInput, setDateInput] = useState('')
  const [timeInput, setTimeInput] = useState('')

  const departmentOptions = [
    { id: 1, label: 'Khoa Thẩm mỹ da liễu' },
    { id: 2, label: 'Khoa Khám da' }
  ];

  const purposeOptions = [
    { id: 'first', label: 'Khám lần đầu' },
    { id: 'second', label: 'Tái khám' }
  ];

  const genderOptions = [
    { id: 'Male', label: 'Nam' },
    { id: 'Female', label: 'Nữ' },
    { id: 'Other', label: 'Khác' }
  ];

  const timeOptions = [
    { id: '07:00', label: '07:00' },
    { id: '07:35', label: '07:35' },
    { id: '08:10', label: '08:10' },
    { id: '08:45', label: '08:45' },
    { id: '09:20', label: '09:20' },
    { id: '09:55', label: '09:55' },
    { id: '10:30', label: '10:30' },
    { id: '13:00', label: '13:00' },
    { id: '13:35', label: '13:35' },
    { id: '14:10', label: '14:10' },
    { id: '14:45', label: '14:45' },
    { id: '15:20', label: '15:20' },
    { id: '15:55', label: '15:55' },
    { id: '16:30', label: '16:30' },
  ];

  useEffect(() => {
    const fetchBusyDates = async () => {
      if (formData.specialtyId) {
        try {
          const response = await getBusyDate(formData.specialtyId);
          setBusyDates(response || []);
        } catch (error) {
          console.error('Error fetching busy dates:', error);
          setToast({
            message: 'Không thể tải danh sách ngày bận, vui lòng thử lại!',
            type: 'error'
          });
        }
      } else {
        setBusyDates([]);
      }
    };

    fetchBusyDates();
  }, [formData.specialtyId, setBusyDates]);

  useEffect(() => {
    const fetchBusySlotsFn = async () => {
      if (dateInput && formData.specialtyId) {
        try {
          const response = await getBusyTime(dateInput);
          const specialtyKey = String(formData.specialtyId);
          const rawSlots = response?.[specialtyKey] || [];
          console.log('Fetched busy slots:', rawSlots);

          const formatted = rawSlots.map(s => {
            const part = s.includes('T') ? s.split('T')[1] : s;
            return part.slice(0, 5); 
          });

          setBusySlots(formatted);
        } catch (error) {
          console.error('Error fetching busy slots:', error);
          setToast({
            message: 'Không thể tải danh sách giờ bận, vui lòng thử lại!',
            type: 'error'
          });
          clearBusySlots();
        }
      } else {
        clearBusySlots();
      }
    };
    fetchBusySlotsFn();
  }, [dateInput, formData.specialtyId, setBusySlots, clearBusySlots]);

  const isDateBusy = (dateString) => {
    return busyDates.includes(dateString);
  };

  const isTimeSlotBusy = (timeSlot) => {
    return busySlots.includes(timeSlot);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getAvailableTimeOptions = () => {
    return timeOptions.map(option => ({
      ...option,
      disabled: isTimeSlotBusy(option.id)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (['name', 'email', 'phoneNumber', 'dateOfBirth'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        patientInfo: {
          ...prev.patientInfo,
          [name]: value
        }
      }))
    } else if (name === 'date') {
      if (isDateBusy(value)) {
        setToast({
          message: 'Ngày này đã hết lịch hẹn, vui lòng chọn ngày khác!',
          type: 'error'
        });
        return;
      }

      setTimeInput('');
      clearBusySlots();
      setDateInput(value);
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
    } else if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        patientInfo: {
          ...prev.patientInfo,
          phoneNumber: value
        }
      }))
    } else if (name === 'reason') {
      setFormData(prev => ({
        ...prev,
        note: value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleDropdownSelect = (name) => (option) => {
    if (name === 'gender') {
      setFormData(prev => ({
        ...prev,
        patientInfo: {
          ...prev.patientInfo,
          gender: option.id
        }
      }))
    } else if (name === 'department') {
      setDateInput('');
      setTimeInput('');
      clearBusySlots();
      setFormData(prev => ({
        ...prev,
        specialtyId: option.id,
        time: ''
      }))
    } else if (name === 'purpose') {
      setFormData(prev => ({
        ...prev,
        purpose: option.id
      }))
    } else if (name === 'time') {
      if (isTimeSlotBusy(option.id)) {
        setToast({
          message: 'Khung giờ này đã hết chỗ, vui lòng chọn giờ khác!',
          type: 'error'
        });
        return;
      }
      setTimeInput(option.id);
      if (dateInput) {
        setFormData(prev => ({
          ...prev,
          time: `${dateInput}T${option.id}:00`
        }))
      }
    }
  }

  const getSelectedLabel = (options, value, defaultText) => {
    const selected = options.find(opt => opt.id === value);
    return selected ? selected.label : defaultText;
  }

  const getSelectedTimeLabel = () => {
    if (timeInput) {
      const option = timeOptions.find(opt => opt.id === timeInput);
      return option ? option.label : 'Chọn giờ khám';
    }
    return 'Chọn giờ khám';
  }

  const handleSubmit = async () => {
    if (!formData.patientInfo.name || !formData.patientInfo.email || 
        !formData.patientInfo.phoneNumber || !formData.patientInfo.gender ||
        !formData.patientInfo.dateOfBirth || !formData.time || 
        !formData.specialtyId || !formData.note) {
      setToast({
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc',
        type: 'error'
      });
      return;
    }

    if (isDateBusy(dateInput)) {
      setToast({
        message: 'Ngày này đã hết lịch hẹn, vui lòng chọn ngày khác!',
        type: 'error'
      });
      return;
    }

    if (isTimeSlotBusy(timeInput)) {
      setToast({
        message: 'Khung giờ này đã hết chỗ, vui lòng chọn giờ khác!',
        type: 'error'
      });
      return;
    }

    const appointmentData = {
      patientInfo: {
        name: formData.patientInfo.name,
        email: formData.patientInfo.email,
        phoneNumber: formData.patientInfo.phoneNumber,
        gender: formData.patientInfo.gender,
        dateOfBirth: formData.patientInfo.dateOfBirth
      },
      time: formData.time,
      note: formData.note,
      specialtyId: formData.specialtyId
    };

    console.log('Sending appointment data:', appointmentData);

    const result = await createAppointment(axiosPrivate, appointmentData);
    
    if (result.error) {
      console.error('Error:', result.error);
      setToast({
        message: 'Đặt lịch hẹn thất bại, vui lòng thử lại sau!',
        type: 'error'
      });
    } else {
      console.log('Success:', result.message);
      setToast({
        message: 'Đặt lịch hẹn thành công!',
        type: 'success'
      });
      
      setFormData({
        patientInfo: {
          name: '',
          email: '',
          phoneNumber: '',
          gender: '',
          dateOfBirth: ''
        },
        time: '',
        note: '',
        specialtyId: '',
        purpose: ''
      });
      setDateInput('');
      setTimeInput('');
      clearBusySlots();
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Hero Image with Overlay */}
      <div className='relative w-full h-72 overflow-hidden'>
        <img src={pageimg} alt="homepage" className='w-full h-full object-cover'/>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        {/* Appointment Details Card */}
        <div className='bg-white min-h-124 rounded-3xl shadow-2xl overflow-hidden mb-6 transform hover:scale-[1.01] transition-transform duration-300'>
          <div className='bg-green-900 p-6'>
            <div className='flex items-center gap-3'>
              <Calendar className='w-8 h-8 text-white' />
              <h2 className='text-2xl font-bold text-white'>CHI TIẾT LỊCH HẸN</h2>
            </div>
          </div>

          <div className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Department Selection */}
              <div className='md:col-span-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Heart className='w-5 h-5 text-rose-500' />
                  Chuyên khoa <span className='text-red-500'>*</span>
                </label>
                <div className='relative group'>
                  <div className='relative'>
                    <Dropdown
                      options={departmentOptions}
                      selected={getSelectedLabel(departmentOptions, formData.specialtyId, 'Chọn chuyên khoa')}
                      onSelect={handleDropdownSelect('department')}
                    />
                  </div>
                </div>
                <p className='text-xs text-green-900 mt-2 flex items-center gap-1'>
                  <CheckCircle className='w-3 h-3' />
                  Vui lòng chọn chuyên khoa để xem lịch trống
                </p>
              </div>

              {/* Date Selection */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Calendar className='w-5 h-5 text-green-900'/>
                  Ngày khám <span className='text-red-500'>*</span>
                </label>
                <div className='relative group'>
                  <input
                    type='date'
                    name='date'
                    value={dateInput}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    disabled={!formData.specialtyId}
                    className='relative w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                  />
                </div>
                {busyDates.length > 0 && formData.specialtyId && (
                  <p className='text-xs text-orange-600 mt-2 font-medium'>
                    Một số ngày đã hết lịch
                  </p>
                )}
              </div>

              {/* Time Selection */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Clock className='w-5 h-5 text-green-900' />
                  Giờ khám <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>                
                    <Dropdown
                      options={getAvailableTimeOptions()}
                      selected={getSelectedTimeLabel()}
                      onSelect={handleDropdownSelect('time')}
                      disabled={!dateInput}
                    />
                </div>
                {busySlots.length > 0 && dateInput && (
                  <p className='text-xs text-orange-600 mt-2 font-medium'>
                    Một số khung giờ đã kín
                  </p>
                )}
              </div>
            </div>

            <div className='mt-6 p-4 bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl border border-green-800'>
              <p className='text-sm text-green-900'>
                <strong>Lưu ý:</strong> Thời gian trên chỉ là dự kiến. Tổng đài sẽ liên hệ xác nhận thời gian chính xác sau khi bạn đặt hẹn.
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info Card */}
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300'>
          <div className='bg-green-900 p-6'>
            <div className='flex items-center gap-3'>
              <User className='w-8 h-8 text-white' />
              <h2 className='text-2xl font-bold text-white'>THÔNG TIN BỆNH NHÂN</h2>
            </div>
          </div>

          <div className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Name */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <User className='w-4 h-4 text-green-900'/>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.patientInfo.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300'
                  placeholder='Nhập họ và tên'
                />
              </div>

              {/* Email */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Mail className='w-4 h-4 text-green-900' />
                  Email <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.patientInfo.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300'
                  placeholder='Nhập địa chỉ email'
                />
              </div>

              {/* Gender */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <User className='w-4 h-4 text-green-900' />
                  Giới tính <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={genderOptions}
                  selected={getSelectedLabel(genderOptions, formData.patientInfo.gender, 'Chọn giới tính')}
                  onSelect={handleDropdownSelect('gender')}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Calendar className='w-4 h-4 text-green-900' />
                  Ngày sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='dateOfBirth'
                  value={formData.patientInfo.dateOfBirth}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300'
                />
              </div>

              {/* Phone */}
              <div className='md:col-span-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Phone className='w-4 h-4 text-green-900' />
                  Số điện thoại <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.patientInfo.phoneNumber}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-grray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300'
                  placeholder='Nhập số điện thoại'
                />
              </div>

              {/* Reason */}
              <div className='md:col-span-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <FileText className='w-4 h-4 text-green-900' />
                  Lý do khám <span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='reason'
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={4}
                  className='w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 resize-none transition-all duration-300'
                  placeholder='Mô tả tình trạng sức khỏe, triệu chứng hoặc câu hỏi cho bác sĩ...'
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className='mt-8 flex justify-center'>
              <div 
                onClick={handleSubmit}
                className='relative group cursor-pointer'
              >
                <div className='absolute -inset-1 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse'></div>
                <div className='relative'>
                  <Btn title="ĐẶT LỊCH HẸN NGAY" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage