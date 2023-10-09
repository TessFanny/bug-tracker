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
    <div className=" absolute top-0 left-0 md:left-[220px] w-full  h-[6rem] shadow-lg flex justify-between md:pl-10  pl-4 bg-white">
      <p className="pr-8 text-xl capitalize text-blue-400">
        Logged as: {user && user.role}
      </p>
      <div className="md:mr-[250px] pointer-events-auto ">
        <div className="">
          <FaUser size={20} className=" mt-1 mr-2  " />
          <Link to="/layout/profile" className=" cursor-pointer">
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
          className="  cursor-pointer"
          onClick={handleLogout}
        >
          <IoLogOut size={25} className=" bg-yellow-400" />
        </button>
      </div>
    </div>
  );
};

export default Header;
