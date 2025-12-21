import React, { useState, useEffect } from "react";
import { MonthlySalesChart } from "../../components/RoleAdmin/Chart";
import Toast from "../../components/Notification";
import { getChartData } from "../../api/getChartData";
import { GetUsetToReport } from "../../api/getUserToReport";
import MonthNavigator from "../../components/RoleAdmin/MonthNavigator";
import DoctorAppointmentsTable from "../../components/RoleAdmin/AppointmentTable";
import { getAppointmentOfDoctor } from "../../api/getAppointmentOfDoctor";

function Dashboard() {
  const now = new Date();
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchBaseData = async () => {
      setLoading(true);
      try {
        const [chartRes, usersRes] = await Promise.all([
          getChartData(),
          GetUsetToReport(),
        ]);
        setChartData(chartRes);
        if (Array.isArray(usersRes)) {
          setUsers(usersRes);
        } else if (usersRes?.data && Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error(error);
        setToast({ type: "error", message: "Không thể tải dữ liệu dashboard" });
      } finally {
        setLoading(false);
      }
    };

    fetchBaseData();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAppointmentOfDoctor(month + 1, year);
        setAppointments(res?.data || []);
      } catch (error) {
        console.error(error);
        setToast({
          type: "error",
          message: "Không thể tải thống kê lịch hẹn bác sĩ",
        });
      }
    };

    fetchAppointments();
  }, [month, year]);

  const handleMonthChange = (newMonth, newYear) => {
    setMonth(newMonth);
    setYear(newYear);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Đang tải..</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      {/* CHART */}
      <div>
        <h2 className="text-2xl font-semibold text-green-900 mb-4">
          THỐNG KÊ LỊCH HẸN
        </h2>
        <MonthlySalesChart data={chartData} />
      </div>

      {/* APPOINTMENTS TABLE */}
      <div className="rounded-lg bg-white shadow-md overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-green-900">
                THỐNG KÊ CUỘC HẸN BÁC SĨ
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Tổng hợp số lượng cuộc hẹn của các bác sĩ trong tháng
              </p>
            </div>

            <MonthNavigator
              month={month}
              year={year}
              onChange={handleMonthChange}
            />
          </div>
        </div>

        <DoctorAppointmentsTable
          data={appointments}
          month={month + 1}
          year={year}
        />
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
