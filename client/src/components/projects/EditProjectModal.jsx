import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  changeDescriptionValue,
  changeTitleValue,
  editProject,
  addMember
} from "../../features/projects/projectSlice";

const EditProjectModal = ({ open, closeModal, project }) => {
  const dispatch = useDispatch();
  const project_id = project.id;
  const { title, description } = useSelector((store) => store.projects);
  const { users } = useSelector((store) => store.users);
  const [selectedMembersId, setSelectedMembersId] = useState([]);

  useEffect(() => {
    dispatch(changeTitleValue(project.title));
    dispatch(changeDescriptionValue(project.description));
  }, [project_id]);

  const handleMemberChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      setSelectedMembersId([...selectedMembersId, value]);
    } else {
      setSelectedMembersId((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProject({ title, description, project_id })).then(() => {
      selectedMembersId.forEach(async (user_id) => {
        console.log(user_id);
        dispatch(addMember({ user_id,  projectId: project_id }));
      });
    });
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
