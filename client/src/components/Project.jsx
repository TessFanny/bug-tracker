
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BasicTable from "./BasicTable";


const Project = () => {
  

  return (
    <section className=" px-4 py-7">
      <div className="flex justify-between">
        <h1 className=" text-2xl font-bold">Projects</h1>
        <button className=" bg-slate-500 rounded-md px-2 py-2 text-white font-semibold flex items-center ">
          <AiOutlinePlus className=" text-xl" />
          Add Project
        </button>
      </div>
      <div className=" flex w-full items-center bg-white px-2 py-1 rounded-md mt-4">
        <AiOutlineSearch className=" text-2xl" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search project"
          className=" w-full pl-2 py-1 outline-none "
        />
      </div>
      <div className=" bg-white w-full mt-4 rounded-md">
        <h2 className=" p-4">All projects</h2>
         <BasicTable />
      
      </div>
    </section>
  );
};

export default Project;
