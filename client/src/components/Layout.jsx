import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsBugFill } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineProject,
  AiOutlineMail,
} from "react-icons/ai";
const Layout = () => {
  return (
    <div className="min-h-screen flex bg-[#f3f1f1] text-[#011b5e]">
      {/* side bar */}
      <div className=" min-w-[220px]  h-screen bg-opacity-60 backdrop-filter backdrop-blur-lg border-r-[1px] bg-white ">
        <div className="flex gap-1 p-2  justify-center items-center border-b-[1px] py-5">
          <BsBugFill className="" />
          <h1 className=" font-bold text-xl">Bug Tracker</h1>
        </div>
        <nav className=" py-2 ml-3 focus:bg-gray-400 mt-6 relative">
          <ul className="flex flex-col justify-center">
            <li className=" inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300 mb-5 ">
              <AiOutlineHome size={20} className=" mt-1 mr-1  " />
              <Link to="/">Home</Link>
            </li>
            <li className="inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300 mb-5 ">
              <GrProjects size={15} className=" mt-1 mr-1  " />
              <Link to="/project" className="">
                Projects
              </Link>
            </li>
            <li className="inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300 mb-5 ">
              <BsBugFill size={15} className=" mt-1 mr-1  " />
              <Link to="/project" className="">
                Bugs
              </Link>
            </li>
            <li className="inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300  ">
              <RiAdminFill size={15} className=" mt-1 mr-1  " />
              <Link to="/admin" className="">
                Administrator
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute w-full bottom-0 flex justify-around py-[10px] px-[10px] gap-2 items-center border-t-[1px] ">
          <div className="flex mr-3 hover:scale-110 ease-in duration-300">
            <FaUser size={15} className=" mt-1 mr-1  " />
            <Link to="/profile"> Profile</Link>
          </div>
          <button className="mr-3 hover:scale-110 ease-in duration-300">
            <IoLogOut size={25} className=" mt-1 mr-1  " />
          </button>
        </div>
      </div>
      <div className=" w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
