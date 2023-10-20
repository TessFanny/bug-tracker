import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/usersSlice";
import {
  addMemberToTicket,
  changePriorityValue,
  changeStatusValue,
  changeTitleValue,
  changeDescriptionValue,
  changeTypeValue,
  changeColorValue,
  editTicket,
} from "../../features/tickets/ticketsSlice";
import { getAllContributors } from "../../features/projects/projectSlice";

const EditTicket = ({ open, closeModal, projectId, ticket, position }) => {
  const { users } = useSelector((store) => store.users);
  const { user } = useSelector((store) => store.user);
  const { title, description, ticket_status, priority, color, type, members } =
    useSelector((store) => store.tickets);
    const {contributors} = useSelector((store) => store.projects)
  const { id } = user;
  const initialSelectedMembers = members.map((contrib) => contrib.id);
  const [selectedMembersId, setSelectedMembersId] = useState(initialSelectedMembers);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // setAllProjects(...projects)
  //   dispatch(getAllContributors(projectId));
  // }, [projectId]);
  useEffect(() => {
    dispatch(changeTitleValue(ticket.title));
    dispatch(changeDescriptionValue(ticket.description));
    dispatch(changeStatusValue(ticket.ticket_status));
    dispatch(changePriorityValue(ticket.priority));
    dispatch(changeTypeValue(ticket.type));
    dispatch(changeColorValue(ticket.color));
  }, [open]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleStatusChange = (evt) => {
    dispatch(changeStatusValue(evt.target.value));
  };
  const handleTypeChange = (evt) => {
    dispatch(changeTypeValue(evt.target.value));
  };
  const handlePriorityChange = (evt) => {
    dispatch(changePriorityValue(evt.target.value));
  };
  const handleColorChange = (evt) => {
    dispatch(changeColorValue(evt.target.value));
  };

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
    
    if (isLoading) return;

    setIsLoading(true);
    dispatch(
      editTicket({
        title,
        description,
        ticket_status,
        priority,
        color,
        type,
        ticket_author_id: id,
        project_id: projectId,
        ticket_id: ticket.id,
      })
    ).then(() => {
      selectedMembersId.forEach(async (user_id) => {
        console.log(user_id);
        dispatch(addMemberToTicket({ user_id, ticketId: ticket.id }));
      });
    });

    setIsLoading(false);
    dispatch(changeTitleValue(""));
    dispatch(changeDescriptionValue(""));
    dispatch(changeStatusValue(""));
    dispatch(changeColorValue(""));
    dispatch(changePriorityValue(""));
    dispatch(changeTypeValue(""));
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
        className=" bg-white max-w-[80%]  md:w-[40%] px-6 py-2 rounded-lg shadow-md relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <h2 className=" text-2xl">Edit: <span className=" text-sm text-red-400">{ticket.title} ticket</span>  </h2>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className=" block capitalize text-[0.875rem] tracking-[1px]"
            >
              ticket Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={ticket.title}
              placeholder=" Enter project title"
              className=" w-full px-[0.5rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
              onChange={(e) => dispatch(changeTitleValue(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className=" block capitalize text-[0.875rem] tracking-[1px]"
            >
              ticket Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="10"
              defaultValue={ticket.description}
              className=" w-full  px-[0.5rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
              onChange={(e) => dispatch(changeDescriptionValue(e.target.value))}
            />
          </div>
          <div className=" grid w-full md:grid-cols-3 gap-x-2">
            <div className="grid ">
              <label
                htmlFor="type"
                className="block capitalize text-[0.875rem] tracking-[1px]"
              >
                Ticket Type
              </label>
              <select
                name="type"
                id="type"
                className=" px-4 border-[1px] rounded-sm w-full  bg-[#f0f4f8] outline-none"
                onChange={handleTypeChange}
                defaultValue={ticket.type}
              >
                <option value="issue">issue</option>
                <option value="bug">bug</option>
                <option value="error">error</option>
                <option value="feature request">feature request</option>
                <option value="other">other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="ticket_status"
                className="block capitalize text-[0.875rem] tracking-[1px]"
              >
                Ticket status
              </label>
              <select
                name="ticket_status"
                id="ticket_status"
                className=" px-4 border-[1px] rounded-sm w-full  bg-[#f0f4f8] outline-none "
                onChange={handleStatusChange}
                defaultValue={ticket.ticket_status}
              >
                <option value="new">new</option>
                <option value="in progress">in progress</option>
                <option value="resolved">resolved</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block capitalize text-[0.875rem] tracking-[1px]"
              >
                Ticket priority
              </label>
              <select
                name="priority"
                id="priority"
                className=" px-4 border-[1px] rounded-sm w-full  bg-[#f0f4f8] outline-none "
                onChange={handlePriorityChange}
                defaultValue={ticket.priority}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <h3> Users</h3>
            <fieldset className="  w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[150px] flex lg:gap-x-20 gap-5 overflow-auto">
              <div>
                <h4 className=" text-black font-semibold">Name</h4>
                {contributors && contributors.map((user) => {
                  return (
                    <div className=" flex  gap-4" key={user.id}>
                      <input
                        type="checkbox"
                        value={user.id}
                        name={user.id}
                        id={user.id}
                        disabled={initialSelectedMembers.includes(user.id)}
                        onChange={handleMemberChange}
                      />
                      <label htmlFor={user.id}>
                        {user.contributor} 
                      </label>
                    </div>
                  );
                })}
              </div>

              <div>
                <h4 className=" text-black font-semibold">Role</h4>
                {contributors &&  contributors.map((user) => {
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
            className=" text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md  mt-3"
          >
            Save Changes
          </button>
        </form>
        <button
          className="text-[#842029] bg-[#f8d7da] absolute bottom-[8px] right-[1.35rem] px-5 rounded-md "
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTicket;
