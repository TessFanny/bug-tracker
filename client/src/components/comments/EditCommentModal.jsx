import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  changeTextValue,
  editComment,
} from "../../features/comments/commentsSlice";

const EditCommentModal = ({ closeModal, open, comment, ticket_id, position }) => {
  const dispatch = useDispatch();
  const { comments, text } = useSelector((store) => store.comments);
  const { user } = useSelector((store) => store.user);

 
  const commentToUpdate =
    comment && comments.find((com) => com.id == comment.id);
    useEffect(() => {
        dispatch(changeTextValue(text));
    }, [commentToUpdate]);
    
  
    const handleTextChange = (e) => {
        dispatch(changeTextValue(e.target.value));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editComment({ text, comment_id: comment.id, ticket_id }));
       
        closeModal()
        e.target.reset();
    };
    if (!open) return null;

  return (
    <div
    className=" h-[100%] fixed top-0 left-0 w-[100%] flex justify-center items-center bg-[rgba(.1,.1,.1,.2)]"
    style={{ top: position.top, left: position.left }}
    onClick={closeModal}
    >
      <div
        className=" bg-white w-full mx-5 md:w-[40%] p-6 rounded-lg h-auto shadow-md flex flex-col gap-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center  rounded-md">
          <span className=" font-semibold capitalize">edit comment</span>
          <AiFillCloseCircle className=" cursor-pointer" onClick={closeModal} />
        </div>
        <div>
          
          <form onSubmit={handleSubmit}  className=" flex flex-col md:flex-row gap-2">
            <input
              type="text"
              name="text"
              id="text"
              defaultValue={comment && comment.text}
              className=" w-full border-2 border-gray-200 outline-none px-4 py-1 rounded-md"
              onChange={handleTextChange}
            />
            <button className="bg-blue-400 px-7 rounded-md" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
