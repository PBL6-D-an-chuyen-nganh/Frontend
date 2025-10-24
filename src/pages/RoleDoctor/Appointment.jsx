import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../components/RoleDoctor/Appointment/AppointmentCard';
import AppointmentDetail from '../../components/RoleDoctor/Appointment/AppointmentDetail';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { getAppointmentByDoctor } from '../../api/getAppointmentByDoctor'; 
import { deleteAppointmentByDoctor } from '../../api/deleteAppointmentByDoctor';
import { useParams } from 'react-router-dom';

function DoctorAppointments() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelId, setPendingCancelId] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); 

  const openConfirm = (appointmentID) => {
    setPendingCancelId(appointmentID);
    setConfirmOpen(true);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getAppointmentByDoctor(doctorId, date);
        setAppointments(Array.isArray(data?.appointments) ? data.appointments : []);
        setTotal(typeof data?.total === 'number' ? data.total : (data?.appointments?.length || 0));
      } catch (err) {
        console.error(err);
        setError('Lỗi khi tải lịch hẹn.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId, date]);

  const handleConfirmCancel = async () => {
      if (!pendingCancelId) return
      try {
        const { error: Error } = await deleteAppointmentByDoctor(pendingCancelId)
        if (!Error) {
          setAppointments(prev => prev.filter(a => a.appointmentID !== pendingCancelId))
          setTotal(t => Math.max(0, t - 1))
        }
      } catch (err) {
        console.error(err)
        setError('Lỗi khi huỷ lịch hẹn.')
      } finally {
        setConfirmOpen(false)
        setPendingCancelId(null)
      }
    }
  

  if (loading) return <div className='max-w-6xl mx-auto gap-3 mb-6 text-center mt-10'>Đang tải...</div>;
  if (error) return <div className="max-w-6xl mx-auto px-6 py-12 text-red-600">{error}</div>;

  if (!appointments.length) {
    return (
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <p className="text-base font-semibold text-gray-600">Không có lịch hẹn nào trong ngày {date}.</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-4 p-2 border rounded"
        />
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lịch hẹn ngày {date}</h2>
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
              setExpandedId(expandedId === appointment.appointmentID ? null : appointment.appointmentID)
            }
            onRequestCancel={openConfirm} // bác sĩ có thể không huỷ, bạn có thể disable button
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        label="Huỷ lịch hẹn"
        question="Bạn có chắc muốn huỷ lịch hẹn này?"
        confirmLabel="HUỶ LỊCH HẸN"
        cancelLabel="Đóng"
        onConfirm={handleConfirmCancel}
        onCancel={() => { setConfirmOpen(false); setPendingCancelId(null); }}
      />
    </div>
  );
}

export default DoctorAppointments;
