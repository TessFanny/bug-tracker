import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BasicTable from "../BasicTable";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../../features/projects/projectSlice";
import Project from "./Project";
import { Link } from "react-router-dom";

const Projects = () => {
  const {projects} = useSelector(store => store.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const projectList = projects.project;
  console.log(projects);
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
      <div className=" w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1">
        <h2 className=" p-4 text-2xl">All projects</h2>
        <div className=" mt-5">
          <table className=" w-full border-none">
            <thead className=" bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">Title</td>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">Description</td>
                <td className="w-40 p-3 text-sm font-semibold tracking-wide text-left">Author</td>
                <td className=" w-40 p-3 text-sm font-semibold tracking-wide text-left">Created_at</td>
                <td className="w-40 p-3 text-sm font-semibold tracking-wide text-left">Updated_at</td>
                <td className=" w-44 p-3 text-sm font-semibold tracking-wide text-left">Actions</td>
              </tr>
            </thead>
            <tbody>
              {projectList.map((project) => (
                <tr key={project.id}>
                  <td className=" p-3 text-sm text-gray-700">
                    {" "}
                    <Link to="/layout/dashboard" className=" font-bold text-blue-500 hover:underline">{project.title}</Link>{" "}
                  </td>
                  <td className=" p-3 text-sm text-gray-700">{project.description} </td>
                  <td className=" p-3 text-sm text-gray-700">{project.author} </td>
                  <td className=" p-3 text-sm text-gray-700">{project.created_at} </td>
                  <td className=" p-3 text-sm text-gray-700">{project.updated_at} </td>
                  <td className=" p-3 text-sm text-gray-700">
                    <button className=" mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md">
                      Edit
                    </button>
                    <button className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md ">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {projectList?.map((project) => {
            return (
              <Project
                key={project.id}
                title={project.title}
                description={project.description}
                created_at={project.created_at}
                updated_at={project.updated_at}
                author={project.author}
              />
            );
          })} */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
