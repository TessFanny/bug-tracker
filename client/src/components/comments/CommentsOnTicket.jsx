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

const CommentsOnTicket = ({ ticketDetail, projectId }) => {
  const { comments, text } = useSelector((store) => store.comments);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const ticket_id = ticketDetail.id;
  const [editingComment, setEditingComment] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(getTicketComments(ticket_id));
  }, [ticket_id]);

  useEffect(() => {
    dispatch(changeTextValue(text));
  }, [isEditing]);

  const handleTextChange = (e) => {
    dispatch(changeTextValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ text, comment_author_id: user.id, ticket_id }));
    dispatch(changeTextValue(""));
    e.target.reset()
  };

  return (
    <section className="px-4 py-7 rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-[50%]">
      {comments.length === 0 ? (
        "No comment for the moment"
      ) : (
        <div className=" mb-5 ">
          {comments.map((comment, id) => (
            <div className=" shadow-lg p-4 my-1 rounded-md" key={id}>
              <div className=" flex justify-between">
                <p className=" text-[.8rem] font-semibold">{comment.author} </p>
                <span className=" text-[.6rem]">{comment.created_at} </span>
              </div>
              <div>
                {editingComment && editingComment.id === comment.id ? (
                  <div className=" flex gap-2">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      defaultValue={comment.text}
                      className=" w-full border-2 border-gray-200 outline-none px-4 py-1 rounded-md"
                      onChange={handleTextChange}
                    />
                    <button
                      className="bg-blue-400 px-7 rounded-md"
                      onClick={() => {
                        dispatch(
                          editComment({
                            text,
                            comment_id: comment.id,
                            ticket_id,
                          })
                        );
                        setEditingComment(null);
                        //setEditedText("");
                      }}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div className=" w-full flex justify-between">
                    <p>
                      {comment.text.charAt(0).toUpperCase() +
                        comment.text.slice(1)}
                    </p>
                    {user.id === comment.comment_author_id && (
                      <div className=" flex">
                        <button
                          className="h-[32px] w-[32px] flex justify-center items-center active:border-white duration-300"
                          onClick={() => {
                            setEditingComment(comment), setIsEditing(true);
                          }}
                        >
                          <FaEdit size="15px" color="#3b82f6" />
                        </button>
                        <button
                          className="h-[32px] w-[32px] flex justify-center items-center active:border-white duration-300"
                          onClick={() => {
                            setOpenDeleteModal(true),
                              setCommentToDelete(comment);
                          }}
                        >
                          <HiOutlineTrash size="15px" color="red" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <form className=" flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="text"></label>
        <div className=" flex gap-6 pr-3">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="insert your comment here "
            className=" w-full border-2 border-gray-200 outline-none px-4 py-1 rounded-md"
            onChange={handleTextChange}
          ></input>
          <button type="submit" className=" bg-blue-400 px-7 rounded-md">
            Add
          </button>
        </div>
      </form>
      <DeleteComment
        comment={commentToDelete}
        open={openDeleteModal}
        closeModal={closeModal}
        ticket_id={ticket_id}
      />
    </section>
  );
};

export default CommentsOnTicket;
