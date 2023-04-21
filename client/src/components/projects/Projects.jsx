import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../../features/projects/projectSlice";
import { Link } from "react-router-dom";
import AddProjectModal from "./AddProjectModal";
import { useState } from "react";
import DeleteProjectModal from "./deleteProject/DeleteProjectModal";
import EditProjectModal from "./editProject/EditProjectModal";


const Projects = () => {
  const { projects} = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [projectId, setProjectId] = useState(0)
  const [project, setProject] = useState(0)
 
  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false)
    setOpenEditModal(false)
  };
 
  useEffect(() => {
    dispatch(getAllProjects());
  }, [projectId]);

  return (
    <section className=" px-4 py-7">
      <div className="flex justify-between">
        <h1 className=" text-2xl font-bold">Projects</h1>
        <button
          className=" bg-[#3b82f6] rounded-md px-2 py-2 text-white font-semibold flex items-center"
          onClick={() => setOpenModal(true)}
        >
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
        <h2 className=" p-4 text-xl font-semibold">All projects</h2>
        <div className="shadow-lg overflow-auto">
          <table className=" w-full  ">
            <thead className=" bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                  Title
                </td>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                  Description
                </td>
                <td className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Author
                </td>
                <td className=" w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Created_at
                </td>

                <td className=" w-44 p-3 text-sm font-semibold tracking-wide text-left">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-100 ">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    <Link to={`project/${project.id}`}
                      className=" text-[#3b82f6] hover:underline"
                  
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.description}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.author}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.created_at}
                  </td>

                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button className=" mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md" onClick={()=> {setProject(project), setOpenEditModal(true)}}>
                      Edit
                    </button>
                    <button className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md" onClick={()=> {setProject(project), setOpenDeleteModal(true)}}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddProjectModal open={openModal} closeModal={closeModal} />
      <DeleteProjectModal open={openDeleteModal} closeModal={closeModal} project={project} />
      <EditProjectModal open={openEditModal}  closeModal={closeModal} project={project} />
    </section>
  );
};

export default Projects;
