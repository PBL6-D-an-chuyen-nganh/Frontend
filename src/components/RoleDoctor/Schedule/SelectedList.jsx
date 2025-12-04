import React from "react";
import { FiTrash2, FiCheck } from "react-icons/fi";

function SelectedList({ selections, removeSelection, weekDates = [] }) {
  const getDisplayDate = (dateStr) => {
    const dayInfo = weekDates.find((d) => d.date === dateStr);
    return dayInfo ? dayInfo.displayDate : dateStr;
  };

  const getDayName = (dateStr) => {
    const dayInfo = weekDates.find((d) => d.date === dateStr);
    return dayInfo ? dayInfo.dayName : "";
  };

  if (selections.length === 0) {
    return null;
  }

  return (
    <div className="px-8 pb-8">
      <div className="border-t-2 border-gray-100 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Lịch đã chọn ({selections.length} ngày)
        </h3>
        <div className="space-y-3">
          {selections.map((sel) => (
            <div
              key={sel.workDate}
              className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-green-900" />
                  <p className="font-semibold text-gray-900">
                    {getDayName(sel.workDate)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-7">
                  {getDisplayDate(sel.workDate)}
                </p>
                <p className="text-sm text-gray-700 mt-1 ml-7">
                  {sel.shifts.length > 0
                    ? sel.shifts
                        .map((s) => (s === "AM" ? "Ca sáng" : "Ca chiều"))
                        .join(", ")
                    : "Không đăng ký ca nào"}
                </p>
              </div>
              <button
                onClick={() => removeSelection(sel.workDate)}
                className="text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                aria-label="Xóa ngày làm việc"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectedList;
