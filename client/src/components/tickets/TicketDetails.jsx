import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMembersTicket } from "../../features/tickets/ticketsSlice";

const TicketDetails = ({ ticketDetail, projectId }) => {
  const { members } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  const project_id = ticketDetail.id;
  useEffect(() => {
    dispatch(getAllMembersTicket(project_id));
  }, []);
  return (
    <section className="px-4 py-7 bg-slate-500 rounded-lg shadow-lg w-[50%]">
      <div className=" bg-cyan-50 p-4 flex">
        <div className=" w-[20%]">
          <h3>ticket title</h3>
          <p>{ticketDetail.title} </p>
        </div>
        <div className=" w-[20%]">
          <h3>ticket author</h3>
          <p>{ticketDetail.author} </p>
        </div>
        <div className=" w-[60%] text-center ">
          <h3>ticket description</h3>
          <p>{ticketDetail.description} </p>
        </div>
      </div>
      <div className=" bg-cyan-50 p-4 flex justify-between">
        <div>
          <h3>ticket type</h3>
          <p>{ticketDetail.type} </p>
        </div>
        <div>
          <h3>ticket status</h3>
          <p>{ticketDetail.ticket_status} </p>
        </div>
        <div>
          <h3>ticket priority</h3>
          <p className="">{ticketDetail.priority} </p>
        </div>
        <div>
          <h3>ticket description</h3>
          <p>{ticketDetail.color} </p>
        </div>
      </div>
      <div>
        <h2>Assigned devs</h2>
        {members.map((member, id) => (
          <div className=" flex justify-between" key={id}>
            <div>{member.contributor} </div>
            <div>{member.email} </div>
            <div>{member.role} </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TicketDetails;
