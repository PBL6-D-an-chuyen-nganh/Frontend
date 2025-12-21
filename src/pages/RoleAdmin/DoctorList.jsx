import React, { useState } from 'react';
import { FaEdit, FaTrash, FaRedo } from 'react-icons/fa'; // Import thêm FaRedo
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
  const [doctorToAct, setDoctorToAct] = useState(null); 

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

  const onConfirmAction = async () => {
    if (!doctorToAct) return;
    setLoading(true);
    let result = { error: null, message: '' };
    if (doctorToAct.status === 'ACTIVE') {
        result = await deleteDoctor(doctorToAct.userId);
    } else {
        result = await reOpenDoctor(doctorToAct.userId); 
    }
    setLoading(false);
    if (result.error) {
      setToast({ 
        type: 'error', 
        message: `${doctorToAct.status === 'ACTIVE' ? 'Xóa' : 'Khôi phục'} thất bại: ${result.error}` 
      });
    } else {
      setToast({ 
        type: 'success', 
        message: `${doctorToAct.status === 'ACTIVE' ? 'Xóa' : 'Khôi phục'} thành công!` 
      });
      onDataChange(); 
    }
    
    setIsConfirmOpen(false);
    setDoctorToAct(null);
  };
  const handleActionClick = (doctor) => {
    setDoctorToAct(doctor);
    setIsConfirmOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsConfirmOpen(false);
    setDoctorToAct(null);
  };

  const handleEditClick = (doctorId) => {
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

  const getModalContent = () => {
    if (!doctorToAct) return { label: '', question: '', confirmLabel: '' };

    if (doctorToAct.status === 'ACTIVE') {
        return {
            label: "XOÁ BÁC SĨ",
            question: `Bạn có chắc chắn muốn xóa bác sĩ "${doctorToAct.name}"? Hành động này sẽ vô hiệu hóa tài khoản.`,
            confirmLabel: "Xóa"
        };
    } else {
        return {
            label: "KHÔI PHỤC BÁC SĨ",
            question: `Bạn có muốn cấp lại quyền hoạt động cho bác sĩ "${doctorToAct.name}"?`,
            confirmLabel: "Khôi phục"
        };
    }
  };

  const modalContent = getModalContent();

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
                    {/* Nút Edit - Chỉ hiện hoặc cho phép khi Active tuỳ nghiệp vụ, ở đây mình vẫn để hiện */}
                    <button
                      onClick={() => handleEditClick(doctor.userId)}
                      disabled={loading}
                      className="text-green-900 hover:text-green-800 cursor-pointer transition-colors disabled:opacity-50"
                      title="Chỉnh sửa"
                    >
                      <FaEdit size={18} />
                    </button>

                    {/* Logic thay đổi icon dựa trên status */}
                    {doctor.status === 'ACTIVE' ? (
                        <button
                            onClick={() => handleActionClick(doctor)}
                            disabled={loading}
                            className="text-red-700 hover:text-red-800 cursor-pointer transition-colors disabled:opacity-50"
                            title="Xóa"
                        >
                            <FaTrash size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={() => handleActionClick(doctor)}
                            disabled={loading}
                            className="text-yellow-600 hover:text-yellow-700 cursor-pointer transition-colors disabled:opacity-50"
                            title="Khôi phục / Cấp lại quyền"
                        >
                            <FaRedo size={18} />
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">Đang xử lý...</div>
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

      {/* Confirm Action Modal (Dùng chung cho cả Delete và Restore) */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={onConfirmAction}
        onCancel={handleCancelConfirm}
        label={modalContent.label}
        question={modalContent.question}
        confirmLabel={modalContent.confirmLabel}
        cancelLabel="Hủy"
      />
    </>
  );
};

export default DoctorTable;