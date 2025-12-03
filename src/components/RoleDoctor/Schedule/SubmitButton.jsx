import React from "react";
import { FiSend } from "react-icons/fi";

function SubmitButton({ loading, onSubmit, disabled }) {
  return (
    <div className="px-8 pb-8">
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={loading || disabled}
          className={`bg-green-900 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-200 shadow-lg
            ${(loading || disabled)
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-white hover:text-green-900 hover:shadow-xl"}
          `}
        >
          <FiSend className="w-5 h-5" />
          {loading ? "Đang gửi..." : "Đăng ký lịch làm việc"}
        </button>
      </div>
    </div>
  );
}

export default SubmitButton;
