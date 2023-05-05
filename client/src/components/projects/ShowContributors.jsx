import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { getAllContributors } from "../../features/projects/projectSlice";
import { useEffect } from "react";

const ShowContributors = ({ projectId, setOpenModal, project }) => {
  const { contributors } = useSelector((store) => store.projects);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    // setAllProjects(...projects)
    dispatch(getAllContributors(projectId));
  }, [projectId]);

  const handleRemoveMemberClick = () => {};
  return (
    <div className="p-4 bg-white rounded-md shadow-md px-4 flex flex-col ">
      <div className=" flex  justify-between">
        <h3>Team members</h3>
        <button
          className=" bg-[#3b82f6] rounded-md px-1 py-1 text-white text-sm  flex items-center"
          onClick={() => setOpenModal(true)}
        >
          New Member
        </button>
      </div>
      <div className="overflow-auto pt-4 w-full">
        <table className=" w-full  ">
          <thead className=" bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </td>
              <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </td>
              <td className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                Role
              </td>
              <td className="w-20 p-3 text-sm font-semibold tracking-wide text-left"></td>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-100 ">
            {contributors.map((contributor, index) => (
              <tr key={index}>
                <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                  {contributor.contributor}
                </td>
                <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                  {contributor.email}
                </td>
                <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                  {contributor.role}
                </td>
                <td className="w-20 p-3 text-sm font-semibold tracking-wide text-left relative">
                  <button
                    onClick={() => handleRemoveMemberClick}
                    className="h-[32px] w-[32px] flex justify-center items-center active:border-white duration-300"
                  >
                    <HiOutlineTrash size="25px" color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowContributors;
