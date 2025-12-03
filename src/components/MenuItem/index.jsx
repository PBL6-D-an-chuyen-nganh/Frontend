import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ title, icon, path = "#", onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={`
        flex items-center text-base gap-2 mx-2 px-2 py-2 rounded-md cursor-pointer transition-all duration-300
        ${isActive ? "text-green-900 font-semibold" : "text-gray-500 hover:text-green-900"}
      `}
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

export default MenuItem;
