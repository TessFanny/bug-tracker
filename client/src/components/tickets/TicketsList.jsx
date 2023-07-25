import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTicketsProject } from "../../features/tickets/ticketsSlice";
import { Link } from "react-router-dom";
import AddTicketForm from "./AddTicketForm";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import TicketBgChange from "./TicketBgChange";

const TicketsList = ({
  projectId,
  setTicketDetail,
  setShowDetail,
  project,
}) => {
  const { tickets } = useSelector((store) => store.tickets);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [ticket, setTicket] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
   // pagination
   const [currentPage, setCurrentPage] = useState(1); // Current page number
   const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items per page
   
  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };

 console.log(tickets);

  useEffect(() => {
    dispatch(getAllTicketsProject({ project_id: projectId }));
  }, []);

  const filterTableData = () => {
    return tickets.filter((ticket) => {
     return Object.values(ticket).some((cell) => {
        if (cell === null) {
          return false;
        }
        return cell.toString().toLowerCase().includes(searchQuery.toLowerCase())
      });
    });
  };

   // pagination
   const totalPages = Math.ceil(filterTableData().length / itemsPerPage);

   const getCurrentPageData = () => {
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     return filterTableData().slice(startIndex, endIndex);
   };
  
  return (
    <section className=" px-4 py-7 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="flex justify-between">
        <h1 className=" text-lg">Tickets for {project.title} Project</h1>
        <button
          className=" bg-[#3b82f6] rounded-md px-2 py-1 text-white flex items-center"
          onClick={() => setOpenModal(true)}
        >
          <AiOutlinePlus className=" text-xl" />
          Add ticket
        </button>
      </div>
      <div className=" w-[30%] flex items-center  px-2 rounded-lg mt-4 self-end border-[1px] border-gray-200 shadow-md ">
        <AiOutlineSearch className=" text-2xl" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search ticket"
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-2 py-1 w-full outline-none"
        />
      </div>
      <div className=" w-full mt-4 pb-4  flex-1">
        <div className=" overflow-y-hidden overflow-x-auto">
          <table className=" w-full ">
            <thead className=" bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                  Title
                </td>
                <td className=" w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Description
                </td>
                <td className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Ticket Status
                </td>
                <td className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Ticket Author
                </td>
                <td className=" w-44 p-3 text-sm font-semibold tracking-wide text-left">
                  created_on
                </td>
                <td className=" w-44 p-3 text-sm font-semibold tracking-wide text-left">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-100 ">
              {getCurrentPageData().map((ticket, id) => (
                <tr key={id}>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      className=" text-[#3b82f6] hover:underline"
                      onClick={() => {
                        setShowDetail(true);
                        setTicketDetail(ticket);
                      }}
                    >
                      { ticket && (ticket.title.charAt(0).toUpperCase() +
                        ticket.title.slice(1))}
                    </button>
                  </td>
                  <td className=" truncate text-left overflow-ellipsis max-w-md p-3 text-sm text-gray-700  ">
                    {ticket && (ticket.description.charAt(0).toUpperCase() +
                      ticket.description.slice(1))}
                  </td>
                  <td
                    className={` p-3 text-sm text-gray-700 whitespace-nowrap`}
                  >
                    <TicketBgChange ticket={ticket} />
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {ticket && (ticket.author.charAt(0).toUpperCase() +
                      ticket.author.slice(1))}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {ticket.created_at}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      className=" mr-[.5rem] text-[#0f5132] bg-[#d1e7dd] py-1 px-5 rounded-md"
                      onClick={() => {
                        setOpenEditModal(true),
                          setTicket(ticket),
                          setTicketDetail(ticket);
                      }}
                      disabled={user.role === "admin" && "disabled"}
                    >
                      Edit
                    </button>
                    <button
                      className=" text-[#842029] bg-[#f8d7da] py-1 px-5 rounded-md"
                      onClick={() => {
                        setTicket(ticket), setOpenDeleteModal(true);
                      }}
                      disabled={user.role === "admin" && "disabled"}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" flex gap-5 pl-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
              className=" w-[25px] h-[25px] bg-[#3b82f6] text-white rounded-full flex justify-center items-center"
            >
              {index + 1}
            </button>
          ))}
        </div>
        </div>
      </div>
      <AddTicketForm
        open={openModal}
        closeModal={closeModal}
        projectId={projectId}
        ticket={ticket}
      />
      <DeleteTicket
        open={openDeleteModal}
        closeModal={closeModal}
        projectId={projectId}
        ticket={ticket}
      />
      <EditTicket
        open={openEditModal}
        closeModal={closeModal}
        projectId={projectId}
        ticket={ticket}
      />
    </section>
  );
};

export default TicketsList;
