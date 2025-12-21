import React, { useState, useEffect } from "react";
import { FaUserMd } from "react-icons/fa";
import DoctorTable from "../../components/RoleAdmin/DoctorTable";
import Pagination from "../../components/Home/Page";
import SearchInput from "../../components/Search";
import Dropdown from "../../components/Dropdown";
import Btn from "../../components/Button";
import Toast from "../../components/Notification";
import { searchDoctorByAdmin } from "../../api/searchDoctorByAdmin";
import { getDoctorListByAdmin } from "../../api/getDoctorListByAdmin";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    position: "",
    degree: "",
  });

  const [selectedPositionLabel, setSelectedPositionLabel] =
    useState("Chức vụ");
  const [selectedDegreeLabel, setSelectedDegreeLabel] =
    useState("Học vị");

  const positionOptions = [
    { id: "all", label: "Tất cả" },
    { id: 1, label: "Trưởng khoa" },
    { id: 2, label: "Phó khoa" },
    { id: 3, label: "Bác sĩ tư vấn" },
    { id: 4, label: "Bác sĩ điều trị" },
  ];

  const degreeOptions = [
    { id: "all", label: "Tất cả" },
    { id: "GS", label: "Giáo sư" },
    { id: "PGS", label: "Phó giáo sư" },
    { id: "TS", label: "Tiến sĩ" },
    { id: "ThS", label: "Thạc sĩ" },
    { id: "BS", label: "Bác sĩ" },
  ];

  // 👉 Kiểm tra có đang search / filter không
  const hasActiveFilters = () => {
    return (
      filters.name.trim() !== "" ||
      filters.position !== "" ||
      filters.degree !== ""
    );
  };

  const loadDoctors = async (pageNumber) => {
    setLoading(true);
    try {
      let res;

      if (hasActiveFilters()) {
        // 🔍 SEARCH / FILTER
        res = await searchDoctorByAdmin({
          page: pageNumber - 1,
          size: 10,
          name: filters.name,
          position: filters.position,
          degree: filters.degree,
        });
      } else {
        // 📄 NORMAL LIST
        res = await getDoctorListByAdmin({
          page: pageNumber - 1,
          size: 10,
        });
      }

      setDoctors(res?.content || []);
      setTotalPages(res?.totalPages || 1);
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        message: "Không thể tải danh sách bác sĩ",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors(page);
  }, [page, filters.name, filters.position, filters.degree]);

  const handleSearch = (value) => {
    setFilters((prev) => ({
      ...prev,
      name: value.trimStart(),
    }));
    setPage(1);
  };

  const handlePositionChange = (option) => {
    setSelectedPositionLabel(option.label);
    setFilters((prev) => ({
      ...prev,
      position: option.id === "all" ? "" : option.label,
    }));
    setPage(1);
  };

  const handleDegreeChange = (option) => {
    setSelectedDegreeLabel(option.label);
    setFilters((prev) => ({
      ...prev,
      degree: option.id === "all" ? "" : option.id,
    }));
    setPage(1);
  };

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
              <h1 className="text-3xl font-bold text-gray-900">
                QUẢN LÍ BÁC SĨ
              </h1>
            </div>
            <Btn path="/admin/doctors/create" title="Thêm bác sĩ" />
          </div>

          <p className="m-2 text-gray-600">
            Quản lý danh sách bác sĩ trong hệ thống
          </p>

          <SearchInput
            placeholder="Tìm bác sĩ..."
            onSearch={handleSearch}
          />

          <h1 className="text-3xl font-semibold text-green-900 text-center mt-6">
            CHUYÊN GIA - BÁC SĨ
          </h1>

          <div className="flex justify-center mt-6 mb-8">
            <Dropdown
              options={positionOptions}
              selected={selectedPositionLabel}
              onSelect={handlePositionChange}
            />
            <div className="w-4" />
            <Dropdown
              options={degreeOptions}
              selected={selectedDegreeLabel}
              onSelect={handleDegreeChange}
            />
          </div>
        </div>

        {/* Main */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : (
          <>
            <DoctorTable
              doctors={doctors}
              setToast={setToast}
              onDataChange={handleDataChange}
            />

            <div className="mt-4 text-sm text-gray-600">
              Tổng số:{" "}
              <span className="font-semibold">{doctors.length}</span> bác sĩ
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

export default DoctorList;
