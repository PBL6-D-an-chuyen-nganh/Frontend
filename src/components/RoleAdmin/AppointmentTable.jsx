export default function DoctorAppointmentsTable({ data = [] }) {
  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                Họ và Tên
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                ID Bác Sĩ
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                Tổng Số Cuộc Hẹn
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-6 text-center text-gray-500"
                >
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((doctor) => (
                <tr
                  key={doctor.doctorId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {doctor.doctorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {doctor.doctorId}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {doctor.appointmentCount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
