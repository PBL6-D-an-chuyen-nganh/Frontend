import { useState, useEffect } from 'react'
import DiagnosistTable from '../../components/DiagnosisTable';
import { getPatientDiagnosisHistory } from '../../api/getPatientDiagnosisHistory';

function DiagnosisHistory() {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await getPatientDiagnosisHistory();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div className='max-w-6xl mx-auto gap-3 mb-6 text-center text-gray-500 mt-10'>Đang tải...</div>;
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
