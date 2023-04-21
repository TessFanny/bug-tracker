import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  changeDescriptionValue,
  changeTitleValue,
  editProject,
} from "../../../features/projects/projectSlice";

const EditProjectModal = ({ open, closeModal, project }) => {
  const dispatch = useDispatch();
  const project_id = project.id;
  const { title, description } = useSelector((store) => store.projects);

  useEffect(() => {
    dispatch(changeTitleValue(project.title));
    dispatch(changeDescriptionValue(project.description));
  }, [project_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProject({ title, description, project_id }));
    closeModal();
  };
  if (!open) return null;
  return (
    <div
      className=" h-[100vh] absolute top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
      onClick={closeModal}
    >
      <div
        className=" bg-white w-[40%] p-6 rounded-lg h-auto shadow-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold">Edit {project.title}</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <div className=" flex justify-between flex-col">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className=" block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
              >
                Project Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={project.title}
                className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
                onChange={(e) => dispatch(changeTitleValue(e.target.value))}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className=" block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
              >
                Project Description
              </label>
              <textarea
                name="description"
                id="description"
                cols="10"
                rows="10"
                defaultValue={project.description}
                className=" w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
                onChange={(e) =>
                  dispatch(changeDescriptionValue(e.target.value))
                }
              ></textarea>
            </div>
            <button
              type="submit"
              className=" text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md"
            >
              Save Changes
            </button>
          </form>
          <button
            className=" mr-[.5rem] text-[#842029] bg-[#f8d7da]  px-5 rounded-md self-end"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
