import React from 'react';
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Article = ({ image, title, description, articleID }) => {
  const navigate = useNavigate();
  const handleClick = () => {
        navigate(`articles/${articleID}`);
  };

  return (
    <div className="border-b-1 border-green-900">
      <div className="flex items-center gap-10 p-2">
        {/* Image Section */}
        <div className="flex-shrink-0 overflow-hidden rounded-md max-w-6xl mx-auto">
          <img 
            src={image} 
            alt={title}
            className="w-52 h-40 object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-gray-900 flex-1 mr-4 line-clamp-2">
              {title}
            </h2>
            <div className="flex items-center gap-3">
              <button className="text-green-900 hover:text-green-700 transition-colors">
                <CiShare2 className="w-5 h-5" />
              </button>
              <button 
                className="text-green-900 hover:text-green-700 font-medium text-sm uppercase tracking-wider cursor-pointer"
                onClick={handleClick}>
                XEM CHI TIẾT
              </button>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
