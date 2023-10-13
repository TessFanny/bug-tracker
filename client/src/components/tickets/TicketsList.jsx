import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets, getAllTicketsProject } from "../../features/tickets/ticketsSlice";
import { Link } from "react-router-dom";
import AddTicketForm from "./AddTicketForm";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import TicketBgChange from "./TicketBgChange";
import TicketItem from "./TicketItem";

const TicketsList = ({ projectId, setTicketDetail, setShowDetail }) => {

  // getting data from the redux store
  const { tickets } = useSelector((store) => store.tickets);
  const { projects } = useSelector((state) => state.projects);
  const { user } = useSelector((store) => store.user);
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
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // project that tickets are in
  const project = projects.find((project) => project.id == projectId);

  // closing modal function
  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };

// fetching all the tickets for a giving project id from redux store
  useEffect(() => {
    dispatch(getAllTicketsProject({ project_id: projectId }));
  }, []);

  // filtering data to get the data in the search query
  const filterTableData = () => {
    return tickets.filter((ticket) => {
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
    <section className="rounded-lg flex flex-col items-center mt-12  shadow-md relative bg-white">
      <div className=" bgGradient shadow-md rounded-md absolute top-[-1rem] w-[95%] md:w-[98%] p-2 text-whiteborder-b capitalize text-white">
        <h1 className=" text-lg px-3 pt-4 capitalize ">
          Tickets for : <span className="text-gray-500">{project.title} Project</span> 
        </h1>
        <div className="justify-center flex flex-col lg:flex-row-reverse lg:justify-between items-center gap-y-2 px-3">
          <button
            className="bgGradient rounded-md px-2 py-1 text-white shadow-lg flex items-center text-center justify-center w-full lg:w-[10rem] border-[1px]"
            onClick={() => setOpenModal(true)}
          >
            <AiOutlinePlus className=" text-xl" />
            Add ticket
          </button>
          <div className=" w-full lg:w-[30%] flex items-center  px-2 rounded-lg mt-4 self-end border-[1px] bg-white shadow-md ">
            <AiOutlineSearch size={25} className=" text-2xl text-black " />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search ticket"
              defaultValue={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" w-full pl-5 py-1 outline-none rounded-md focus-within:scale-105 pr-3 bg-white capitalize "
            />
          </div>
        </div>
      </div>
      <div className=" md:mt-[8rem] mt-[10rem] pb-4 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 p-5 ">
          {getCurrentPageData().map((ticket, id) => (
            <TicketItem
              key={id}
              ticket={ticket}
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}             
              setTicket={setTicket}
            />
          ))}
        </div>
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
      </div>
      <AddTicketForm
        open={openModal}
        closeModal={closeModal}
        projectId={projectId}
        ticket={ticket}
        position={modalPosition}
      />
      <DeleteTicket
        open={openDeleteModal}
        closeModal={closeModal}
        projectId={projectId}
        ticket={ticket}
        position={modalPosition}
      />
      <EditTicket
        open={openEditModal}
        closeModal={closeModal}
        projectId={projectId}
        ticket={ticket}
        position={modalPosition}
      />
    </section>
  );
};

export default TicketsList;
