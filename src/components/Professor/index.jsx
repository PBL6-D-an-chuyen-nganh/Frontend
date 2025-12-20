import React, { useState } from 'react'; 
import Btn from '../Button';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
const Professor = ({ image, name, introdution, position, userId }) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleClick = () => {
    navigate(`/doctors/${userId}`);
  };

  return (
    <>
      <div className="shadow-md p-4 hover:shadow-xl rounded-3xl overflow-hidden mb-6 transform hover:scale-[1.01] transition-transform duration-300 bg-white relative">
        <div className="flex items-center gap-10 p-2">
          {/* Hình ảnh */}
          <div className="flex-shrink-0 overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-56 h-56 object-cover border border-gray-200"
            />
          </div>

          {/* Nội dung */}
          <div className="flex flex-col justify-between gap-4 flex-grow">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {name}
              </h2>

              {position && (
                <p className="italic text-gray-500 mb-2">
                  {position}
                </p>
              )}

              <p className="text-gray-600 leading-relaxed line-clamp-2">
                {introdution}
              </p>
            </div>

            <div className="flex justify-end mr-4">
              <Btn
                title="XEM CHI TIẾT"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Professor;
