import React from "react";
import { logout } from "../features/user/userSlice";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);
  // dropdown profile and logging out
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // logging out
  const handleLogout = () => {
    dispatch(logout());
    toast.success("you are logged out");
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  };
  return (
    <div className=" absolute top-0 left-0 md:left-[220px] w-full  h-[6rem] shadow-lg flex md:pl-10 pb-3  pl-4 bg-white z-20  items-end md:items-center justify-between">
      <p className="pr-8 md:text-xl text-xs capitalize text-blue-400">
        Logged as: {user && user.role}
      </p>
      <p className=" md:text-4xl text-xs text-black">
        {" "}
        Hello there{" "}
        <span className=" font-semibold">
          {user &&
            user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}
          !
        </span>
      </p>
      <button
        onClick={toggleDropdown}
        className="md:mr-[280px] mr-3 md:min-w-[10rem] relative  flex md:justify-between justify-center items-center cursor-pointer border-2 shadow-xl w-10 md:w-24 md:p-2 py-1 px-0 rounded "
      >
        {" "}
        {user ? (
          <span className=" hidden md:block">
            {user.firstname.charAt(0).toUpperCase() +
              user.firstname.slice(1) +
              "  " +
              user.lastname.charAt(0).toUpperCase() +
              "."}
          </span>
        ) : (
          <span>{"profile"}</span>
        )}
        <IoIosArrowDropdownCircle />
      </button>
      {isOpen && (
        <div className=" min-w-[8rem] md:mr-[280px] absolute md:top-[80%] top-[100%] right-0 flex flex-col bg-gray-300  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 w-16 md:w-24 ">
          <div className="">
            <Link
              to="/layout/profile"
              className="cursor-pointer flex  justify-around items-center bg-blue-200 rounded-md m-1 "
              onClick={toggleDropdown}
            >
              <FaUser /> <span>Profile</span>
            </Link>
          </div>
          <button
            className="cursor-pointer  flex justify-around bg-blue-200 rounded-md m-1 "
            onClick={handleLogout}
          >
            <IoLogOut size={25} className="" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
