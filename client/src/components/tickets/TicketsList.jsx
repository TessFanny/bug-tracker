import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTicketsProject } from "../../features/tickets/ticketsSlice";
import { Link } from "react-router-dom";
import AddTicketForm from "./AddTicketForm";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import TicketBgChange from "./TicketBgChange";
import TicketItem from "./TicketItem";

const TicketsList = ({ projectId, setTicketDetail, setShowDetail }) => {
  const { tickets } = useSelector((store) => store.tickets);
  const { projects } = useSelector((state) => state.projects);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [ticket, setTicket] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  const project = projects.find((project) => project.id == projectId);

  const closeModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };

  useEffect(() => {
    dispatch(getAllTicketsProject({ project_id: projectId }));
  }, []);

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

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterTableData().slice(startIndex, endIndex);
  };

  return (
    <section className="rounded-lg flex flex-col  mt-4 bg-white shadow-md">
      <div className=" ">
        <h1 className=" text-lg px-3 pt-4">
          Tickets for {project.title} Project
        </h1>
        <div className="justify-center flex flex-col lg:flex-row-reverse lg:justify-between items-center gap-y-2 p-3">
          <button
            className="bg-[#3b82f6] rounded-md px-2 py-1 text-white shadow-lg flex items-center text-center justify-center w-full lg:w-[10rem]"
            onClick={() => setOpenModal(true)}
          >
            <AiOutlinePlus className=" text-xl" />
            Add ticket
          </button>
          <div className=" w-full lg:w-[30%] flex items-center  px-2 rounded-lg mt-4 self-end border-[1px] bg-[#f5f1f3] border-gray-200 shadow-md ">
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
      </div>
      <div className="mt-4 pb-4 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 bg-[#f5f1f3] p-5 ">
          {getCurrentPageData().map((ticket, id) => (
            <TicketItem
              key={id}
              ticket={ticket}
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
              setShowDetail={setShowDetail}
              setTicketDetail={setTicketDetail}
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
              className=" w-[25px] h-[25px] bg-[#3b82f6] text-white rounded-full flex justify-center items-center"
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
