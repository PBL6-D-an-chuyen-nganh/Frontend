import React from "react";
import {FiClock} from "react-icons/fi";


function ShiftSelector({ selectedShifts, toggleShift }) {
  const shifts = [
    { key: "AM", label: "Ca sáng" },
    { key: "PM", label: "Ca chiều" },
  ];

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-gray-700 font-semibold">
        <FiClock className="w-5 h-5 text-green-900" />
        Chọn ca làm việc
      </label>
      <div className="flex gap-4">
        {shifts.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleShift(key)}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedShifts.includes(key)
                ? "bg-green-900 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShiftSelector;
 