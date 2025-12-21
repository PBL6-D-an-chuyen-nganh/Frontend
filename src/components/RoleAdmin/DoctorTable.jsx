import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserMd, FaUndo } from 'react-icons/fa';
import EditModal from './EditModal';
import { editDoctorInfor } from '../../api/getDoctorInforToEdit';
import { editDoctor } from '../../api/editDoctorInfor';
import { deleteDoctor } from '../../api/deleteDoctor';
import { reOpenDoctor } from '../../api/reopenDoctor';
import ConfirmModal from '../Modal/ConfirmModal';

const DoctorTable = ({ doctors, setToast, onDataChange }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [isReopenMode, setIsReopenMode] = useState(false);

  const getDoctorData = async (doctorId) => {
    try {
      const data = await editDoctorInfor(doctorId);
      setSelectedDoctor(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin bác sĩ:', error);
      setToast({ type: 'error', message: 'Lỗi khi lấy thông tin bác sĩ' });
    }
  };

  const onEdit = async (updatedDoctor) => {
    setLoading(true);
    const { message, error } = await editDoctor(updatedDoctor.userId, updatedDoctor);
    setLoading(false);
    
    if (error) {
      setToast({ type: 'error', message: `Cập nhật thông tin bác sĩ thất bại!` });
    } else {
      setToast({ type: 'success', message: 'Cập nhật thông tin bác sĩ thành công!' });
      onDataChange(); 
    }
  };

  const onDelete = async () => {
    if (!doctorToDelete) return;
    setLoading(true);
    const { message, error } = await deleteDoctor(doctorToDelete.userId);
    setLoading(false);
    
    if (error) {
      setToast({ type: 'error', message: `Xóa bác sĩ thất bại: ${error}` });
    } else {
      setToast({ type: 'success', message: 'Xóa bác sĩ thành công!' });
      onDataChange();
    }
    
    setIsConfirmOpen(false);
    setDoctorToDelete(null);
  };

  const onReopen = async () => {
    if (!doctorToDelete) return;
    
    setLoading(true);
    const { message, error } = await reOpenDoctor(doctorToDelete.userId);
    setLoading(false);
    
    if (error) {
      setToast({ type: 'error', message: `Khôi phục bác sĩ thất bại: ${error}` });
    } else {
      setToast({ type: 'success', message: 'Khôi phục bác sĩ thành công!' });
      onDataChange();
    }
    
    setIsConfirmOpen(false);
    setDoctorToDelete(null);
    setIsReopenMode(false);
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setIsReopenMode(false);
    setIsConfirmOpen(true);
  };

  const handleReopenClick = (doctor) => {
    setDoctorToDelete(doctor);
    setIsReopenMode(true);
    setIsConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setDoctorToDelete(null);
    setIsReopenMode(false);
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
              <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                Trạng thái
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
                <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {doctor.status === 'ACTIVE' ? 'ACTIVE' : 'DELETED'}
                    </span>
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
                    {doctor.status === 'ACTIVE' ? (
                      <button
                        onClick={() => handleDeleteClick(doctor)}
                        disabled={loading}
                        className="text-red-700 hover:text-red-800 cursor-pointer transition-colors disabled:opacity-50"
                        title="Xóa"
                      >
                        <FaTrash size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReopenClick(doctor)}
                        disabled={loading}
                        className="text-green-900 hover:text-green-700 cursor-pointer transition-colors disabled:opacity-50"
                        title="Khôi phục"
                      >
                        <FaUndo size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">Đang tải...</div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedDoctor && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          doctorData={selectedDoctor}
          onSave={handleSaveDoctor}
        />
      )}

      {/* Confirm Delete/Reopen Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={isReopenMode ? onReopen : onDelete}
        onCancel={handleCancelDelete}
        label={isReopenMode ? "KHÔI PHỤC BÁC SĨ" : "XOÁ BÁC SĨ"}
        question={
          isReopenMode
            ? `Bạn có chắc chắn muốn khôi phục quyền cho bác sĩ "${doctorToDelete?.name}"?`
            : `Bạn có chắc chắn muốn xóa bác sĩ "${doctorToDelete?.name}"? Hành động này không thể hoàn tác.`
        }
        confirmLabel={isReopenMode ? "Khôi phục" : "Xóa"}
        cancelLabel="Hủy"
      />
    </>
  );
};

export default DoctorTable;