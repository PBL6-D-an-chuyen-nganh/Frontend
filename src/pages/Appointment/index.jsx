import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Mail, Phone, FileText, UsersRound, Heart, CheckCircle } from 'lucide-react'
import pageimg from '../../assets/img/book.webp'
import Btn from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { createAppointment } from '../../api/createAppointment'
import Toast from '../../components/Notification'
import { getDoctorBySpecialty } from '../../api/getDoctorBySpecialty' 
import useDoctorStore from '../../store/useDoctorStore'
import AvailableDatePicker from '../../components/Calendar'

function AppointmentPage() {
  const axiosPrivate = useAxiosPrivate()
  const [toast, setToast] = useState(null)
  const [specialtyId, setSpecialtyId] = useState('')       
  const [dateInput, setDateInput] = useState('')           
  const [timeInput, setTimeInput] = useState('')           
  const [availableSlots, setAvailableSlots] = useState({})

  const { doctorsBySpecialty, setDoctorsBySpecialty } = useDoctorStore()

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
    doctorId: ''  
  })

  const departmentOptions = [
    { id: 1, label: 'Khoa Thẩm mỹ da liễu' },
    { id: 2, label: 'Khoa Khám da' }
  ]

  const genderOptions = [
    { id: 'Male', label: 'Nam' },
    { id: 'Female', label: 'Nữ' },
    { id: 'Other', label: 'Khác' }
  ]

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!specialtyId) return
      if (doctorsBySpecialty[specialtyId]) return
      try {
        const response = await getDoctorBySpecialty(specialtyId)
        setDoctorsBySpecialty(specialtyId, response || [])
      } catch (error) {
        console.error('Error fetching doctors:', error)
        setToast({
          message: 'Không thể tải danh sách bác sĩ, vui lòng thử lại!',
          type: 'error'
        })
      }
    }
    fetchDoctors()
  }, [specialtyId, doctorsBySpecialty, setDoctorsBySpecialty])

  const doctorOptions = (doctorsBySpecialty[specialtyId] || []).map((doc) => ({
    id: doc.userId ?? doc.id,
    label: doc.name
  }))

  const fetchAvailableSlots = async (doctorId) => {
    if (!doctorId) return setAvailableSlots({})
    try {
      const res = await axiosPrivate.get(`/api/doctors/${doctorId}/available-slots`)
      setAvailableSlots(res?.data || {})
    } catch (e) {
      console.error('Error fetching available slots:', e)
      setAvailableSlots({})
      setToast({
        message: 'Không tải được lịch trống của bác sĩ, vui lòng thử lại!',
        type: 'error'
      })
    }
  }

  const availableDates = Object.keys(availableSlots).sort()

  const getAvailableTimeOptions = () => {
    const times = dateInput ? (availableSlots[dateInput] || []) : []
    return times.map((t) => ({ id: t, label: t }))
  }

  const getSelectedLabel = (options, value, defaultText) => {
    const selected = options.find((opt) => opt.id === value)
    return selected ? selected.label : defaultText
  }

  const getSelectedTimeLabel = () => (timeInput ? timeInput : 'Chọn giờ khám')

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (['name', 'email', 'phoneNumber', 'dateOfBirth'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, [name]: value }
      }))
      return
    }

    if (name === 'date') {
      if (availableDates.length && !availableDates.includes(value)) {
        setToast({
          message: 'Ngày này không có lịch trống, vui lòng chọn ngày khác!',
          type: 'error'
        })
        return
      }
      setDateInput(value)
      setTimeInput('')
      setFormData((prev) => ({ ...prev, time: '' }))
      return
    }

    if (name === 'phone') {
      setFormData((prev) => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, phoneNumber: value }
      }))
      return
    }

    if (name === 'reason') {
      setFormData((prev) => ({ ...prev, note: value }))
      return
    }
  }

  const handleDropdownSelect = (name) => async (option) => {
    if (name === 'gender') {
      setFormData((prev) => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, gender: option.id }
      }))
      return
    }

    if (name === 'department') {
      setSpecialtyId(option.id)
      setFormData((prev) => ({ ...prev, doctorId: '', time: '' }))
      setAvailableSlots({})
      setDateInput('')
      setTimeInput('')
      return
    }

    if (name === 'doctor') {
      setFormData((prev) => ({ ...prev, doctorId: option.id }))
      setAvailableSlots({})
      setDateInput('')
      setTimeInput('')
      await fetchAvailableSlots(option.id)
      return
    }

    if (name === 'time') {
      setTimeInput(option.id)
      if (dateInput) {
        const isoLocal = `${dateInput}T${option.id}` 
        setFormData(prev => ({ ...prev, time: isoLocal }))
      }
      return
    }
  }

  const handleSubmit = async () => {
    if (
      !formData.patientInfo.name ||
      !formData.patientInfo.email ||
      !formData.patientInfo.phoneNumber ||
      !formData.patientInfo.gender ||
      !formData.patientInfo.dateOfBirth ||
      !formData.time ||
      !formData.doctorId ||
      !formData.note
    ) {
      setToast({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc', type: 'error' })
      return
    }

    const validDate = availableDates.includes(dateInput)
    const validTime = (availableSlots[dateInput] || []).includes(timeInput)
    if (!validDate || !validTime) {
      setToast({ message: 'Ngày/giờ không còn trống, vui lòng chọn lại!', type: 'error' })
      return
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
        doctorId: Number(formData.doctorId)
    }

    console.log('Submitting appointment:', appointmentData)
    const result = await createAppointment(axiosPrivate, appointmentData)

    if (result.error) {
      setToast({ message: 'Đặt lịch hẹn thất bại, vui lòng thử lại sau!', type: 'error' })
      return
    }

    setToast({ message: 'Đặt lịch hẹn thành công!', type: 'success' })

    setFormData({
      patientInfo: { name: '', email: '', phoneNumber: '', gender: '', dateOfBirth: '' },
      time: '',
      note: '',
      doctorId: ''
    })
    setSpecialtyId('')
    setDateInput('')
    setTimeInput('')
    setAvailableSlots({})
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Hero */}
      <div className='relative w-full h-72 overflow-hidden'>
        <img src={pageimg} alt='homepage' className='w-full h-full object-cover' />
      </div>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        {/* Appointment Details */}
        <div className='bg-white min-h-124 rounded-3xl shadow-2xl overflow-hidden mb-6 transform hover:scale-[1.01] transition-transform duration-300'>
          <div className='bg-green-900 p-6'>
            <div className='flex items-center gap-3'>
              <Calendar className='w-8 h-8 text-white' />
              <h2 className='text-2xl font-bold text-white'>CHI TIẾT LỊCH HẸN</h2>
            </div>
          </div>

          <div className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Department */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Heart className='w-5 h-5 text-green-900' />
                  Chuyên khoa <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={departmentOptions}
                  selected={getSelectedLabel(departmentOptions, specialtyId, 'Chọn chuyên khoa')}
                  onSelect={handleDropdownSelect('department')}
                />
                <p className='text-xs text-green-900 mt-2 flex items-center gap-1'>
                  <CheckCircle className='w-3 h-3' /> Vui lòng chọn chuyên khoa
                </p>
              </div>

              {/* Doctor */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <UsersRound className='w-5 h-5 text-green-900' />
                  Bác sĩ <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={doctorOptions}
                  selected={getSelectedLabel(doctorOptions, formData.doctorId, 'Chọn bác sĩ')}
                  onSelect={handleDropdownSelect('doctor')}
                  disabled={!specialtyId}
                />
                 <p className='text-xs text-green-900 mt-2 flex items-center gap-1'>
                  <CheckCircle className='w-3 h-3' /> Vui lòng chọn bác sĩ để xem lịch trống
                </p>
              </div>

              {/* Date */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Calendar className='w-5 h-5 text-green-900' />
                  Ngày khám <span className='text-red-500'>*</span>
                </label>

                <AvailableDatePicker
                  availableDates={availableDates}
                  value={dateInput}
                  onChange={(ds) => {
                    setDateInput(ds)
                    setTimeInput('')
                    setFormData(prev => ({ ...prev, time: '' }))
                  }}
                  disabled={!formData.doctorId}
                />
              </div>

              {/* Time */}
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <Clock className='w-5 h-5 text-green-900' />
                  Giờ khám <span className='text-red-500'>*</span>
                </label>
                <Dropdown
                  options={getAvailableTimeOptions()}
                  selected={getSelectedTimeLabel()}
                  onSelect={handleDropdownSelect('time')}
                  disabled={!dateInput}
                />
              </div>
            </div>

            <div className='mt-6 p-4 bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl border border-green-800'>
              <p className='text-sm text-green-900'>
                <strong>Lưu ý:</strong> Thời gian trên chỉ là dự kiến. Tổng đài sẽ liên hệ xác nhận thời gian chính xác sau khi bạn đặt hẹn.
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300'>
          <div className='bg-green-900 p-6'>
            <div className='flex items-center gap-3'>
              <User className='w-8 h-8 text-white' />
              <h2 className='text-2xl font-bold text-white'>THÔNG TIN BỆNH NHÂN</h2>
            </div>
          </div>
          <div className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                  <User className='w-4 h-4 text-green-900' />
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
                  className='w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300'
                  placeholder='Nhập số điện thoại'
                />
              </div>

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

            <div className='mt-8 flex justify-center'>
              <div onClick={handleSubmit} className='relative group cursor-pointer'>
                <div className='absolute -inset-1 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse'></div>
                <div className='relative'>
                  <Btn title='ĐẶT LỊCH HẸN NGAY' />
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
