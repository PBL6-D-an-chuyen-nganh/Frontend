import React from 'react'
import { FiChevronUp, FiUser, FiMail, FiPhone, FiCalendar, FiCheck } from 'react-icons/fi'
import AppointmentInfor from './AppointmentInfor'
import Btn from '../Button'

const formatDateTime = (iso) => {
  if (!iso) return { date: '—', time: '—' }
  const d = new Date(iso)
  const date = d.toLocaleDateString('vi-VN')
  const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  return { date, time }
}

const AppointmentDetail = ({ appointment, isOpen, onToggle, onRequestCancel }) => {
  const doctor = appointment.doctor || {}
  const patient = appointment.patientInfo || {}
  const { date, time } = formatDateTime(appointment.time)

  return (
    <div className="bg-white rounded-3xl shadow-2xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{patient.name || '—'}</h2>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <FiCalendar className="w-4 h-4 text-green-900" />
            {date} – {time}
          </p>
        </div>
        <button
          onClick={onToggle}
          className="text-green-900 p-2 hover:bg-green-900 hover:text-white rounded-lg transition"
          aria-label={isOpen ? 'Đóng chi tiết' : 'Mở chi tiết'}
        >
          <FiChevronUp className="w-6 h-6" />
        </button>
      </div>

      {/* Details */}
      {isOpen && (
        <>
          <div className="px-6 space-y-1 mb-6 pb-6 border-t border-green-900 pt-6">
            <AppointmentInfor icon={FiUser} label="Bác sĩ" degree={doctor.degree} name={doctor.name} position={doctor.position} />
            <AppointmentInfor icon={FiMail} label="Email" value={patient.email} />
            <AppointmentInfor icon={FiPhone} label="Số điện thoại" value={patient.phoneNumber} />
            <AppointmentInfor icon={FiCheck} label="Ghi chú" value={appointment.note} />
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex justify-end">
            <span className="flex items-center text-gray-500 mr-4">
              Bạn chỉ có thể huỷ lịch trước 24h trước giờ hẹn.
            </span>
            <Btn
              title="Huỷ lịch"                
              disabled={appointment.status === "inactive"}                 
              onClick={() => onRequestCancel?.(appointment.appointmentID)}
              variant="danger"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AppointmentDetail
