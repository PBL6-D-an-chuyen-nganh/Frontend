import React from "react";
import { FiCalendar} from "react-icons/fi";

function DateSelector({ weekDates = [], selections = [], setSelections }) {
  // ✅ Khi click vào checkbox AM/PM
  const handleShiftChange = (workDate, shift) => {
    setSelections((prev) => {
      // Tìm xem ngày này đã tồn tại chưa
      const existing = prev.find((s) => s.workDate === workDate);

      if (existing) {
        // Nếu có rồi -> cập nhật lại shifts
        const updated = prev.map((s) => {
          if (s.workDate === workDate) {
            const hasShift = s.shifts.includes(shift);
            const newShifts = hasShift
              ? s.shifts.filter((sh) => sh !== shift)
              : [...s.shifts, shift];
            return { ...s, shifts: newShifts };
          }
          return s;
        });
        return updated;
      } else {
        // Nếu chưa có -> thêm mới
        return [...prev, { workDate, shifts: [shift] }];
      }
    });
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
        <FiCalendar className="w-5 h-5 text-green-900" />
        Đăng ký lịch làm việc (Thứ 2 → Thứ 6 tuần tới)
      </label>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weekDates.map((day) => {
          const selected = selections.find((s) => s.workDate === day.date);

          return (
            <div
              key={day.date}
              className="p-4 border-2 rounded-xl text-center transition-all duration-200 hover:shadow-md bg-white"
            >
              <div className="font-semibold text-green-900 mb-1">
                {day.dayName}
              </div>
              <div className="text-sm text-gray-600 mb-3">{day.displayDate}</div>

              <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-green-700"
                    checked={selected?.shifts?.includes("AM") || false}
                    onChange={() => handleShiftChange(day.date, "AM")}
                  />
                  <span>Buổi sáng</span>
                </label>

                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-green-700"
                    checked={selected?.shifts?.includes("PM") || false}
                    onChange={() => handleShiftChange(day.date, "PM")}
                  />
                  <span>Buổi chiều</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DateSelector;
