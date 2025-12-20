import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../components/RoleDoctor/Appointment/AppointmentCard';
import AppointmentDetail from '../../components/RoleDoctor/Appointment/AppointmentDetail';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { getAppointmentByDoctor } from '../../api/getAppointmentByDoctor'; 
import { deleteAppointmentByDoctor } from '../../api/deleteAppointmentByDoctor';
import { useParams } from 'react-router-dom';
import Toast from '../../components/Notification';

function DoctorAppointments() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelId, setPendingCancelId] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); 

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(date);

  const openConfirm = (appointmentID) => {
    setPendingCancelId(appointmentID);
    setConfirmOpen(true);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getAppointmentByDoctor(doctorId, date);
        setAppointments(data.appointments);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
        setError('Lỗi khi tải lịch hẹn.');
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId, date]);

  const handleConfirmCancel = async () => {
    if (!pendingCancelId) return;
    try {
      const { error: Error } = await deleteAppointmentByDoctor(pendingCancelId);
      if (!Error) {
        setAppointments(prev => prev.filter(a => a.appointmentID !== pendingCancelId));
        setTotal(t => Math.max(0, t - 1));
        setConfirmOpen(false);
        setToast({
          message: 'Huỷ lịch hẹn thành công.',
          type: 'success'
        });
      }
    } catch (err) {
      setToast({
        message: 'Huỷ lịch hẹn không thành công.',
        type: 'error'
      });
      console.error(err);
      setError('Lỗi khi huỷ lịch hẹn.');
    } finally {
      setPendingCancelId(null);
    }
  };

  if (loading) return <div className='max-w-6xl mx-auto gap-3 mb-6 text-center mt-10'>Đang tải...</div>;
  if (error) return <div className="max-w-6xl mx-auto px-6 py-12 text-red-600">{error}</div>;

  if (!appointments.length) {
    return (
      <div className="min-h-screen">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="p-6 flex flex-col items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-4 p-2 rounded-lg border border-gray-100 shadow-sm"
            />
            <p className="text-base font-semibold text-gray-600">
              Không có lịch hẹn nào trong ngày {formattedDate}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lịch hẹn ngày {formattedDate}</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
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
    </div>
  );
}

export default DoctorAppointments;
