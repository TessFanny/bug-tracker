import { NavLink, Outlet } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import Header from "./Header";
import { motion } from "framer-motion";

const Layout = () => {
  const [nav, setNav] = useState(false);
  const [title, setTitle] = useState("");
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
 

  const handleNav = () => {
    setNav(!nav);
    setOpen(!isOpen);
  };
 

  return (
    <div className="min-h-screen flex bg-[#edeeef] text-[#011b5e] p-5 overflow-hidden relative ">
      {/* side bar */}
      <div
        onClick={handleNav}
        className="fixed top-[10px] text-[100px]  left-[10px] z-[50] md:hidden cursor-pointer bgGradient rounded-sm"
      >
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          easing="ease-in"
          duration={0.4}
          color="#011b5e"
        />
      </div>
      {nav ? (
        <motion.aside
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className=" min-w-[220px] h-[50%] border-r-[1px] mr-[100px] md:hidden bgGradient  z-40 border-gray-200 rounded-br-lg fixed top-0 left-0 overflow-auto"
        >
          <div className="flex gap-1  justify-center items-center border-b-[1px] py-5 pl-3">
            <BsBugFill />

            <Link
              to="/layout/dashboard"
              onClick={() => {
                handleNav(), setTitle("dashboard");
              }}
              className="font-bold text-xl"
            >
              Bug Tracker
            </Link>
          </div>
          <nav className=" py-2 ml-3 focus:bg-gray-400 mt-">
            <ul className="flex flex-col justify-center">
              <li className=" nav-element-sm">
                <AiOutlineHome size={20} className=" mr-1  " />
                <Link
                  to="/layout/dashboard"
                  onClick={() => {
                    handleNav()
                  }}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-element-sm ">
                <GrProjects size={15} className="  mr-1  " />
                <Link
                  to="/layout/projects"
                  onClick={function () {
                    
                    handleNav();
                  }}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-element-sm ">
                <BsBugFill size={15} className=" mr-1  " />
                <Link
                  to="/layout/tickets"
                  onClick={() => {
                    handleNav();
                    
                  }}
                >
                  Tickets
                </Link>
              </li>
              <li className="nav-element-sm  ">
                <RiAdminFill size={15} className=" mr-1  " />
                <Link
                  to="/layout/admin"
                  onClick={() => {
                    handleNav();
                    
                  }}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
         
        </motion.aside>
      ) : (
        <aside className=" md:block hidden min-w-[220px]  h-[100%] shadow-lg border-r-[1px] z-50  border-gray-200 rounded-br-lg fixed top-0 left-0 overflow-auto bg-white">
          <div className="flex gap-1  justify-center items-center border-b-[1px] py-5">
            <BsBugFill className="" />
            <h1 className=" font-bold text-xl">
              <NavLink
                to="/layout/dashboard"
                className={({ isActive }) =>
                  isActive ? "font-bold" : undefined
                }
                onClick={() => setTitle("Dashboard")}
              >
                Bug Tracker
              </NavLink>
            </h1>
          </div>
          <nav className=" py-2 ml-3 focus:bg-gray-400 mt-6 relative">
            <ul className="flex flex-col justify-center">
              <li className=" inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300 mb-5 ">
                <AiOutlineHome size={20} className=" mr-1  " />
                <NavLink
                  to="/layout/dashboard"
                  className={({ isActive }) =>
                    isActive ? "layoutLink" : undefined
                  }
                  
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300 mb-5 ">
                <GrProjects size={15} className="  mr-1  " />
                <NavLink
                  to="/layout/projects"
                  className={({ isActive }) =>
                    isActive ? "layoutLink" : undefined
                  }
                  
                >
                   Projects
                </NavLink>
              </li>
              <li className="inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300 mb-5 ">
                <BsBugFill size={15} className=" mr-1  " />
                <NavLink
                  to="/layout/tickets"
                  className={({ isActive }) =>
                    isActive ? "layoutLink" : undefined
                  }
                  
                >
                   Tickets
                </NavLink>
              </li>
              {user && user.role == "admin" && <li className="inline-flex relative items-center py-[10px] px-[10px] gap-2 border-b-[1px] mr-3 hover:scale-110 ease-in duration-300  ">
              <RiAdminFill size={15} className=" mr-1  " />
              <NavLink
                to="/layout/admin"
                className={({ isActive }) =>
                  isActive ? "layoutLink" : undefined
                }
                
              >
                Admin
              </NavLink>
            </li>}
              
            </ul>
          </nav>
          
        </aside>
      )}

      <Header/>
      <div className=" w-full md:ml-[220px] z-10 overflow-hidden flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
