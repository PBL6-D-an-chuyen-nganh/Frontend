import React, { useState, useEffect } from 'react'
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
    { id: 2, label: 'Khoa Khám da' },
    { id: 1, label: 'Khoa Thẩm mỹ da liễu' }
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
    <div className='min-h-screen bg-gray-50'>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className='w-full overflow-hidden'>
        <img src={pageimg} alt="homepage" className='w-full h-full object-cover'/>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='bg-white rounded-2xl shadow-sm p-8'>
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-green-900 mb-6'>NỘI DUNG CHI TIẾT ĐẶT LỊCH HẸN</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn chuyên khoa <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={departmentOptions}
                  selected={getSelectedLabel(departmentOptions, formData.specialtyId, 'Chọn chuyên khoa')}
                  onSelect={handleDropdownSelect('department')}
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Vui lòng chọn chuyên khoa trước để xem lịch trống
                </p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn ngày <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='date'
                  value={dateInput}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  disabled={!formData.specialtyId}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  placeholder='dd/mm/yyyy'
                />
                {busyDates.length > 0 && formData.specialtyId && (
                  <p className='text-xs text-red-500 mt-1'>
                    Một số ngày đã hết lịch hẹn
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn giờ <span className='text-red-500'>*</span>
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
                  <p className='text-xs text-orange-500 mt-1'>
                    Một số khung giờ đã hết chỗ
                  </p>
                )}
              </div>
            </div>

            <p className='text-sm text-gray-600 mt-3'>
              *Lưu ý: Thời gian trên chi là thời gian dự kiến, tổng đài sẽ liên hệ xác nhận thời gian chính xác tới quý khách sau khi quý khách đặt hẹn.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
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

          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-green-900 mb-6'>THÔNG TIN BỆNH NHÂN</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.patientInfo.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Họ và tên'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.patientInfo.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Email'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Chọn giới tính <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={genderOptions}
                  selected={getSelectedLabel(genderOptions, formData.patientInfo.gender, 'Chọn giới tính')}
                  onSelect={handleDropdownSelect('gender')}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Ngày tháng năm sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='dateOfBirth'
                  value={formData.patientInfo.dateOfBirth}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='dd/mm/yyyy'
                />
              </div>

              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Số điện thoại <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.patientInfo.phoneNumber}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
                  placeholder='Số điện thoại'
                />
              </div>

              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Lý do khám <span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='reason'
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={4}
                  className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none'
                  placeholder='Tình trạng sức khỏe của bạn, các vấn đề cần khám hoặc câu hỏi dành cho bác sĩ'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <div onClick={handleSubmit}>
              <Btn title="ĐẶT LỊCH HẸN" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage
