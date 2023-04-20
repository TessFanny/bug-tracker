import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import AddMembers from "./AddMembers";
const AddContributorsModal = ({ open, closeModal, projectId }) => {
  const handleSubmit = (e) => {
    e.preventDafault();
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
          <span className=" font-semibold">Add Members</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <AddMembers closeModal={closeModal} projectId={projectId}/>
      </div>
    </div>
  );
};

export default AddContributorsModal;
