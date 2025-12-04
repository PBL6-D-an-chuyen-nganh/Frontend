import React, { useEffect, useState } from 'react'
import AppointmentCard from '../../components/Appointment/AppointmentCard'
import AppointmentDetail from '../../components/Appointment/AppointmentDetail'
import { getAppointmentByCreator } from '../../api/getAppointmentByCreator'
import { deleteAppointment } from '../../api/deleteAppointment'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import { useParams } from 'react-router-dom'
import Toast from '../../components/Notification'
import Pagination from '../../components/Home/Page'

function AppointmentHistory() {
  const [toast, setToast] = useState(null)
  const { userId } = useParams()
  const [appointments, setAppointments] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingCancelId, setPendingCancelId] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 8   

  const openConfirm = (appointmentID) => {
    setPendingCancelId(appointmentID)
    setConfirmOpen(true)
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getAppointmentByCreator(userId, page, pageSize)
        console.log("getAppointmentByCreator data:", data)

        setAppointments(data.appointments)
        setTotal(data.totalElements)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error(err)
        setError('Lỗi khi tải lịch hẹn.')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchAppointments()
    }
  }, [userId, page]) 

  const handleConfirmCancel = async () => {
    if (!pendingCancelId) return
    try {
      const { error: Error } = await deleteAppointment(pendingCancelId)
      if (!Error) {
        setToast({
          message: 'Huỷ lịch hẹn thành công.',
          type: 'success'
        })

        setAppointments(prev => prev.filter(a => a.appointmentID !== pendingCancelId))
        setTotal(t => Math.max(0, t - 1))
      }
    } catch (err) {
      console.error(err)
      setError('Lỗi khi huỷ lịch hẹn.')
      setToast({ message: 'Huỷ lịch hẹn không thành công.' , type: 'error' })
    } finally {
      setConfirmOpen(false)
      setPendingCancelId(null)
    }
  }

  if (loading) return <div className='max-w-6xl mx-auto gap-3 mb-6 text-center mt-10'>Đang tải...</div>
  if (error) return <div className="max-w-6xl mx-auto px-6 py-12 text-red-600">{error}</div>

  if (!appointments.length) {
    return (
      <div className="min-h-screen ">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <AppointmentCard total={total} />
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <p className="text-base font-semibold text-gray-600">Chưa có lịch hẹn nào.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className='max-w-6xl mx-auto px-6 py-12'>
        <AppointmentCard total={total} />
        <div>
          {appointments.map((appointment) => (
            <AppointmentDetail
              key={appointment.appointmentID}
              appointment={appointment}
              isOpen={expandedId === appointment.appointmentID}
              onToggle={() =>
                setExpandedId(
                  expandedId === appointment.appointmentID
                    ? null
                    : appointment.appointmentID
                )
              }
              onRequestCancel={openConfirm}
            />
          ))}
        </div>

        <ConfirmModal
          isOpen={confirmOpen}
          label="Huỷ lịch hẹn"
          question="Bạn có chắc muốn huỷ lịch hẹn này?"
          confirmLabel="Huỷ lịch hẹn"
          cancelLabel="Đóng"
          onConfirm={handleConfirmCancel}
          onCancel={() => { setConfirmOpen(false); setPendingCancelId(null); }}
        />
      </div>

      <Pagination
        current={page}
        total={totalPages}
        onChange={(p) => setPage(p)}
      />
    </div>
  )
}

export default AppointmentHistory
