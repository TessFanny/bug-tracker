import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/usersSlice";

const AddProjectModal = ({ open, closeModal }) => {
  const { user } = useSelector((store) => store.user);
  const { users } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  //console.log('user in project:', user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (!open) return null;
  const handleSubmit = (e) => {
    e.preventDefault();

    closeModal();
  };
  const handleClick = () => {};

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
              id=""
              cols="10"
              rows="10"
              placeholder=" Enter project description"
              className=" w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
            ></textarea>
          </div>
          <div>
            <h3> Contributors</h3>
            <fieldset className=" w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px] flex flex-col gap-2 overflow-auto">
              {users.map((user) => {
                return (
                  <div className=" flex gap-4" key={user.id}>
                    <input
                      type="checkbox"
                      id="contributor"
                      name="contributor"
                    />
                    <label htmlFor="contributor">
                      {user.firstname} {user.lastname}
                    </label>
                  </div>
                );
              })}
            </fieldset>
          </div>
          <button type="submit" className=" btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
