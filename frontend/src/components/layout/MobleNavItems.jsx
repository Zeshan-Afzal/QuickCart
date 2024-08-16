import React from "react";
import { NavLink } from "react-router-dom";

function NavMobileItems({ navItems,  }) {
  return (
    <div   className=" flex  flex-col gap-10 px-3 py-10">
      {navItems &&
        navItems.map((item, i) => (
          <NavLink
         
            to={item.url}
            className={({ isActive }) =>
              ` ${
                isActive ? "text-red-800" : "white"
              } transition-colors duration-150 hover:text-red-800 font-bold text-2xl font-serif `
            }
          >
            {item.title}
          </NavLink>
        ))}
    </div>
  );
}

export default NavMobileItems;
