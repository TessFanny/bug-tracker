import React from "react";
import { logout } from "../features/user/userSlice";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // logging out
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Vous êtes déconnecté");
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  };
  return (
    <div className=" absolute top-0 left-0 md:left-[220px] w-full  h-[6rem] shadow-lg flex md:pl-10  pl-4 bg-white z-20 justify-between items-end md:items-center">
      <p className="pr-8 md:text-xl capitalize text-blue-400">
        Logged as: {user && user.role}
      </p>
      <p className=" md:text-4xl text-black"> Hello there <span className=" font-semibold">{user && user.firstname.charAt(0).toUpperCase() +
        user.firstname.slice(1)} ! </span>  </p>
      <div className="md:mr-[280px]  flex flex-col-reverse md:flex-row md:justify-between items-center gap-1 ">
        <div className="p-1 rounded-md bgGradient">
          
          <Link to="/layout/profile" className="cursor-pointer flex">
          <FaUser size={20} className=" md:mt-1 md:mr-2 " />
            {user
              ? user.firstname.charAt(0).toUpperCase() +
                user.firstname.slice(1) +
                "  " +
                user.lastname.charAt(0).toUpperCase() +
                "."
              : "profile"}
          </Link>
        </div>
        <button
          className="cursor-pointer bgGradient px-2 rounded-md py-1"
          onClick={handleLogout}
        >
          <IoLogOut size={25} className="" />
        </button>
      </div>
    </div>
  );
};

export default Header;
