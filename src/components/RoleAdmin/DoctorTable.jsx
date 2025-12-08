import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import EditModal from './EditModal';
import { editDoctorInfor } from '../../api/editDoctorInfor';

const DoctorTable = ({ doctors}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDoctorData = async (doctorId) => {
    try {
      const data = await editDoctorInfor(doctorId);
        setSelectedDoctor(data);
        setIsModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin bác sĩ:', error);
    } finally {
    }
  };

  const handleEditClick = (doctorId) => {
    console.log('Click edit với ID:', doctorId); 
    getDoctorData(doctorId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleSaveDoctor = (updatedDoctor) => {
    onEdit(updatedDoctor);
    handleCloseModal();
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                Họ và Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                Chức vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                Học vị
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                Chuyên khoa
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-green-900 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.userId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{doctor.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{doctor.degree}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{doctor.specialty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleEditClick(doctor.userId)}
                      disabled={loading}
                      className="text-green-900 hover:text-green-800 cursor-pointer transition-colors disabled:opacity-50"
                      title="Chỉnh sửa"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(doctor.userId)}
                      className="text-red-700 hover:text-red-800 cursor-pointer transition-colors"
                      title="Xóa"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">Đang tải...</div>
        </div>
      )}

      {selectedDoctor && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          doctorData={selectedDoctor}
          onSave={handleSaveDoctor}
        />
      )}
    </>
  );
};

export default DoctorTable;