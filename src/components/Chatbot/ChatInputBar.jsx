import React from 'react';
import { FaCamera } from 'react-icons/fa';

export default function ChatInputBar({ input, setInput, loading, onSend, onPickImage }) {
  function onSubmit(e) { e.preventDefault(); onSend(); }

  return (
    <div className="p-3 border-t border-gray-100 bg-white">
      <form className="mt-0" onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm px-2 py-2 rounded-lg border border-green-200 text-green-900 hover:bg-green-50"
            onClick={onPickImage}
            aria-label="Chọn ảnh"
            title="Chọn ảnh"
          >
            <FaCamera size={16} />
          </button>

          <textarea
            className="flex-1 resize-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); } }}
          />
          <button
            type="submit"
            disabled={!String(input || '').trim() || loading}
            className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-60"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
}
