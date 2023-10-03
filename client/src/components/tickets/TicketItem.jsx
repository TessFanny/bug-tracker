import React from "react";
import TicketBgChange from "./TicketBgChange";
import { useSelector, useDispatch } from "react-redux";

const TicketItem = ({
  ticket,
  setOpenDeleteModal,
  setOpenEditModal,
  setShowDetail,
  setTicketDetail,
  setTicket,
}) => {
  const { user } = useSelector((store) => store.user);

  let borderColorClass = "";

  switch (ticket.ticket_status) {
    case "new":
      borderColorClass = "border-t-[#FC8181]";
      break;
    case "in progress":
      borderColorClass = "border-t-[#F6E05E]";
      break;
    case "resolved":
      borderColorClass = "border-t-[#68D391]";
      break;
    default:
      break;
  }
  return (
    <div
      className={` bg-white rounded-md grid ${borderColorClass} border-t-[8px]`}
    >
      <div className="  p-3 w-full flex justify-between border-b rounded-t-lg capitalize transition duration-300 ease-in-out">
        <button
          className=" text-[#3b82f6] hover:underline"
          onClick={() => {
            setShowDetail(true);
            setTicketDetail(ticket);
          }}
        >
          {ticket &&
            ticket.title.charAt(0).toUpperCase() + ticket.title.slice(1)}
        </button>
        <div className="">
          <h3 className="text-sm text-black"> Author :</h3>
          <p
            className="text-[.8rem] text-gray-500 "
            data-title="Project author"
          >
            {ticket.author}
          </p>
        </div>
      </div>

      <div className=" truncate text-left overflow-ellipsis max-w-md p-3 text-sm text-gray-700  ">
        {ticket &&
          ticket.description.charAt(0).toUpperCase() +
            ticket.description.slice(1)}
      </div>
      <div className={` p-3 text-sm text-gray-700 whitespace-nowrap`}>
        <TicketBgChange ticket={ticket} />
      </div>
      <div className=" p-3 text-sm text-gray-700 ">
        {ticket.created_at}
      </div>
      <div className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        <button
          className="edit"
          onClick={() => {
            setOpenEditModal(true), setTicket(ticket), setTicketDetail(ticket);
          }}
          disabled={user.role === "developer" && "disabled"}
        >
          Edit
        </button>
        <button
          className="delete"
          onClick={() => {
            setTicket(ticket), setOpenDeleteModal(true);
          }}
          disabled={user.role === "developer" && "disabled"}
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default TicketItem;
