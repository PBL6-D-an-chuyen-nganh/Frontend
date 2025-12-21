import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import Toast from '../../components/Notification';
import SearchInput from '../../components/Search';
import Pagination from '../../components/Home/Page';
import { GetUserList } from '../../api/getUserList';
import { searchUserByAdmin } from '../../api/searchUserByAdmin';

export default function UserManagement() {
  const [users, setUsers] = useState([]);              
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);        

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let response;
      if (searchTerm.trim() !== '') {
        response = await searchUserByAdmin(searchTerm, page - 1, 5);
      } else {
        response = await GetUserList(page);
      }
      if (response.error) {
        setToast({ type: 'error', message: response.error });
      } else {
        const data = response.users || {}; 
        setUsers(data.content || []); 
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error(error); 
      setToast({ type: 'error', message: 'Không thể tải dữ liệu người dùng.' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Đang tải..</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center space-x-3">
                <FaUsers className="text-green-900 text-3xl" />
                <h1 className="text-3xl font-bold text-gray-800">QUẢN LÝ NGƯỜI DÙNG</h1>
              </div>
              <p className="text-gray-600 mt-1">Quản lý danh sách người dùng trong hệ thống</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchInput
            placeholder="Tìm kiếm người dùng..."
            onSearch={(query) => {
              setSearchTerm(query);
              setPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Họ và Tên</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Số điện thoại</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.authStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.authStatus === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            current={page}
            total={totalPages}
            onChange={(p) => setPage(p)}
          />
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Không tìm thấy người dùng nào
          </div>
        )}
      </div>
    </div>
  );
}
