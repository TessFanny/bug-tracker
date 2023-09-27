import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../features/projects/projectSlice";
import { Link } from "react-router-dom";
import AddProjectModal from "../components/projects/AddProjectModal";
import { useState } from "react";
import DeleteProjectModal from "../components/projects/DeleteProjectModal";
import EditProjectModal from "../components/projects//EditProjectModal";
import StatusChart from "../components/charts/StatusChart";
import PriorityChart from "../components/charts/PriorityChart";
import TypeChart from "../components/charts/TypeChart";
import Loader from "../components/Loader";
import ProjectItem from "../components/projects/ProjectItem";

const Projects = () => {
  // spinner
  const [isLoading, setIsLoading] = useState(false);
  // get data from store
  const { projects } = useSelector((state) => state.projects);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // modal
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  // project
  const [project, setProject] = useState(0);
  // search
  const [searchQuery, setSearchQuery] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // close the modal
  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };

  // get all the projects
  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllProjects()).then(() => {
      setIsLoading(false);
    });
  }, []);

  // search project function => returns an array
  const filterTableData = () => {
    return projects.filter((project) => {
      return Object.values(project).some((cell) => {
        if (cell === null) {
          return false;
        }
        return cell
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    });
  };

  // pagination
  const totalPages = Math.ceil(filterTableData().length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterTableData().slice(startIndex, endIndex);
  };

  return (
    <section className="  mt-[8rem] w-full h-full lg:p-5">
      <div className="justify-center flex flex-col lg:flex-row-reverse lg:justify-between items-center gap-y-2">
        <button
          className=" bg-[#3b82f6] rounded-md px-2 py-1 text-white shadow-lg flex items-center text-center justify-center w-full lg:w-[10rem]"
          onClick={() => setOpenModal(true)}
        >
          <AiOutlinePlus className=" text-xl" />
          Add Project
        </button>
        <div className="relative w-full lg:w-[25%] shadow-lg ">
          <AiOutlineSearch
            size={25}
            className=" absolute top-2 right-4 text-2xl"
          />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search project"
            defaultValue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" w-full pl-3 py-1 outline-none rounded-md focus-within:scale-105 pr-3 "
          />
        </div>
      </div>

      <div className=" mt-2">
        <h1> All the projects go here</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {isLoading ? (
            <Loader />
          ) : getCurrentPageData() && getCurrentPageData().length > 0 ? (
            getCurrentPageData().map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                user={user}
                setProject={setProject}
                setOpenModal={setOpenModal}
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            ))
          ) : (
            <div className="px-3 h-[200px] text-red-500">
              
              no data available ...{" "}
            </div>
          )}         
          
        </div>
        <div className=" w-full flex pl-5 mt-8 shadow-2xl">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                disabled={currentPage === index + 1}
                className=" w-[25px] h-[25px] bg-[#3b82f6] text-white rounded-full flex justify-center items-center"
              >
                {index + 1}
              </button>
            ))}
          </div>
      </div>
      {/*<div className=" h-full relative bg-green-500 ">
         <table className=" w-full h-full overflow-hidden">
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
            <tbody className=" divide-y divide-gray-100 h-[200px] ">
              {isLoading ? (
                <Loader />
              ) : getCurrentPageData() && getCurrentPageData().length > 0 ? (
                getCurrentPageData().map((project) => (
                  
                  <tr key={project.id}>
                    <td
                      className=" p-3 text-sm text-gray-700 whitespace-nowrap"
                      data-title="Title"
                    >
                      <Link
                        to={`project/${project.id}`}
                        className=" text-[#3b82f6] hover:underline"
                      >
                        {project.title.charAt(0).toUpperCase() +
                          project.title.slice(1)}
                      </Link>
                    </td>
                    <td
                      className="truncate text-left overflow-ellipsis p-3 text-sm text-gray-700 whitespace-nowrap"
                      data-title="Description"
                    >
                      {project.description.charAt(0).toUpperCase() +
                        project.description.slice(1)}
                    </td>
                    <td
                      className=" p-3 text-sm text-gray-700 whitespace-nowrap"
                      data-title="Project author"
                    >
                      {project.author}
                    </td>
                    <td
                      className=" p-3 text-sm text-gray-700 whitespace-nowrap"
                      data-title="Created_at"
                    >
                      {project.created_at}
                    </td>

                    <td
                      className=" p-3 text-sm text-gray-700 whitespace-nowrap"
                      data-title="Actions"
                    >
                      <button
                        className="mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md"
                        onClick={() => {
                          setProject(project), setOpenEditModal(true);
                        }}
                        disabled={user.role === "developer" && "disabled"}
                      >
                        Edit
                      </button>
                      <button
                        className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md"
                        onClick={() => {
                          setProject(project), setOpenDeleteModal(true);
                        }}
                        disabled={user.role === "developer" && "disabled"}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="px-3 h-[200px] text-red-500">
                  {" "}
                  no data available ...{" "}
                </tr>
              )}
            </tbody>
          </table> 
        </div>*/}

      <AddProjectModal open={openModal} closeModal={closeModal} />
      <DeleteProjectModal
        open={openDeleteModal}
        closeModal={closeModal}
        project={project}
      />
      <EditProjectModal
        open={openEditModal}
        closeModal={closeModal}
        project={project}
      />
    </section>
  );
};

export default Projects;
