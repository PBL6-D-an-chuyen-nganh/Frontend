import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ title, icon, path = "#", onClick }) => {
  const needExact = path === "/" || path === "/home";

  return (
    <NavLink
      to={path}
      end={needExact}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center text-base gap-2 my-2 p-3 rounded-md cursor-pointer transition-all duration-300
        ${isActive ? "text-green-900 font-normal" : "text-gray-500 hover:text-green-900"}`
      }
    >
      <div className="inherit">
        {icon}
      </div>
      <span className="font-normal text-md transition-all duration-300 whitespace-nowrap">
        {title}
      </span>
    </NavLink>
  );
};

export default MenuItem;
