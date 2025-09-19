import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ title, icon, path, onClick }) => {
  const location = useLocation();

  const isActive =
    path === "/"
      ? location.pathname === "/" 
      : location.pathname.startsWith(path); 

  return (
    <NavLink
      to={path || "#"}
      onClick={onClick}
      className={`flex items-center text-base gap-2 my-2 p-3 rounded-md cursor-pointer transition-all duration-300
        ${isActive ? "text-green-900 font-semibold" : "text-gray-600 hover:text-green-900"}`}
    >
      <div className={`${isActive ? "text-green-900" : "text-gray-600 hover:text-green-900"}`}>
        {icon}
      </div>
      <span className="font-normal text-md transition-all duration-300 whitespace-nowrap">
        {title}
      </span>
    </NavLink>
  );
};

export default MenuItem;
