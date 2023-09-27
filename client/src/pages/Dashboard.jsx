import React from "react";
import StatusChart from "../components/charts/StatusChart";
import PriorityChart from "../components/charts/PriorityChart";
import TypeChart from "../components/charts/TypeChart";
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets } from "../features/tickets/ticketsSlice";
import { useEffect } from "react";
import { AiFillCheckCircle, AiFillBug } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";

const Dashboard = () => {
  const { allTickets } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  const ticketStatusCounts = allTickets.reduce((counts, ticket) => {
    const { ticket_status } = ticket;
    counts[ticket_status] = (counts[ticket_status] || 0) + 1;
    return counts;
  }, {});
  
  const statusLabel = Object.keys(ticketStatusCounts)
  const statusCount = Object.values(ticketStatusCounts)

  return (
    <section className=" mt-[8rem] w-full h-full grid gap-6 pb-3 ">
      <article className="  w-full grid lg:grid-cols-3 gap-3">
        <div className=" min-w-[200px] w-full shadow-lg bg-white border-b-red-600 border-b-[8px] rounded-md  flex flex-col items-center md:px-10 p-6">
          <div className=" w-full flex justify-between">
            <span className=" text-[4rem] text-red-600 font-bold"> {statusCount[0]} </span>
            <div className=" w-16 h-16 bg-red-200 flex items-center justify-center rounded-md mt-5">
              <AiFillBug color="red" size={30}/>
            </div>
          </div>
          <h1 className=" text-3xl capitalize w-full"> {statusLabel[0]} Tickets </h1>
        </div>
        <div className=" w-full shadow-lg bg-white border-b-yellow-600 border-b-[8px] rounded-md  flex flex-col items-center md:px-10  p-6">
          <div className=" w-full flex justify-between">
            <span className=" text-[4rem] text-yellow-500 font-bold"> {statusCount[1]}  </span>
            <div className=" w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-md mt-5">
              <ImSpinner color="#ed9600" size={30} />
            </div>
          </div>
          <h1 className=" text-3xl capitalize w-full">Tickets {statusLabel[1]}  </h1>
        </div>
        <div className=" w-full shadow-lg bg-white border-b-green-600 border-b-[8px] rounded-md  flex flex-col items-center md:px-10  p-6">
          <div className=" w-full flex justify-between">
            <span className=" text-[4rem] text-green-600 font-bold"> {statusCount[2]}  </span>
            <div className=" w-16 h-16 bg-green-200 flex items-center justify-center rounded-md mt-5">
              <AiFillCheckCircle color="green" size={30}/>
            </div>
          </div>
          <h1 className=" text-3xl capitalize w-full">Tickets {statusLabel[2]}  </h1>
        </div>
  </article> 

      <article className="w-full grid lg:grid-cols-3 gap-3">
        <TypeChart />
        <PriorityChart />
        <StatusChart />
      </article>
    </section>
  );
};

export default Dashboard;
