import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
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
 const handleClick = (index)=>{
  setActiveIndex(index)
  setIsDropdownOpen(!isDropdownOpen)
 }

  return (
    <div className=" mt-6 p-4 bg-slate-200 rounded-md shadow-md px-4 flex-1 flex flex-col ">
      <div className=" flex  justify-between">
        <h3>Team members</h3>
        <button
          className=" bg-[#3b82f6] rounded-md px-1 py-1 text-white text-sm  flex items-center"
          onClick={() => setOpenModal(true)}
        >
          New Member
        </button>
      </div>
      <div className="shadow-lg overflow-auto pt-4 w-full">
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
                    onClick={()=> handleClick(index)}
                    className="h-[32px] w-[32px] rounded-full bg-white  border-transparent shadow-lg flex justify-center items-center active:border-white duration-300"
                  >
                    <HiEllipsisVertical size="25px" />
                  </button>
                  {isDropdownOpen && (
                    <div className={activeIndex === index ? 'active' : 'none'}>
                      <button onClick={handleRemoveMemberClick}>Remove Member</button>
                      
                    </div>
                  )}
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
