import React from 'react';
import Btn from '../Button';

const Professor = ({ image, name, introdution, position, degree, userId }) => {
  return (
    <div className="border-b-1 border-green-900">
      <div className="flex items-center gap-10 p-2">
        {/* Image Section */}
        <div className="flex-shrink-0 overflow-hidden max-w-6xl mx-auto">
          <img 
            src={image} 
            alt={name}
            className="w-56 h-56 object-cover border border-gray-200"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-between gap-4 flex-grow">
          <div className="w-full justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {name}
              </h2>
            </div>

            <div>
              {/* Position */}
              {position && (
                <p className="italic text-gray-500 mb-1">
                  {position}
                </p>
              )}
            </div>
          
            <div>
              {/* Introduction */}
              <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                {introdution}
              </p>
            </div>
          </div>  
              <div className="flex justify-end mb-4 mr-4">
        <Btn
          title="XEM CHI TIẾT"
          path={`/doctors/${userId}`}
        />            
      </div>                     
        </div>
      </div>
    </div>
  );
};

export default Professor;
