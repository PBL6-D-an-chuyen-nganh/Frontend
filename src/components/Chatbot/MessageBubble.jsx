import React from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';


export default function MessageBubble({ role, content }) {
    return (
        <div className={'flex mb-3 ' + (role === 'user' ? 'justify-end' : 'justify-start')}>
            {role !== 'user' && (
                <div className="mr-2 w-8 h-8 rounded-full bg-green-100 text-green-900 flex items-center justify-center flex-shrink-0">
                    <FaRobot size={14} aria-label="assistant" />
                </div>
            )}
            <div
                className={
                    'max-w-[75%] rounded-2xl px-3 py-2 text-sm ' +
                    (role === 'user'
                        ? 'bg-green-900 text-white rounded-br-md'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md')
                }
            >
                {content}
            </div>
            {role === 'user' && (
                <div className="ml-2 w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0">
                    <FaUser size={14} aria-label="user" />
                </div>
            )}
        </div>
    );
}