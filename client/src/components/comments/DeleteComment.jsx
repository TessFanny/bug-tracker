
import { useSelector, useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { deleteComment } from '../../features/comments/commentsSlice';

const DeleteComment = ({closeModal, open, comment, ticket_id, position }) => {
    const dispatch = useDispatch();
    const { comments} = useSelector(store => store.comments)

    const commentToDelete = comments.find((com => com.id == comment.id))
    if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteComment({comment_id: commentToDelete.id , ticket_id }))
    closeModal()
  };

  return (
    <div
    className=" h-[100%] fixed top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
    style={{ top: position.top, left: position.left }}
    onClick={closeModal}
    >
      <div
        className=" bg-white md:w-[40%] p-6 rounded-lg h-auto shadow-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold">Delete comment</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <div>
          <p>Do you really want to delete this comment?</p>
          <div className="flex justify-between mt-2">
          <form onSubmit={handleSubmit} >
            <button
              type="submit"
              className="  text-[#842029] bg-[#f8d7da]  px-5 rounded-md"
            >
              Delete
            </button>
          </form>
          <button
            className="mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default DeleteComment