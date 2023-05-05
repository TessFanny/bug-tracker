import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../../features/projects/projectSlice";
import { Link } from "react-router-dom";
import AddProjectModal from "./AddProjectModal";
import { useState } from "react";
import DeleteProjectModal from "./deleteProject/DeleteProjectModal";
import EditProjectModal from "./editProject/EditProjectModal";


const Dashboard = () => {
  const { projects} = useSelector((state) => state.projects);
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [project, setProject] = useState(0)
 
  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false)
    setOpenEditModal(false)
  };
 
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <section className=" px-4 py-7 flex flex-col">
      <div className="flex justify-between">
        <h1 className=" text-2xl text-white">Dashboard</h1>
        <button
          className=" bg-[#3b82f6] rounded-md px-2 py-1 text-white flex items-center"
          onClick={() => setOpenModal(true)}
        >
          <AiOutlinePlus className=" text-xl" />
          Add Project
        </button>
      </div>
      <div className=" flex w-[25%] items-center self-end bg-white px-2 py-1 rounded-lg mt-4 shadow-lg">
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
                 Project author
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
                      {project.title.charAt(0).toUpperCase() + project.title.slice(1)}
                    </Link>
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.description.charAt(0).toUpperCase() + project.description.slice(1)}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.author.charAt(0).toUpperCase() + project.author.slice(1)}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.created_at}
                  </td>

                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button className="mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md" onClick={()=> {setProject(project), setOpenEditModal(true)}} disabled={user.role === 'developer' && "disabled"} >
                      Edit
                    </button>
                    <button className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md" onClick={()=> {setProject(project), setOpenDeleteModal(true)}} disabled={user.role === 'developer' && "disabled"} >
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

export default Dashboard;
