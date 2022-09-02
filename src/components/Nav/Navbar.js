import { useEffect, useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavLink from "./NavLink";
import NavLinkMobile from "./NavLinkMobile";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
} from "../../redux/slice/authSlice";
import { AdminOnlyLink } from "../admin/AdminRoute/AdminRoute";

function Navbar() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const navigator = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.split("@");
          const tmpUserName = u1[0];
          setUsername(tmpUserName);
        } else {
          setUsername(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : username,
            userId: user.uid,
          })
        );
      } else {
        setUsername("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [username, dispatch]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigator("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    navigator("/login");
  };

  const navigateTo = (navType) => {
    if (navType === "Login") {
      navigator("/login");
    } else if (navType === "Logout") {
      logout();
    } else if (navType === "Home") {
      navigator("/");
    } else if (navType === "Products") {
      navigator("/products");
    } else if (navType === "Admin") {
      navigator("/admin/home");
    } else if (navType === "Orders") {
      navigator("/");
    } else if (navType === "Cart") {
      navigator("/");
    }
  };

  return (
    <>
      <nav className="w-full flex py-6 justify-between items-center navbar">
        <h1
          className="text-3xl font-extrabold text-primaryPurple cursor-pointer"
          onClick={() => {
            setActive("Home");
            navigator("/");
          }}
        >
          Logo
        </h1>

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <NavLink
            active={active}
            setActive={setActive}
            navigateTo={navigateTo}
            title="Home"
          />
          <AdminOnlyLink>
            <NavLink
              active={active}
              setActive={setActive}
              navigateTo={navigateTo}
              title="Admin"
            />
          </AdminOnlyLink>
          {isLoggedIn && (
            <NavLink
              active={active}
              setActive={setActive}
              navigateTo={navigateTo}
              title="Orders"
            />
          )}
          <NavLink
            active={active}
            setActive={setActive}
            navigateTo={navigateTo}
            title="Products"
          />
          {!isLoggedIn && (
            <NavLink
              active={active}
              setActive={setActive}
              navigateTo={navigateTo}
              title="Login"
            />
          )}
          {isLoggedIn && (
            <NavLink
              active={active}
              setActive={setActive}
              navigateTo={navigateTo}
              title="Logout"
            />
          )}
          {isLoggedIn && (
            <NavLink
              active={active}
              setActive={setActive}
              navigateTo={navigateTo}
              title="Cart"
            />
          )}
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
              <NavLinkMobile
                active={active}
                setActive={setActive}
                navigateTo={navigateTo}
                title="Home"
                toggle={toggle}
                setToggle={setToggle}
              />

              <AdminOnlyLink>
                <NavLinkMobile
                  active={active}
                  setActive={setActive}
                  navigateTo={navigateTo}
                  title="Admin"
                  toggle={toggle}
                  setToggle={setToggle}
                />
              </AdminOnlyLink>
              {isLoggedIn && (
                <NavLinkMobile
                  active={active}
                  setActive={setActive}
                  navigateTo={navigateTo}
                  title="Orders"
                  toggle={toggle}
                  setToggle={setToggle}
                />
              )}
              <NavLinkMobile
                active={active}
                setActive={setActive}
                navigateTo={navigateTo}
                title="Products"
                toggle={toggle}
                setToggle={setToggle}
              />
              {!isLoggedIn && (
                <NavLinkMobile
                  active={active}
                  setActive={setActive}
                  navigateTo={navigateTo}
                  title="Login"
                  toggle={toggle}
                  setToggle={setToggle}
                />
              )}
              {isLoggedIn && (
                <NavLinkMobile
                  active={active}
                  setActive={setActive}
                  navigateTo={navigateTo}
                  title="Logout"
                  toggle={toggle}
                  setToggle={setToggle}
                />
              )}
              {isLoggedIn && (
                <NavLinkMobile
                  active={active}
                  setActive={setActive}
                  navigateTo={navigateTo}
                  title="Cart"
                  toggle={toggle}
                  setToggle={setToggle}
                />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
