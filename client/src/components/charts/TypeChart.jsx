import  { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets } from "../../features/tickets/ticketsSlice";

const TypeChart = () => {
    const { allTickets } = useSelector((store) => store.tickets);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllTickets())
    }, []);
  

  const ticketType = [...new Set(allTickets.map((ticket) => ticket.type))];
  const ticketTypeCounts = allTickets.reduce((counts, ticket) => {
    const { type } = ticket;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  const ticketTypeValues = Object.values(ticketTypeCounts);
  const data = {
    labels: ticketType,
    datasets: [
      {
        label: "# of Votes",
        data: ticketTypeValues,
        backgroundColor: ["#4e65c5", "#619e30", "#dd9a2a", "#b04023"],
        borderColor: ["#fff", "#fff", "#fff", "#fff"],
        borderWidth: 2,
        circumference: 360,
      },
    ],
  };

  return (
    <div className="h-[25rem] mt-4 pt-4 pb-4 bg-white rounded-md shadow-md px-4  flex flex-col flex-1 ">
      <h3 className=" border-b-[1px] pb-4">Tickets by Type</h3>
      <div className=" flex justify-center items-center h-[20rem]">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default TypeChart;
