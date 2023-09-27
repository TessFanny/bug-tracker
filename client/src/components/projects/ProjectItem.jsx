import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({
  project,
  user,
  setProject,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg min-w-full max-w-md ">
      <div className=" w-full bg-purple-200 rounded-t-lg capitalize hover:bg-purple-500 transition duration-300 ease-in-out">
        <h2 className=" p-3 text-sm  hover:text-black">
          <Link
            to={`project/${project.id}`}
            className=" text-[#3b82f6] hover:underline hover:text-black transition duration-300 ease-in-out"
          >
            {project.title.charAt(0).toUpperCase() + project.title.slice(1)}
          </Link>
        </h2>
      </div>

      <p
        className="truncate text-left overflow-ellipsis p-3 text-sm text-gray-700 whitespace-nowrap"
        data-title="Description"
      >
        {project.description.charAt(0).toUpperCase() +
          project.description.slice(1)}
      </p>
      <p
        className=" p-3 text-sm text-gray-700 whitespace-nowrap"
        data-title="Project author"
      >
        {project.author}
      </p>
      <p
        className=" p-3 text-sm text-gray-700 whitespace-nowrap"
        data-title="Created_at"
      >
        {project.created_at}
      </p>

      <div className=" p-3 text-sm text-gray-700">
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
      </div>
    </div>
  );
};

export default ProjectItem;
