import React, { useState } from "react";
import TicketBgChange from "./TicketBgChange";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import TicketDetails from "./TicketDetails";

const TicketItem = ({
  ticket,
  setOpenDeleteModal,
  setOpenEditModal,
  setTicket,
}) => {
  const { user } = useSelector((store) => store.user);
  const {ticketId} = useParams()

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
      className={`max-h-[20rem] min-h-[12rem] rounded-md grid border-[1px] ${borderColorClass} border-t-[8px] `}
    >
      <div className="  p-3 w-full flex justify-between border-b rounded-t-lg capitalize transition duration-300 ease-in-out">
        <Link
          to={`ticket/${ticket.id}`}
          className=" text-[#3b82f6] hover:underline"
          
        >
          {ticket &&
            ticket.title.charAt(0).toUpperCase() + ticket.title.slice(1)}
        </Link>
        <div className={`p-3 text-sm text-gray-700 `}>
          <TicketBgChange ticket={ticket} />
        </div>
      </div>

      <div className="text-left  max-w-md p-3 text-sm text-gray-700 h-[8rem] ">
        {ticket &&
          ticket.description.charAt(0).toUpperCase() +
            ticket.description.slice(1)}
      </div>
      <div className="px-3 flex justify-between">
        <h3 className="text-sm text-black"> Submitter :</h3>
        <p className="text-[.8rem] text-gray-500 mr-4">{ticket.author}</p>
      </div>

      <div className=" p-3 text-sm text-gray-700 ">
        <button
          className="edit"
          onClick={() => {
            setOpenEditModal(true), setTicket(ticket)
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
        <span className="  text-[.6rem] text-gray-700 ml-[4.2rem] ">
          {ticket.created_at}
        </span>
      </div>
      
    </div>
  );
};
export default TicketItem;
