import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets } from "../../features/tickets/ticketsSlice";


const StatusChart = () => {
  const { allTickets } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTickets())
  }, []);


  const ticketStatus = [
    ...new Set(allTickets.map((ticket) => ticket.ticket_status)),
  ];
  const ticketStatusCounts = allTickets.reduce((counts, ticket) => {
    const { ticket_status } = ticket;
    counts[ticket_status] = (counts[ticket_status] || 0) + 1;
    return counts;
  }, {});
 
  const ticketStatusValues = Object.values(ticketStatusCounts);

  const data = {
    labels: ticketStatus,
    datasets: [
      {
        label: "# of Votes",
        data: ticketStatusValues,
        backgroundColor: ["#b04023", "#4e65c5", "#dd9a2a"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className=" h-[25rem] mt-4 pt-4 pb-4 bg-white rounded-md shadow-md px-4  flex flex-col flex-1 ">
      <h3 className=" border-b-[1px] pb-4">Tickets by status</h3>
      <div className=" flex justify-center items-center h-[20rem]">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default StatusChart;
