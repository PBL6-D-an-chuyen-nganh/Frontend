import React, { useEffect, useRef } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';

export default function ChatMessageList({ messages, loading, onMountScroll }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (onMountScroll) onMountScroll(scrollRef);
  }, [onMountScroll]);

  return (
    <div ref={scrollRef} className="flex-1 px-3 py-3 overflow-auto bg-gray-50">
      {messages.map((m, i) => {
        const isUser = m.role === 'user';
        return (
          <div key={i} className={'flex mb-3 ' + (isUser ? 'justify-end' : 'justify-start')}>
            {!isUser && (
              <div className="mr-2 w-8 h-8 rounded-full bg-green-100 text-green-900 flex items-center justify-center flex-shrink-0">
                <FaRobot size={14} aria-label="assistant" />
              </div>
            )}

            <div
              className={
                'max-w-[75%] rounded-2xl px-3 py-2 text-sm ' +
                (isUser
                  ? 'bg-green-900 text-white rounded-br-md'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md')
              }
            >
              {m.imageUrl && (
                <img
                  src={m.imageUrl}
                  alt={m.imageAlt || 'image'}
                  className="rounded-md border border-black/10 max-w-full mb-2"
                  style={{ maxHeight: 260 }}
                />
              )}
              {m.content && <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>}
            </div>

            {isUser && (
              <div className="ml-2 w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0">
                <FaUser size={14} aria-label="user" />
              </div>
            )}
          </div>
        );
      })}

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
          <span>Đang soạn trả lời…</span>
        </div>
      )}
    </div>
  );
}
