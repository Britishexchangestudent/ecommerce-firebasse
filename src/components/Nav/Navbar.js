import { useState } from "react";

import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineAliwangwang,
} from "react-icons/ai";
import { navLinks } from "../../constants";

function Navbar() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <AiOutlineAliwangwang className="w-[124px] h-[32px] text-primaryText cursor-pointer hover:text-primaryPurple duration-200" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] group  hover:text-primaryPurple duration-200 ${
              active === nav.title ? "text-primaryPurpleHover" : "text-primaryText"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primaryPurple"></span>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {toggle ? (
          <AiOutlineClose
            className="w-[28px] h-[28px] object-contain text-primaryText cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        ) : (
          <AiOutlineMenu
            className="w-[28px] h-[28px] object-contain text-primaryText cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        )}

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-white shadow-lg absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] group hover:text-primaryPurple duration-200 ${
                  active === nav.title ? "text-primaryPurpleHover" : "text-dimblack"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primaryPurple"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
