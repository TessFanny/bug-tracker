import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { deleteProject } from "../../features/projects/projectSlice";

const DeleteProjectModal = ({ open, closeModal, project, position }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((store) => store.projects);
  const projectToDelete = projects.find((proj) => proj.id == project.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteProject(projectToDelete.id));
    closeModal();
  };
  if (!open) return null;

  return (
    <div
      className=" h-[100%] fixed top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
      style={{ top: position.top, left: position.left }}
      onClick={closeModal}

    >
      <div
        className=" bg-white md:w-[40%] p-6 rounded-lg h-auto shadow-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold">Delete {project.title}</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <div>
          <p>Do you really want to delete this project?</p>
          <div className=" flex justify-between mt-2">
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md"
              >
                Delete
              </button>
            </form>
            <button
              className=" mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
