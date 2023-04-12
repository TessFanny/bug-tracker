import React from "react";
import AddContributorsModal from "./AddContributorsModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const Project = ({ newProject }) => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <div className=" w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1 text-gray-900">
      <div className=" w-full border-b-[1px] p-4 flex justify-between">
        <div>
          <h3>Title </h3>
          <p>{newProject.title} </p>
        </div>
        <div>
          <button
            className=" bg-[#3b82f6] rounded-md px-1 py-1 text-white  flex items-center"
            onClick={() => setOpenModal(true)}
          >
            <AiOutlinePlus className=" text-xl" />
            Add Contributors
          </button>
        </div>
      </div>
      <div className=" p-4">
        <div>
          <h4>Description</h4>
          <p>{newProject.description} dummy text description to fill out the project </p>
        </div>
        <p>{newProject.created_at} </p>
        <p>{newProject.updated_at} </p>
        <p>{newProject.author} </p>
      </div>

      <AddContributorsModal open={openModal} closeModal={closeModal} />
    </div>
  );
};

export default Project;
