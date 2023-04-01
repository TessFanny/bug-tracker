import { FaMapPin } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsBugFill } from "react-icons/bs";
import main from "../assets/main.png";
const HomeLayout = () => {
  
  return (
    <main className="text-[#011b5e]">
      <nav className=" nav flex items-center">
        <BsBugFill size={30} className=" mt-1 mr-1  " />
        <span className=" text-2xl">Trackit</span>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1 className=" mt-0 text-[2.052rem]">
            Bug <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas
            temporibus laboriosam harum rerum earum non culpa at expedita minus.
          </p>
          <Link to="/login" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="main logo" className="img main-img" />
      </div>
    </main>
  );
};

export default HomeLayout;
