import React from "react";

const TicketBgChange = ({ ticket }) => {
  let ColorClass = "";

  switch (ticket.ticket_status) {
    case "new":
      ColorClass = "text-[#FC8181]";
      break;
    case "in progress":
     ColorClass = "text-[#F6E05E]";
      break;
    case "resolved":
      ColorClass = "text-[#68D391]";
      break;
    default:
      break;
  }

  return (
    <div>
    {ticket && <p
      className={`${ColorClass} `}
    >
      {ticket.ticket_status.charAt(0).toUpperCase() +
        ticket.ticket_status.slice(1)}
    </p>}
    </div>
   
    
  );
};

export default TicketBgChange;
