import React, { useState, useEffect } from "react";
import { MonthlySalesChart } from "../../components/RoleAdmin/Chart";
import Toast from "../../components/Notification";
import { getChartData } from "../../api/getChartData";
import { GetUsetToReport } from "../../api/getUserToReport";
import { reportUser } from "../../api/reportUser";
import UserTable from "../../components/RoleAdmin/UserTable";

function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [chartRes, usersRes] = await Promise.all([
          getChartData(),
          GetUsetToReport(),
        ]);

        setChartData(chartRes);

        if (Array.isArray(usersRes)) {
          setUsers(usersRes);
        } else if (usersRes && Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
        } else {
          console.warn("API User trả về format không đúng chuẩn mảng:", usersRes);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
        setToast({ type: "error", message: "Không thể tải dữ liệu!" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReportUser = async (userId) => {
    const result = await reportUser(userId);
    if (result.error) {
        console.error("Lỗi từ API:", result.error);
        setToast({ type: "error", message: "Lỗi khi báo cáo người dùng: " + (result.error.message || "Không xác định") });
        return; 
    }
    setToast({ type: "success", message: "Đã báo cáo người dùng thành công!" });
    try {
        const updatedUsersRes = await GetUsetToReport();
        if (Array.isArray(updatedUsersRes)) {
            setUsers(updatedUsersRes);
        } else if (updatedUsersRes && Array.isArray(updatedUsersRes.data)) {
            setUsers(updatedUsersRes.data);
        } else {
            setUsers([]);
        }
    } catch (fetchError) {
        console.error("Lỗi khi load lại danh sách:", fetchError);
    }
};

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="rounded-lg p-6 bg-white shadow-md">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">
          THỐNG KÊ LỊCH HẸN
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            <MonthlySalesChart data={chartData} />
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">
                DANH SÁCH NGƯỜI DÙNG
              </h2>

              <UserTable users={users} onReport={handleReportUser} />
            </div>
          </>
        )}
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  );
}

export default Dashboard;
