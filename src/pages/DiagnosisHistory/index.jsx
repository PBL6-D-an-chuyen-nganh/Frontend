import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DiagnosistTable from '../../components/DiagnosisTable';
import { getPatientDiagnosisHistory } from '../../api/getPatientDiagnosisHistory';

function DiagnosisHistory() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await getPatientDiagnosisHistory(userId);
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPatients();
  }, [userId]);

  if (loading) {
    return <div className='min-h-screen p-6 flex justify-center'>Đang tải...</div>;
  }

  if (!patients.length) {
    return (
      <div className='min-h-screen p-6'>
        <p className="flex justify-center items-center py-6 text-base font-semibold text-gray-600">
          Không có lịch sử khám bệnh
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6 text-green-900">
        LỊCH SỬ KHÁM BỆNH
      </h1>
      <div>
        <DiagnosistTable patients={patients} />
      </div>
    </div>
  );
}

export default DiagnosisHistory;
