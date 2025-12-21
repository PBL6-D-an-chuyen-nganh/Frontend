import { useState, useEffect } from 'react'
import PatientTable from '../../components/RoleDoctor/PatientList'
import { getPatients } from '../../api/getPatients';
import { usePatientFilterStore } from '../../store/usePatientFilterStore';

function PatientList() {
  const { date, setDate, patients, setPatients } = usePatientFilterStore();
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(date);
  const fetchPatients = async (date) => {
     try {
      const data = await getPatients(date);
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  } 

  useEffect(() => {
    fetchPatients(date);
  }, [date]);

  console.log("date", date);
  console.log("patients", patients);
  
  if(!patients.length) {
    return  (
      <div className='min-h-screen p-6'>
        <div className='flex items-center justify-center'>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-4 p-2 rounded-lg border border-gray-100 shadow-sm"
        />
        </div>
         <p className="flex justify-center items-center py-6 text-base font-semibold text-gray-600">Không có bệnh nhân nào trong ngày {formattedDate}.</p>
      </div>
    );   
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6 text-green-900">
        DANH SÁCH BỆNH NHÂN
      </h1> 
      <div>
        <SearchInput placeholder="Tìm kiếm bệnh nhân theo tên, ID..." />
        <div className='flex items-center justify-center'>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-4 p-2 rounded-lg border border-gray-100 shadow-sm"
        />
        </div>
        <PatientTable 
          patients={patients} 
        />
      </div>
    </div>
  )
}

export default PatientList