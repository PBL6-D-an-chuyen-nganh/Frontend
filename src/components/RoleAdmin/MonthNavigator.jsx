import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function MonthNavigator({ month, year, onChange }) {
  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const handlePrevMonth = () => {
    if (month === 0) {
      onChange(11, year - 1);
    } else {
      onChange(month - 1, year);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      onChange(0, year + 1);
    } else {
      onChange(month + 1, year);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrevMonth}
          className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <IoChevronBack className="text-gray-700 text-xl" />
        </button>

        <div className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm min-w-[170px] text-center">
          <span className="text-gray-800 font-medium text-base">
            {months[month]} / {year}
          </span>
        </div>

        <button
          onClick={handleNextMonth}
          className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <IoChevronForward className="text-gray-700 text-xl" />
        </button>
      </div>
    </div>
  );
}
