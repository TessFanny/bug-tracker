import { useSelector, useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { deleteTicket } from "../../features/tickets/ticketsSlice";

const DeleteTicket = ({ closeModal, open, projectId, ticket }) => {
    const dispatch = useDispatch();
    const { tickets} = useSelector(store => store.tickets)

    const ticketToDelete = tickets.find((tick => tick.id == ticket.id))
    if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTicket({ticket_id :ticketToDelete.id , project_id: projectId }))
    closeModal()
  };

  return (
    <div
      className=" h-[100vh] absolute top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
      onClick={closeModal}
    >
      <div
        className=" bg-white w-[40%] p-6 rounded-lg h-auto shadow-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold">Delete {ticket.title}</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <div>
          <p>Do you really want to delete this ticket?</p>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md"
            >
              Delete
            </button>
          </form>
          <button
            className=" mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTicket;
