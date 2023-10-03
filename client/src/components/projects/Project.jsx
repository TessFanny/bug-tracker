import React from "react";
import AddContributorsModal from "./AddContributorsModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TickectsList from "../tickets/TicketsList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShowContributors from "./ShowContributors";
import TicketDetails from "../tickets/TicketDetails";
import CommentsOnTicket from "../comments/CommentsOnTicket";

const Project = () => {
  const { projects } = useSelector((state) => state.projects);
  const projectId = useParams().id;
  const [openModal, setOpenModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({});
  
  const closeModal = () => {
    setOpenModal(false);
  };
  //const [project, setProject] = useState({});

  const project = projects.find((project) => project.id == projectId);

  return (
    <div className=" mt-[8rem] w-full h-full lg:p-5 ">
      <div className=" grid ">
        <div className="grid lg:grid-cols-2 gap-3 ">
          <div className="bg-white shadow-lg rounded-lg min-w-fit lg:min-w-full max-w-sm ">
            <div className=" p-3 w-full flex justify-between border-b rounded-t-lg capitalize transition duration-300 ease-in-out">
              <h2 className=" text-md  hover:text-black">
                {project.title.charAt(0).toUpperCase() + project.title.slice(1)}
              </h2>
              <div className="">
                <h3 className="text-sm text-black"> Author :</h3>
                <p
                  className="text-[.8rem] text-gray-500 "
                  data-title="Project author"
                >
                  {project.author}
                </p>
              </div>
            </div>

            <p
              className=" text-left p-3 text-sm text-gray-700 w-[100%]"
              data-title="Description"
            >
              {project.description.charAt(0).toUpperCase() +
                project.description.slice(1)}
            </p>

            <div className=" p-3 text-sm text-gray-700 flex justify-between items-center">
              <p
                className=" p-3 text-[.7rem] text-black  font-semibold"
                data-title="Created_at"
              >
                {project.created_at}
              </p>
            </div>
          </div>
          <div>
            <ShowContributors
              projectId={projectId}
              setOpenModal={setOpenModal}
              project={project}
            />
            <AddContributorsModal
              open={openModal}
              closeModal={closeModal}
              projectId={projectId}
            />
          </div>
        </div>

        <TickectsList
          projectId={projectId}
          setShowDetail={setShowDetail}
          setTicketDetail={setTicketDetail}
        />
      </div>

      <div>
        {showDetail && (
          <div className="w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 text-gray-900 ">
            <h2 className=" pt-2 text-blue-500 mb-3">
              Selected Ticket details
            </h2>
            <div className="flex gap-3">
              {
                <TicketDetails
                  ticketDetail={ticketDetail}
                  projectId={projectId}
                />
              }
              <CommentsOnTicket
                ticketDetail={ticketDetail}
                projectId={projectId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
