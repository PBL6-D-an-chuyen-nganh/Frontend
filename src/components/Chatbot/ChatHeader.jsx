import React from 'react';
import { FaTimes } from 'react-icons/fa';


export default function ChatHeader({ onReset, onClose, onToggleUploader }) {
    return (
        <div className="px-4 py-3 border-b border-gray-100 bg-green-50 flex items-center justify-between">
            <div>
                <p className="text-sm text-green-900 font-semibold tracking-wide uppercase">Chatbot y tế</p>
                <p className="text-xs text-gray-500">Hỗ trợ tra cứu • đặt lịch</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="text-sm px-2 py-1 rounded border border-green-200 text-green-900 hover:bg-green-100"
                    onClick={onReset}
                    title="Đặt lại phiên"
                >
                    Reset
                </button>

                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    <FaTimes size={16} />
                </button>
            </div>
        </div>
    );
}