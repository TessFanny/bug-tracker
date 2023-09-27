import React from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAssignedProjectsToUser } from "../../features/projects/projectSlice";

const MyProjects = () => {
  const { projects, assignedProjectsToUser } = useSelector((store) => store.projects);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch()
  // search
  const [searchQueryCreated, setSearchQueryCreated] = useState("");
  const [searchQueryAssigned, setSearchQueryAssigned] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  const projectById = projects.filter(
    (project) => project.project_author_id === user.id
  );

  useEffect(()=>{
 dispatch(getAllAssignedProjectsToUser({user_id :user.id}))
  }, [])
 
  const filterTableData = (projectData, searchQuery) => {
    return projectData.filter((project) => {
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
  const totalPagesAssigned = Math.ceil(filterTableData(assignedProjectsToUser, searchQueryAssigned).length / itemsPerPage);
  const totalPagesCreated = Math.ceil(filterTableData(projectById, searchQueryCreated).length / itemsPerPage);

  const getCurrentPageData = (data, searchQuery) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterTableData(data, searchQuery).slice(startIndex, endIndex);
  };

  return (
    <section className=" flex gap-9 w-full flex-col">
      <h1 className=" text-2xl text-white">My projects</h1>
      <div className="flex gap-9 w-full justify-evenly" >
      { ["lead developer", "admin"].includes(user.role) && <div className=" w-[50%]">
      <div className=" w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1">
        <div className=" flex justify-between">
          <h2 className=" p-4 text-xl font-semibold">Projects I created</h2>
          <div className=" flex w-[50%] items-center self-end bg-slate-100 px-2 py-1 rounded-lg mt-4 shadow-lg">
            <AiOutlineSearch className=" text-2xl" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search project"
              defaultValue={searchQueryCreated}
              onChange={(e) => setSearchQueryCreated(e.target.value)}
              className=" w-full pl-2 py-1 outline-none bg-slate-100 "
            />
          </div>
        </div>
        <div className="shadow-lg overflow-auto pb-3">
          <table className=" w-full  ">
            <thead className=" bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                  Title
                </td>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                  Description
                </td>

                <td className=" w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Created_at
                </td>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-100 ">
              {getCurrentPageData(projectById, searchQueryCreated).map((project, id) => (
                <tr key={id}>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    <Link
                      to={`project/${project.id}`}
                      className=" text-[#3b82f6] hover:underline"
                    >
                      {project.title.charAt(0).toUpperCase() +
                        project.title.slice(1)}
                    </Link>
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.description.charAt(0).toUpperCase() +
                      project.description.slice(1)}
                  </td>

                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {project.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" flex gap-5 pl-5">
            {Array.from({ length: totalPagesCreated }, (_, index) => (
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
      </div>
    </div>}
        
        <div className=" w-[50%]">
          <div className=" w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1">
            <div className=" flex justify-between">
              <h2 className=" p-4 text-xl font-semibold">
                Projects I am assigned to
              </h2>
              <div className=" flex w-[50%] items-center self-end bg-slate-100 px-2 py-1 rounded-lg mt-4 shadow-lg">
                <AiOutlineSearch className=" text-2xl" />
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="search project"
                  defaultValue={searchQueryAssigned}
                  onChange={(e) => setSearchQueryAssigned(e.target.value)}
                  className=" w-full pl-2 py-1 outline-none bg-slate-100 "
                />
              </div>
            </div>
            <div className="shadow-lg overflow-auto pb-3">
              <table className=" w-full  ">
                <thead className=" bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Title
                    </td>
                    <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Description
                    </td>
                    <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                     Author
                    </td>

                    <td className=" w-40 p-3 text-sm font-semibold tracking-wide text-left">
                      Created_at
                    </td>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-100 ">
                  {getCurrentPageData(assignedProjectsToUser, searchQueryAssigned).map((project, id) => (
                    <tr key={id}>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        <Link
                          to={`project/${project.project_id}`}
                          className=" text-[#3b82f6] hover:underline"
                        >
                          {project.title.charAt(0).toUpperCase() +
                            project.title.slice(1)}
                        </Link>
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {project.description.charAt(0).toUpperCase() +
                          project.description.slice(1)}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                      {project.author.charAt(0).toUpperCase() +
                        project.author.slice(1)}
                    </td>

                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {project.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" flex gap-5 pl-5">
                {Array.from({ length: totalPagesAssigned }, (_, index) => (
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProjects;
