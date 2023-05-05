import React from "react";

const CommentsOnTicket = ({ ticketDetail, projectId }) => {
 
  return (
    <section className="px-4 py-7 rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-[50%]">
      
      <form className=" flex flex-col">
        <label htmlFor="comment"> comment</label>
        <div>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="insert your comment here "
          ></input>
        </div>
      </form>
    </section>
  );
};

export default CommentsOnTicket;
