import React from "react";

const TicketBgChange = ({ ticket }) => {
  let backgroundColorClass = "";

  switch (ticket.ticket_status) {
    case "new":
      backgroundColorClass = "bg-[#FC8181]";
      break;
    case "in progress":
      backgroundColorClass = "bg-[#F6E05E]";
      break;
    case "resolved":
      backgroundColorClass = "bg-[#68D391]";
      break;
    default:
      break;
  }

  return (
    <p
      className={`${backgroundColorClass} text-center py-1 rounded-2xl w-[5rem] text-sm`}
    >
      {ticket.ticket_status.charAt(0).toUpperCase() +
        ticket.ticket_status.slice(1)}
    </p>
  );
};

export default TicketBgChange;
