import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slice/cartSlice";

function NavLink({ active, setActive, title, navigateTo, setOpen }) {
  const cartItems = useSelector(selectCartItems);
  return (
    <div
      onClick={() => {
        setActive(title);
        navigateTo(title);
        if (title === "Cart") {
          setOpen(true);
        }
      }}
    >
      <li
        className={`font-poppins font-normal cursor-pointer text-[16px] group  hover:text-primaryPurple duration-200 relative ${
          active === title ? "text-primaryPurpleHover" : "text-primaryText"
        } ${title !== "Cart" ? "mr-10" : "mr-0"}`}
      >
        <p>{title}</p>
        <span
          className={`block ${
            active === title ? "max-w-full" : "max-w-0"
          } group-hover:max-w-full transition-all duration-500 h-0.5 bg-primaryPurple`}
        ></span>
        {title === "Cart" && cartItems.length > 0 && (
          <div className="absolute -top-3 -right-4 w-5 h-5  rounded-full bg-primaryPurple text-primaryTextLight flex justify-center items-center text-xs">
            {cartItems.length}
          </div>
        )}
      </li>
    </div>
  );
}

export default NavLink;
