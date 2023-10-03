import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/usersSlice";
import {
  addProject,
  changeTitleValue,
  changeDescriptionValue,
  addMember,
} from "../../features/projects/projectSlice";

const AddProjectModal = ({ open, closeModal }) => {
  const { user } = useSelector((store) => store.user);
  const { users } = useSelector((store) => store.users);
  const { title, description } = useSelector((store) => store.projects);
  const [selectedMembersId, setSelectedMembersId] = useState([]);
  // const { addedProject } = useSelector((store) => store.projects);
  const dispatch = useDispatch();
  const { id } = user;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (!open) return null;

  const handleMemberChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      setSelectedMembersId([...selectedMembersId, value]);
    } else {
      setSelectedMembersId((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedMembersId);
    if (isLoading) return;

    setIsLoading(true);
    dispatch(
      addProject({
        title,
        description,
        project_author_id: id,
      })
    ).then(() => {
      selectedMembersId.forEach(async (user_id) => {
        console.log(user_id);
        dispatch(addMember({ user_id }));
      });
    });

    setIsLoading(false);
    dispatch(changeTitleValue(""));
    dispatch(changeDescriptionValue(""));
    closeModal();
  };

  return (
    <div
      className=" h-[100%] absolute top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
      onClick={closeModal}
    >
      <div
        className=" bg-white md:w-[40%] p-6 rounded-lg h-auto shadow-md"
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
              required
              placeholder=" Enter project title"
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
              required
              placeholder=" Enter project description"
              className=" w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
              onChange={(e) => dispatch(changeDescriptionValue(e.target.value))}
            ></textarea>
          </div>
          <div>
            <h3> Users</h3>
            <fieldset className="  w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[150px] flex gap-20 overflow-auto">
              <div>
                <h4>Name</h4>
                {users.map((user) => {
                  return (
                    <div className=" flex  gap-4" key={user.id}>
                      <input
                        type="checkbox"
                        value={user.id}
                        name={user.id}
                        id={user.id}
                        onChange={handleMemberChange}
                      />
                      <label htmlFor={user.id}>
                        {user.firstname} {user.lastname}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div>
                <h4>Role</h4>
                {users.map((user) => {
                  return (
                    <div className=" flex  gap-4" key={user.id}>
                      <div> {user.role}</div>
                    </div>
                  );
                })}
              </div>
            </fieldset>
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

export default AddProjectModal;
