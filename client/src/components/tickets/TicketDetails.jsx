import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMembersTicket } from "../../features/tickets/ticketsSlice";
import TicketBgChange from "./TicketBgChange";
import TicketPriorityColor from "./TicketPriorityColor";

const TicketDetails = ({ ticketDetail, projectId }) => {
  const { members } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  const project_id = ticketDetail.id;
  useEffect(() => {
    dispatch(getAllMembersTicket(project_id));
  }, []);
  return (
    <section className="px-4 py-7  rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-[50%] ">
      <div className="w-full flex justify-between ">
        <div className="flex flex-col  w-[75%] pb-2 justify-evenly">
          <div className=" border-b-[1px] pb-3">
            <h3 className=" text-[11px] font-semibold text-black">TITLE</h3>
            <p className=" text-sm">{ticketDetail.title} </p>
          </div>
          <div className="  ">
            <h3 className=" text-[11px] pt-2 font-semibold text-black">
              DESCRIPTION
            </h3>
            <p className=" text-sm">{ticketDetail.description} </p>
          </div>
          <div className="">
            <h3 className=" text-[11px] pt-2 font-semibold text-black ">
              AUTHOR
            </h3>
            <p className=" text-sm">{ticketDetail.author} </p>
          </div>
        </div>
        <div className=" border-l-[1px] p-4 flex flex-col w-[35%]">
          <div className=" flex flex-col gap-3 self-center">
            <h3 className=" text-[11px] pt-2 font-semibold text-black">
            
              TYPE
            </h3>
            <p className=" bg-purple-200 text-purple-900 rounded-xl text-center w-[5rem] ">{ticketDetail.type} </p>
          </div>
          <div className=" flex flex-col gap-3 self-center">
            <h3 className=" text-[11px] pt-2 font-semibold text-black">
              STATUS
            </h3>
            <div className="">
              <TicketBgChange ticket={ticketDetail} />
            </div>
          </div>
          <div className=" flex flex-col gap-3 self-center">
            <h3 className=" text-[11px] pt-2 font-semibold text-black">
              PRIORITY
            </h3>
            <TicketPriorityColor ticketDetail={ticketDetail} />
          </div>
        </div>
      </div>

      <div className=" border-t-[1px] pt-3 ">
        <h2 className=" text-[11px] font-semibold text-black">ASSIGNED DEVS</h2>
        {members.map((member, id) => (
          <div className=" flex justify-between text-sm" key={id}>
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
