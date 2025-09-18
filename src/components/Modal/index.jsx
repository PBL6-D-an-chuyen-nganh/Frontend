import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

function Modal({ isOpen, onClose, email, onVerify }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false);
      onVerify?.(otp); 
      onClose();
      setOtp("");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm relative animate-fadeIn">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
        >
          <IoClose size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-2">Xác thực OTP</h2>
          <p className="text-sm text-gray-500">
            Nhập mã 6 số đã gửi đến <br />
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Form nhập OTP */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full h-14 text-center text-2xl font-mono tracking-widest border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:outline-none transition-all"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={otp.length !== 6 || isLoading}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              otp.length === 6 && !isLoading
                ? "bg-gradient-to-r from-green-900 to-green-600 hover:from-green-600 hover:to-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Đang xác thực..." : "Xác nhận"}
          </button>
        </form>

        {/* Resend */}
        <button
          onClick={() => setOtp("")}
          className="w-full mt-3 text-sm text-green-900 hover:text-green-950 cursor-pointer  font-medium"
        >
          Gửi lại mã
        </button>
      </div>
    </div>
  );
}

export default Modal;
