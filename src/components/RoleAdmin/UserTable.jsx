import React, { useState } from 'react'
import Btn from '../Button'
import ConfirmModal from '../../components/Modal/ConfirmModal'

function UserTable({ users, onReport }) { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmReport = () => {
    if (selectedUser) {
      onReport(selectedUser.userId);
      handleCloseModal();
    }
  };

  return (
    <div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Họ và Tên</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Số lần huỷ lịch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{user.cancellationCount}</td>
                    <td className="w-3 py-4 text-sm text-gray-700">
                      <Btn
                          title={"Báo cáo"}
                          onClick={() => handleOpenModal(user)} 
                          className="bg-red-500 hover:bg-red-600 text-white" 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Chưa có dữ liệu người dùng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ConfirmModal 
          isOpen={isModalOpen}
          onCancel={handleCloseModal}
          onConfirm={handleConfirmReport}
          confirmLabel={"Báo cáo"}
          cancelLabel={"Huỷ"}
          label="Xác nhận báo cáo"
          question={`Bạn có chắc chắn muốn báo cáo người dùng ${selectedUser?.name} không?`}
        />
    </div>
  )
}

export default UserTable