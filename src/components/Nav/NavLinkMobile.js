import React from "react";

function NavLinkMobile({ active, setActive, navigateTo, title, toggle,
  setToggle }) {
  return (
    <li
      className={`font-poppins font-medium cursor-pointer text-[16px] group hover:text-primaryPurple duration-200 relative ${
        active === title ? "text-primaryPurpleHover" : "text-primaryText"
      } ${title !== "Cart" ? "mb-4" : "mb-0"}`}
      onClick={() => {
        setActive(title);
        navigateTo(title);
        setToggle(!toggle);
      }}
    >
      <p>{title}</p>
      <span
        className={`block ${
          active === title ? "max-w-full" : "max-w-0"
        } group-hover:max-w-full transition-all duration-500 h-0.5 bg-primaryPurple`}
      ></span>
      {title === "Cart" && (
        <div className="absolute -top-2 -right-5 w-5 h-5  rounded-full bg-primaryPurple text-primaryTextLight flex justify-center items-center text-xs">
          5
        </div>
      )}
    </li>
  );
}

export default NavLinkMobile;
