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

const EditTicket = ({ open, closeModal, projectId, ticket }) => {
  const { users } = useSelector((store) => store.users);
  const { user } = useSelector((store) => store.user);
  const { title, description, ticket_status, priority, color, type } =
    useSelector((store) => store.tickets);
  const { id } = user;
  const [selectedMembersId, setSelectedMembersId] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(selectedMembersId);
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
      className=" h-[100vh] absolute top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
      onClick={closeModal}
    >
      <div
        className=" bg-white w-[30%] p-6 rounded-lg h-auto shadow-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold">Edit {ticket.title} ticket </span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className=" block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
            >
              ticket Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={ticket.title}
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
              ticket Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="10"
              defaultValue={ticket.description}
              className=" w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
              onChange={(e) => dispatch(changeDescriptionValue(e.target.value))}
            ></textarea>
          </div>
          <div className=" flex justify-between w-full gap-3">
            <div className=" flex flex-col">
              <label
                htmlFor="type"
                className="block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
              >
                Ticket Type
              </label>
              <select
                name="type"
                id="type"
                className=" px-4 border-[1px] rounded-sm  bg-[#f0f4f8] outline-none py-[0.225rem]"
                onChange={handleTypeChange}
              >
                <option defaultValue={ticket.type}>issue</option>
                <option value="bug">bug</option>
                <option value="error">error</option>
                <option value="feature request">feature request</option>
                <option value="other">other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="ticket_status"
                className="block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
              >
                
                Ticket status
              </label>
              <select
                name="ticket_status"
                id="ticket_status"
                className=" px-4 border-[1px] rounded-sm  bg-[#f0f4f8] outline-none py-[0.225rem]"
                onChange={handleStatusChange}
              >
                <option defaultValue={ticket.ticket_status}>new</option>
                <option value="in progress">in progress</option>
                <option value="resolved">resolved</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px]"
              >
               
                Ticket priority
              </label>
              <select
                name="priority"
                id="priority"
                className=" px-4 border-[1px] rounded-sm  bg-[#f0f4f8] outline-none py-[0.225rem]"
                onChange={handlePriorityChange}
              >
                <option defaultValue={ticket.priority}>low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
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

export default EditTicket;
