import React, { useEffect, useState } from "react";
import { getAllTickets } from "../features/tickets/ticketsSlice";
import { useSelector, useDispatch } from "react-redux";
import TicketItem from "../components/tickets/TicketItem";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import AddTicketForm from "../components/tickets/AddTicketForm";
import EditTicket from "../components/tickets/EditTicket";
import DeleteTicket from "../components/tickets/DeleteTicket";
import { motion } from "framer-motion";
import AllTicketItem from "../components/tickets/AllTicketItem";

const Tickets = () => {
  const { allTickets } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  // handling modal for adding, deleting and editing a ticket
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [ticket, setTicket] = useState({});
  // set modal position when clicking on some area of the page
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  // search query
  const [searchQuery, setSearchQuery] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  // closing modal function
  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };

  // trying to access data that is clicked
  const handleClick = (e) => {
    const projectId = e.target.dataset.project.id;
  };
  // filtering data to get the data in the search query
  const filterTableData = () => {
    return allTickets.filter((ticket) => {
      return Object.values(ticket).some((cell) => {
        if (cell === null) {
          return false;
        }
        return cell
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    });
  };

  // pagination
  const totalPages = Math.ceil(filterTableData().length / itemsPerPage);

  // get a certain number of data per page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterTableData().slice(startIndex, endIndex);
  };

  return (
    <section className="  mt-[8rem] w-full h-full lg:p-5 rounded-lg flex flex-col  shadow-md ">
      <div className=" bgGradient flex justify-between items-center flex-col md:flex-row px-5 py-4 rounded-md">
        <h1 className=" text-2xl font-bold capitalize "> All tickets </h1>
        <div className=" w-[100%]  lg:w-[30%] flex items-center px-2 rounded-lg mt-4 self-end border-[1px] bg-[#f5f1f3] border-gray-200 shadow-md ">
          <AiOutlineSearch size={25} className=" text-2xl " />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search ticket"
            defaultValue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" w-full pl-5 py-1 outline-none rounded-md focus-within:scale-105 pr-3 bg-[#f5f1f3]"
          />
        </div>
      </div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-5 gap-5  p-5 "
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {getCurrentPageData().map((ticket, id) => (
          <AllTicketItem
            key={id}
            ticket={ticket}
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenEditModal={setOpenEditModal}
            setTicket={setTicket}
          />
        ))}
      </motion.div>
      <div className=" flex gap-5 p-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            className=" w-[25px] h-[25px] bgGradient text-white rounded-full flex justify-center items-center"
          >
            {index + 1}
          </button>
        ))}
      </div>
      <EditTicket
        open={openEditModal}
        closeModal={closeModal}
        projectId={ticket.project_id}
        ticket={ticket}
        position={modalPosition}
      />
      <DeleteTicket
        open={openDeleteModal}
        closeModal={closeModal}
        projectId={ticket.project_id}
        ticket={ticket}
        position={modalPosition}
      />
    </section>
  );
};

export default Tickets;
