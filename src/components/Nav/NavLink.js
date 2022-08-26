import React from "react";

function NavLink({ active, setActive, navigateTo, title }) {
  return (
    <li
      className={`font-poppins font-normal cursor-pointer text-[16px] group  hover:text-primaryPurple duration-200 relative ${
        active === title ? "text-primaryPurpleHover" : "text-primaryText"
      } ${title !== "Cart" ? "mr-10" : "mr-0"}`}
      onClick={() => {
        setActive(title);
        navigateTo(title);
      }}
    >
      <p>{title}</p>
      <span
        className={`block ${
          active === title ? "max-w-full" : "max-w-0"
        } group-hover:max-w-full transition-all duration-500 h-0.5 bg-primaryPurple`}
      ></span>
      {title === "Cart" && (
        <div className="absolute -top-3 -right-4 w-5 h-5  rounded-full bg-primaryPurple text-primaryTextLight flex justify-center items-center text-xs">
          5
        </div>
      )}
    </li>
  );
}

export default NavLink;
