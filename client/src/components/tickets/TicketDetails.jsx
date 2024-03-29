import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteUserOnTicket,
  getAllMembersTicket,
  getAllTickets,
} from "../../features/tickets/ticketsSlice";
import { HiOutlineTrash } from "react-icons/hi";
import Loader from "../Loader";
import TicketBgChange from "./TicketBgChange";
import TicketPriorityColor from "./TicketPriorityColor";
import { getAllProjects } from "../../features/projects/projectSlice";
import CommentsOnTicket from "../comments/CommentsOnTicket";
import { formatDate, formatCreateDate } from "../../utils/formatDate";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { allTickets, members } = useSelector((store) => store.tickets);
  const { projects } = useSelector((store) => store.projects);
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  const ticket = allTickets.find((ticket) => ticket.id == ticketId);
  const project =
    ticket && projects.find((project) => project.id == ticket.project_id);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllMembersTicket(ticketId));
  }, [userId]);

  useEffect(() => {
    dispatch(getAllTickets());
    dispatch(getAllProjects());
  }, [ticketId]);

  return (
    <div className="lg:p-5 grid md:grid-cols-2 gap-y-8 gap-x-3 ">
      <div className=" bg-white relative flex  justify-center  ">
        <div className="bgGradient shadow-md rounded-sm absolute top-[-1rem] w-[95%] p-2 text-white">
          <h2 className=" capitalize ">
            details for tickets:{" "}
            {ticket && <span className=" text-black ml-2">{ticket.title}</span>}
          </h2>
          <button className=" underline text-lg" onClick={() => navigate(-1)}>
            Back to list
          </button>
        </div>
        {ticket ? (
          <div className="w-full mt-[5rem] md:mt-[2rem] p-3 md:p-8 text-gray-600 ">
            <div className=" grid md:grid-cols-2 border-b-[1px]  pb-2 md:h-[8rem] md:items-center md:pb-0 h-[12rem]">
              <div className="border-b-2 pb-2 md:border-none md:pb-0">
                <h3 className=" text-sm font-semibold "> TICKET TITLE</h3>
                <p className=" text-sm">{ticket.title} </p>
              </div>
              <div className=" py-3 md:py-0 ">
                <h3 className=" text-sm font-semibold ">TICKET DESCRIPTION</h3>
                <p className=" text-sm text-ellipsis">{ticket.description} </p>
              </div>
            </div>
            <div className=" grid grid-cols-2 border-b-[1px] h-[5rem] items-center">
              <div className=" flex flex-col gap-3 self-center">
                <h3 className=" text-sm font-semibold uppercase"> project</h3>
                {project && (
                  <p className="  text-blue-600 capitalize ">{project.title}</p>
                )}
              </div>
              <div className=" ">
                <h3 className="text-sm font-semibold"> TICKET PRIORITY</h3>
                <TicketPriorityColor ticketDetail={ticket} />
              </div>
            </div>
            <div className=" grid grid-cols-2 border-b-[1px] pb-2 h-[5rem] items-center">
              <div className="">
                <h3 className="text-sm font-semibold capitalize ">
                  TICKET STATUS
                </h3>
                <div className="">
                  <TicketBgChange ticket={ticket} />
                </div>
              </div>
              <div className=" ">
                <h3 className="text-sm font-semibold ">TICKET TYPE</h3>
                <p className="  text-blue-600 capitalize ">{ticket.type}</p>
              </div>
            </div>
            <div className=" grid grid-cols-2 border-b-[1px] pb-2 h-[5rem] items-center">
              <div className="">
                <h3 className=" text-sm font-semibold ">TICKET SUBMITTER</h3>
                <p className=" text-sm">{ticket.author} </p>
              </div>
              <div className=" ">
                <h2 className=" text-sm font-semibold uppercase">
                  ASSIGNED DEVELOPERS
                </h2>
                {members &&
                  members.map((member, id) => (
                    <div className=" flex  text-sm gap-3 items-center" key={id}>
                      <div>{member.contributor} </div>
                      <span
                        className=" cursor-pointer"
                        onClick={() => {
                          dispatch(
                            deleteUserOnTicket({
                              ticket_id: ticketId,
                              user_id: member.id,
                            })
                          );
                          setUserId((prev) => member.id);
                        }}
                      >
                        {" "}
                        <HiOutlineTrash color="red" size={15} />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className=" grid grid-cols-2  pb-2 h-[5rem] items-center">
              <div className="">
                <h3 className="text-sm font-semibold uppercase ">created</h3>
                <p className=" text-sm">{ticket.created_at}</p>
              </div>
              <div className="">
                <h3 className="text-sm font-semibold uppercase ">updated</h3>
                <p className=" text-sm">{ticket.updated_at}</p>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <div className=" bg-white relative flex justify-center  text-white h-full">
        <div className="bgGradient shadow-lg rounded-sm absolute top-[-1rem] w-[95%] p-2">
          <h2 className=" capitalize ">Ticket comments</h2>
          {ticket && <h2 className=" text-black ml-2">for: {ticket.title}</h2>}
        </div>

        <div className=" w-full px-7 ">
          {ticket && <CommentsOnTicket ticketDetail={ticket} />}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
