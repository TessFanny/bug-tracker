import React from "react";

const Project = ({
  id,
  title,
  description,
  created_at,
  updated_at,
  author,
}) => {
  return (
    <div className=" bg-white shadow-md rounded-md  text-gray-900">
      <div className=" w-full border-b-[1px] p-4">
        <h3>title </h3>
        <p>{title} </p>
      </div>
      <div className=" p-4">
        <p>{description} </p>
        <p>{created_at} </p>
        <p>{updated_at} </p>
        <p>{author} </p>
      </div>
      <div className=" p-4">
        <button className=" mr-[.5rem] text-[#0f5132] bg-[#d1e7dd]  px-5 rounded-md">
          Edit
        </button>
        <button className=" text-[#842029] bg-[#f8d7da]  px-5 rounded-md ">
          delete
        </button>
      </div>
    </div>
  );
};

export default Project;
