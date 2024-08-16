import React from "react";
import { NavLink } from "react-router-dom";

function NavItems({ navItems }) {
  return (
    <div className=" flex items-center gap-4 ">
      {navItems &&
        navItems.map((item, i) => (
          <NavLink
            to={item.url}
            className={({ isActive }) =>
              ` ${
                isActive ? "text-red-800" : "white"
              } transition-colors duration-150 hover:text-red-800 font-semibold font-serif `
            }
          >
            {item.title}
          </NavLink>
        ))}
    </div>
  );
}

export default NavItems;
