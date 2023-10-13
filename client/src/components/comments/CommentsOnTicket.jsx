import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTextValue,
  addComment,
  getTicketComments,
  deleteComment,
  editComment,
} from "../../features/comments/commentsSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import DeleteComment from "./DeleteComment";
import EditCommentModal from "./EditCommentModal";

const CommentsOnTicket = ({ ticketDetail }) => {
  // initialize items from the store
  const { comments, text } = useSelector((store) => store.comments);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // retreive tickect id
  const ticket_id = ticketDetail.id;

  // edit comment
  const [editingComment, setEditingComment] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // delete comment
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState({});
  

  // function to close the modal
  const closeModal = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };

  // get ticket comments from the redux store base on its id
  useEffect(() => {
    dispatch(getTicketComments(ticket_id));
  }, [ticket_id]);

  // useEffect(() => {
  //   dispatch(changeTextValue(text));
  // }, [editingComment]);

  const handleTextChange = (e) => {
    dispatch(changeTextValue(e.target.value));
    
  };

  // function that handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ text, comment_author_id: user.id, ticket_id }));
    //dispatch(changeTextValue(""));
    e.target.reset();
  };
 
  return (
    <section className=" mt-[5rem]  text-black">
      <form className="" onSubmit={handleSubmit}>
        <label htmlFor="text"></label>
        <div className=" flex  gap-3  flex-col md:flex-row">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="insert your comment here "
            className=" w-full border-2 border-gray-200 outline-none px-2 py-1 rounded-md text-sm capitalize"
            onChange={handleTextChange}
          ></input>
          <button
            type="submit"
            className=" bgGradient px-10 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </form>
      {comments.length === 0 ? (
        "No comment for the moment"
      ) : (
        <div className=" mb-5 mt-4 md:mt-0 ">
          {comments.map((comment, id) => (
            <div className=" border-[1px] px-2 my-1 rounded-md" key={id}>
              <div className=" flex justify-between">
                <p className=" text-[.8rem] font-semibold">{comment.author} </p>
                <span className=" text-[.6rem]">{comment.created_at} </span>
              </div>
              <div>
                <div className=" w-full flex justify-between">
                  <p className=" text-sm">
                    {comment.text.charAt(0).toUpperCase() +
                      comment.text.slice(1)}
                  </p>
                  {user.id === comment.comment_author_id && (
                    <div className=" flex">
                      <button
                        className="h-[32px] w-[32px] flex justify-center items-center active:border-white duration-300"
                        onClick={() => {
                          setEditingComment(comment),setOpenEditModal(true)
                        }}
                      >
                        <FaEdit size="15px" color="#3b82f6" />
                      </button>
                      <button
                        className="h-[32px] w-[32px] flex justify-center items-center active:border-white duration-300"
                        onClick={() => {
                          setOpenDeleteModal(true), setCommentToDelete(comment);
                        }}
                      >
                        <HiOutlineTrash size="15px" color="red" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <EditCommentModal
        comment={editingComment}
        open={openEditModal}
        closeModal={closeModal}
        ticket_id={ticket_id}
        position={modalPosition}
      />
      <DeleteComment
        comment={commentToDelete}
        open={openDeleteModal}
        closeModal={closeModal}
        ticket_id={ticket_id}
        position={modalPosition}
      />
    </section>
  );
};

export default CommentsOnTicket;
