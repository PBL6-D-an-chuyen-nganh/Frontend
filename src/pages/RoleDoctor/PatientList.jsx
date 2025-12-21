import { useEffect } from 'react'
import PatientTable from '../../components/RoleDoctor/PatientList'
import { getPatients } from '../../api/getPatients';
import { usePatientFilterStore } from '../../store/usePatientFilterStore';

function PatientList() {
  const { date, setDate, patients, setPatients } = usePatientFilterStore();
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(date);

  useEffect(() => {
    if (date) {
      const fetchPatients = async () => {
        try {
          const data = await getPatients(date);
          setPatients(data || []); 
        } catch (error) {
          console.error("Error fetching patients:", error);
          setPatients([]); 
        }
      } 
      fetchPatients();
    }
  }, [date, setPatients]);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6 text-green-900">
        DANH SÁCH BỆNH NHÂN
      </h1> 
      
      {/* Input Date chỉ viết 1 lần duy nhất ở đây */}
      <div className='flex items-center justify-center mb-6'>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-4 p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Điều kiện hiển thị nội dung bên dưới */}
      <div className="container mx-auto px-4">
        {!patients || patients.length === 0 ? (
           <p className="flex justify-center items-center py-6 text-base font-semibold text-gray-600">
             Không có bệnh nhân nào trong ngày {formattedDate}.
           </p>
        ) : (
           <PatientTable patients={patients} />
        )}
      </div>
    </div>
  )
}

export default PatientList