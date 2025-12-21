import { useState } from 'react';

export default function DoctorAppointmentsTable(doctors) {
  const [doctors] = useState([
    {
      id: 'TS',
      name: 'Triệu Triệu Dương',
      appointments: 24
    },
    {
      id: 'CKI',
      name: 'Nguyễn Bá Mỹ Nhi A',
      appointments: 18
    },
    {
      id: 'ThS',
      name: 'Vũ Trường Khánh',
      appointments: 32
    },
    {
      id: 'PGS',
      name: 'Cẩm Ngọc Phượng',
      appointments: 15
    },
    {
      id: 'ThS',
      name: 'Nguyễn Văn An',
      appointments: 27
    }
  ]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Họ và Tên
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                ID Bác Sĩ
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Tổng Số Cuộc Hẹn
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {doctor.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {doctor.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  {doctor.appointments}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}