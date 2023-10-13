import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import AddMembers from "./AddMembers";
const AddContributorsModal = ({ open, closeModal, projectId }) => {
 
  if (!open) return null;
  return (
    <div
    className={`h-full fixed top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)] z-30`}
      onClick={closeModal}
    >
      <div
        className=" bg-white p-3 rounded-lg h-auto shadow-md mx-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold">Members</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <AddMembers closeModal={closeModal} projectId={projectId}/>
      </div>
    </div>
  );
};

export default AddContributorsModal;
