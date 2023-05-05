import React from "react";

const TicketPriorityColor = ({ ticketDetail }) => {
  let backgroundColorClass = "";

  switch (ticketDetail.priority) {
    case "high":
      backgroundColorClass = "bg-[#FC8181]";
      break;
    case "medium":
      backgroundColorClass = "bg-[#F6E05E]";
      break;
    case "low":
      backgroundColorClass = "bg-[#68D391]";
      break;
    default:
      break;
  }

  return (
    <p
      className={`${backgroundColorClass} text-center py-1 rounded-2xl w-[5rem] text-sm`}
    >
      {ticketDetail.priority.charAt(0).toUpperCase() +
        ticketDetail.priority.slice(1)}
    </p>
  );
};

export default TicketPriorityColor;
