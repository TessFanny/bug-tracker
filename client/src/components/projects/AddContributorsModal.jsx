import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import AddContributors from "./AddContributors";
const AddContributorsModal = ({ open, closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDafault()
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
          <span className=" font-semibold">Add contributors</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <AddContributors />
          </div>

          <button
            type="submit"
            className=" bg-green-700 w-[6rem] self-center py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContributorsModal;
