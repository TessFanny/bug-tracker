import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut  } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { useSelector, useDispatch } from "react-redux";
import  { useEffect } from "react";
import { getAllTickets } from "../../features/tickets/ticketsSlice";



const PriorityChart = () => {
    const { allTickets } = useSelector((store) => store.tickets);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllTickets())
    }, []);
  



  const ticketPriority = [...new Set(allTickets.map((ticket) => ticket.priority))];
  const ticketPriorityCounts = allTickets.reduce((counts, ticket) => {
    const { priority } = ticket;
    counts[priority] = (counts[priority] || 0) + 1;
    return counts;
  }, {});

  const ticketPriorityValues = Object.values(ticketPriorityCounts);

  const data = {
    labels: ticketPriority,
    datasets: [
      {
        label: "# of Votes",
        data: ticketPriorityValues,
        backgroundColor: ["#b04023", "#dd9a2a", "#16a34a"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-[25rem] mt-4 pt-4 pb-4 bg-white rounded-md shadow-md px-4  flex flex-col flex-1 ">
      <h3 className=" border-b-[1px] pb-4">Tickets by Priority</h3>
      <div className=" flex justify-center items-center h-[20rem]">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default PriorityChart;
