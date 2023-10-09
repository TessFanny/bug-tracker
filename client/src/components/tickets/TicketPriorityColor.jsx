import React from "react";

const TicketPriorityColor = ({ ticketDetail }) => {
  let ColorClass = "";

  switch (ticketDetail.priority) {
    case "high":
      ColorClass = "text-[#FC8181]";
      break;
    case "medium":
      ColorClass = "text-[#F6E05E]";
      break;
    case "low":
      ColorClass = "text-[#68D391]";
      break;
    default:
      break;
  }

  return (
    <p
      className={`${ColorClass}`}
    >
      {ticketDetail.priority.charAt(0).toUpperCase() +
        ticketDetail.priority.slice(1)}
    </p>
  );
};

export default TicketPriorityColor;
