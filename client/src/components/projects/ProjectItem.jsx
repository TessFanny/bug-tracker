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
    <div className="bg-white shadow-lg rounded-lg min-w-full max-w-sm hover:scale-105 transition duration-300 ease-in-out">
      <div className=" p-3 w-full flex justify-between border-b rounded-t-lg capitalize transition duration-300 ease-in-out">
        <h2 className=" text-md  hover:text-black">
          <Link
            to={`project/${project.id}`}
            className=" text-[#3b82f6] hover:underline hover:text-black transition duration-300 ease-in-out"
          >
            {project.title.charAt(0).toUpperCase() + project.title.slice(1)}
          </Link>
        </h2>
        <div className="">
          <h3 className="text-sm text-black"> Author :</h3>
          <p
            className="text-[.8rem] text-gray-500 "
            data-title="Project author"
          >
            {project.author}
          </p>
        </div>
      </div>

      <p
        className=" text-left p-3 text-sm text-gray-700 w-[100%]"
        data-title="Description"
      >
        {project.description.charAt(0).toUpperCase() +
          project.description.slice(1)}
      </p>

      <div className=" p-3 text-sm text-gray-700 flex justify-between items-center">
        <div>
          <button
            className="edit"
            onClick={() => {
              setProject(project), setOpenEditModal(true);
            }}
            disabled={user.role === "developer" && "disabled"}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => {
              setProject(project), setOpenDeleteModal(true);
            }}
            disabled={user.role === "developer" && "disabled"}
          >
            delete
          </button>
        </div>

        <p
          className=" p-3 text-[.7rem] text-black  font-semibold"
          data-title="Created_at"
        >
          {project.created_at}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
