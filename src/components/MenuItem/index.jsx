import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ title, icon, path, onClick, end }) => {
  const commonClasses = "flex items-center text-base gap-2 mx-2 px-2 py-2 rounded-md cursor-pointer transition-all duration-300";
  if (path && path !== "#") {
    return (
      <NavLink
        to={path}
        end={end}
        className={({ isActive }) => `
          ${commonClasses}
          ${isActive 
              ? "text-green-900 font-semibold" 
              : "text-gray-500 hover:text-green-900" 
          }
        `}
      >
        {icon}
        <span>{title}</span>
      </NavLink>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`${commonClasses} text-gray-500 hover:text-green-900 cursor-pointer`}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default MenuItem;