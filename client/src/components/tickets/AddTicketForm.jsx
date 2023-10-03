import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/usersSlice";
import {
  addMemberToTicket,
  addTicket,
  changePriorityValue,
  changeStatusValue,
  changeTitleValue,
  changeDescriptionValue,
  changeTypeValue,
  changeColorValue,
} from "../../features/tickets/ticketsSlice";

const AddTicketForm = ({ open, closeModal, projectId, ticket,position }) => {
  const { users } = useSelector((store) => store.users);
  const { user } = useSelector((store) => store.user);
  const { title, description, ticket_status, priority, color, type } =
    useSelector((store) => store.tickets);

  const { id } = user;
  const [selectedMembersId, setSelectedMembersId] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(changeStatusValue("new"));
    dispatch(changePriorityValue("low"));
    dispatch(changeTypeValue("issue"));
    dispatch(changeColorValue("#ccc"));
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
      addTicket({
        title,
        description,
        ticket_status,
        priority,
        color,
        type,
        ticket_author_id: id,
        project_id: projectId,
      })
    ).then(() => {
      selectedMembersId.forEach(async (user_id) => {
        console.log(user_id);
        dispatch(addMemberToTicket({ user_id }));
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
        className=" bg-white max-w-[100%] md:w-[40%]  p-6 rounded-lg h-auto shadow-md relative z-[1000]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold capitalize">Add New ticket </span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <form className="grid " onSubmit={handleSubmit}>
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
              required
              placeholder=" Enter project title"
              className=" w-full  px-[0.5rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] "
              onChange={(e) => dispatch(changeTitleValue(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className=" block  capitalize text-[0.875rem] tracking-[1px]"
            >
              ticket Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="10"
              required
              placeholder=" Enter project description"
              className=" w-full  px-[0.5rem]   rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[100px]"
              onChange={(e) => dispatch(changeDescriptionValue(e.target.value))}
            ></textarea>
          </div>
          <div className="grid w-full md:grid-cols-3 gap-x-4">
            <div className=" flex flex-col">
              <label
                htmlFor="type"
                className=" block  capitalize text-[0.875rem] tracking-[1px]"
              >
                
                Ticket Type
              </label>
              <select
                name="type"
                id="type"
                className=" px-4 border-[1px] rounded-sm w-full bg-[#f0f4f8] outline-none py-[0.225rem] "
                onChange={handleTypeChange}
              >
                <option defaultValue="issue">issue</option>
                <option value="bug">bug</option>
                <option value="code review">code review</option>
                <option value="feature">feature </option>
                <option value="other">other</option>
              </select>
            </div>
            <div className=" flex flex-col">
              <label
                htmlFor="ticket_status"
                className=" block  capitalize text-[0.875rem] tracking-[1px]"
              >
              
                Ticket status
              </label>
              <select
                name="ticket_status"
                id="ticket_status"
                onChange={handleStatusChange}
                className=" px-4 border-[1px] rounded-sm w-full bg-[#f0f4f8] outline-none py-[0.225rem]"
              >
                <option defaultValue={ticket_status}>new</option>
                <option value="in progress">in progress</option>
                <option value="resolved">resolved</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className=" block  capitalize text-[0.875rem] tracking-[1px]"
              >
                
                Ticket priority
              </label>
              <select
                name="priority"
                id="priority"
                onChange={handlePriorityChange}
                className=" px-4 border-[1px] rounded-sm w-full bg-[#f0f4f8] outline-none py-[0.225rem]"
              >
                <option defaultValue={priority}>low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <h3 > Users</h3>
            <fieldset className="  lg:w-[50%] py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[150px] flex gap-x-4 lg:gap-11 overflow-auto">
              <div>
                <h4 className=" text-black font-semibold">Name</h4>
                {users.map((user) => {
                  return (
                    <div className="flex" key={user.id}>
                      <input
                        type="checkbox"
                        value={user.id}
                        name={user.id}
                        id={user.id}
                        onChange={handleMemberChange}
                      />
                      <label htmlFor={user.id} className=" ml-1">
                        {user.firstname} {user.lastname}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div>
                <h4 className=" text-black font-semibold">Role</h4>
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
            className=" bg-green-700 w-[6rem] rounded-md mx-auto mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicketForm;
