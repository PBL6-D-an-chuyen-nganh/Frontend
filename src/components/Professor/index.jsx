import React from 'react';
import Btn from '../Button';

const Professor = ({ image, name, introdution, position, degree }) => {
  return (
    <div className="border-b-1 border-green-900">
      <div className="flex items-center gap-10 p-2">
        {/* Image Section */}
        <div className="flex-shrink-0 overflow-hidden rounded-md max-w-6xl mx-auto">
          <img 
            src={image} 
            alt={name}
            className="w-52 h-50 object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex justify-between">
          <div className="w-2/3 flex flex-col justify-between items-start mb-2">
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
              {/* Degree / Institution */}
              {degree && (
                <p className="italic text-gray-500 mb-3">
                  {degree}
                </p>
              )}
            </div>
            <div>
              {/* Introduction */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {introdution}
              </p>
            </div>
          </div>  
          <div className="flex w-1/3 items-center gap-3">
              <Btn
                title="XEM CHI TIẾT"
                path="/professional-detail"
              />            
            </div>           
          
        </div>
      </div>
    </div>
  );
};

export default Professor;
