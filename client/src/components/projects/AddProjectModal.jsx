import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/usersSlice";
import { addProject, changeTitleValue, changeDescriptionValue } from "../../features/projects/projectSlice";
import AddContributors from "./AddContributors";

const AddProjectModal = ({ open, closeModal }) => {
  const { user } = useSelector((store) => store.user);
  const { users } = useSelector((store) => store.users);
  const { title, description, user_id} = useSelector(store=> store.projects)
  const dispatch = useDispatch();
  const { id} = user
 const [isLoading, setIsLoading] = useState(false)
  //console.log('user in project:', user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isLoading) return;
    setIsLoading(true)
    dispatch(addProject({
      title,
      description, 
      user_id : id
    }))
    setIsLoading(false)
    dispatch(changeTitleValue(''))
    dispatch(changeDescriptionValue(''))
    closeModal();
  };
  // const handleClick = (e) => {
  //   e.preventDefault()

  // };

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
          <span className=" font-semibold">Add New Project</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              placeholder=" Enter project title"
              className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
              onChange={(e)=> dispatch(changeTitleValue(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className=" block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
            >
              {" "}
              Project Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="10"
              placeholder=" Enter project description"
              className=" w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
              onChange={(e)=> dispatch(changeDescriptionValue(e.target.value))}
            ></textarea>
            <AddContributors/>
          </div>
          
          <button type="submit" className=" bg-green-700 w-[6rem] self-center py-2 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
