import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';


export default function ChatMessageList({ messages, loading, onMountScroll }) {
    const scrollRef = useRef(null);


    useEffect(() => {
        if (onMountScroll) onMountScroll(scrollRef);
    }, [onMountScroll]);


    return (
        <div ref={scrollRef} className="flex-1 px-3 py-3 overflow-auto bg-gray-50">
            {messages.map(function (m, i) {
                return <MessageBubble key={i} role={m.role} content={m.content} />;
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