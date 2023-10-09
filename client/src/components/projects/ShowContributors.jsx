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
    <div className=" mt-6 md:mt-0 bg-white rounded-md shadow-md px-4 py-2 flex flex-col relative items-center ">
      <div className=" bgGradient shadow-md rounded-sm absolute top-[-1rem] w-[95%] p-3 text-white flex justify-between">
        <div className="">
          <h3 className=" capitalize">Assigned users </h3>
          <p className=" text-xs md:text-sm">
            Current users working on this projects
          </p>
        </div>
        <button
          className=" bg-white opacity-30 rounded-md px-2 text-black mt-3 h-8 text-sm font-bold hover:opacity-100"
          onClick={() => setOpenModal(true)}
        >
          New Member
        </button>
      </div>
      <div className=" mt-10 pt-4 w-full">
        <table className=" w-full max-h-10 overflow-auto">
          <thead className=" bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <td className=" px-3 text-sm font-semibold tracking-wide text-left">
                Name
              </td>

              <td className="  px-3 text-sm font-semibold tracking-wide text-left">
                Role
              </td>
              <td className="w-40 px-3 text-center text-sm font-semibold tracking-wide capitalize">
                Remove member
              </td>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-100 ">
            {contributors.map((contributor, index) => (
              <tr key={index}>
                <td className=" px-3 text-sm text-gray-700 whitespace-nowrap">
                  {contributor.contributor.charAt(0).toUpperCase() +
                    contributor.contributor.slice(1)}
                </td>

                <td className=" px-3 text-sm text-gray-700 whitespace-nowrap">
                  {contributor.role.charAt(0).toUpperCase() +
                    contributor.role.slice(1)}
                </td>
                <td className=" w-40 px-3 text-sm font-semibold tracking-wide text-center relative ">
                  <button
                    onClick={() => handleRemoveMemberClick}
                    className="h-[32px] w-[32px] active:border-white duration-300"
                  >
                    <HiOutlineTrash size={20} color="red" />
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
