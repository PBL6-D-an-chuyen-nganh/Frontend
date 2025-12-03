import React, { useState } from 'react';

const Infor = ({title, p1, p2, p3, icon}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border-none max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className='w-6 h-6 text-green-900'>
            {icon}
          </div>
          <h2 className="text-green-900 font-semibold text-lg m-0">
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="text-gray-500 leading-relaxed border-t-1 border-green-900 ">
        <p className="mb-2">
          {p1}
        </p>
        
        {isExpanded && (
          <>
            {p2 && (
              <p className="mb-2">
                {p2}
              </p>
            )}
            {p3 && (
              <p className="mb-2">
                {p3}
              </p>
            )}
          </>
        )}
        
        <div className="mt-2">
          <button 
            onClick={toggleExpanded}
            className="text-green-900 hover:text-green-700 bg-transparent border-none text-sm font-medium cursor-pointer"
          >
            {isExpanded ? '<< Thu gọn' : 'Xem thêm >>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Infor;