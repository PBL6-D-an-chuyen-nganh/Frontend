import React, { useState, useEffect } from 'react';
import { FaUserMd } from 'react-icons/fa';
import DoctorTable from '../../components/RoleAdmin/DoctorTable';
import { getDoctorListByAdmin } from '../../api/getDoctorListByAdmin';
import Pagination from '../../components/Home/Page';
import SearchInput from '../../components/Search';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Button';
import Toast from '../../components/Notification';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('userId');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); 
  const navigate = useNavigate();

  const loadDoctors = async (pageNumber) => {
    setLoading(true);
    try {
      const doctors = await getDoctorListByAdmin({
        page: pageNumber - 1,
        size: 10,
        sortBy,
        sortDir,
      });
      setDoctors(doctors.content || []);
      setTotalPages(Number(doctors.totalPages || 1));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors(page);
  }, [page, sortBy, sortDir]);
  const handleDataChange = () => {
    loadDoctors(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaUserMd className="text-green-900 text-3xl" />
              <h1 className="text-3xl font-bold text-gray-900">QUẢN LÍ BÁC SĨ</h1>
            </div>
            <Btn
              path={'/admin/doctors/create'}
              title={"Thêm bác sĩ"}
            />
          </div>
          <p className="m-2 text-gray-600">Quản lý danh sách bác sĩ trong hệ thống</p>

          <SearchInput
            placeholder="Tìm kiếm bác sĩ..."
            onSearch={(query) => {
              alert(`Tìm kiếm bác sĩ với từ khóa: ${query}`);
            }}
          />
        </div>

        {/* Main */}
        {loading ? (
          <div className='max-w-6xl mx-auto gap-3 mb-6 text-center mt-10'>Đang tải...</div>
        ) : (
          <>
            <DoctorTable 
              doctors={doctors} 
              setToast={setToast} 
              onDataChange={handleDataChange}
            />
            <div className="mt-4 text-sm text-gray-600">
              Tổng số: <span className="font-semibold">{doctors.length}</span> bác sĩ
            </div>
            <Pagination
              current={page}
              total={totalPages}
              onChange={(p) => setPage(p)}
            />
          </>
        )}
      </div>

      {/* Toast Notification */}
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

export default DoctorList;