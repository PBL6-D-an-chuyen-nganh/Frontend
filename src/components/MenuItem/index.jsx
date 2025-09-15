import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ title, path = "/", onClick }) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center text-base gap-6 my-2 p-3 rounded-md cursor-pointer transition-all duration-300
        ${isActive ? "text-green-900 font-semibold" : "text-gray-400 hover:text-green-900"}`
      }
    >
      <span className="font-normal text-md transition-all duration-300">
        {title}
      </span>
    </NavLink>
  );
};

export default MenuItem;
