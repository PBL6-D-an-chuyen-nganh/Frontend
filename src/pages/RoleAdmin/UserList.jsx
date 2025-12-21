import React, { useEffect, useState } from "react";
import SearchInput from "../../components/Search";
import Pagination from "../../components/Home/Page";
import Toast from "../../components/Notification";
import UserTable from "../../components/RoleAdmin/UserTable";

import { searchUserByAdmin } from "../../api/searchUserByAdmin";
import { getUserListByAdmin } from "../../api/getUserListByAdmin";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  const loadUsers = async (pageNumber) => {
    setLoading(true);
    try {
      let res;

      if (searchKey.trim() !== "") {
        res = await searchUserByAdmin(
          searchKey,
          pageNumber - 1,
          5
        );
      } else {
        res = await getUserListByAdmin({
          page: pageNumber - 1,
          size: 5,
        });
      }

      setUsers(res?.content || []);
      setTotalPages(res?.totalPages || 1);
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        message: "Không thể tải danh sách người dùng",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page, searchKey]);

  const handleSearch = (value) => {
    setSearchKey(value.trim());
    setPage(1); 
  };

  const handleDataChange = () => {
    loadUsers(page); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">

        <h1 className="text-2xl font-bold text-green-900 mb-4">
          QUẢN LÝ NGƯỜI DÙNG
        </h1>

        <SearchInput
          placeholder="Tìm người dùng..."
          onSearch={handleSearch}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : (
          <>
            <UserTable
              users={users}
              setToast={setToast}
              onDataChange={handleDataChange}
            />

            <div className="mt-4 text-sm text-gray-600">
              Tổng số:{" "}
              <span className="font-semibold">{users.length}</span> người dùng
            </div>

            <Pagination
              current={page}
              total={totalPages}
              onChange={(p) => setPage(p)}
            />
          </>
        )}
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default UserList;
