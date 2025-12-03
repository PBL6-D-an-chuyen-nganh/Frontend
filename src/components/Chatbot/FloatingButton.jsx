import React from 'react';
import { FaComments } from 'react-icons/fa';


export default function FloatingButton({ hidden, unread, onOpen }) {
    if (hidden) return null;
    return (
        <button
            onClick={onOpen}
            aria-label="Mở chatbot"
            className="pointer-events-auto shadow-lg rounded-full w-14 h-14 flex items-center justify-center bg-green-100 hover:bg-green-200 border border-green-200 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 relative"
        >
            <FaComments size={20} />
            {!hidden && unread && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
        </button>
    );
}