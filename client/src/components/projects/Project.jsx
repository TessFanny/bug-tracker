import React from "react";
import AddContributorsModal from "./AddContributorsModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TickectsList from "../tickets/TicketsList";

import ShowContributors from "./ShowContributors";
import TicketDetails from "../tickets/TicketDetails";
import CommentsOnTicket from "../comments/CommentsOnTicket";

const Project = () => {
  const projectId = useParams().id;
  const [openModal, setOpenModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({});
  const closeModal = () => {
    setOpenModal(false);
  };
  const [project, setProject] = useState({});
  useEffect(() => {
    async function fetchProject() {
      const response = await fetch(
        `http://localhost:3000/api/project/${projectId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        }
      );
      const projectData = await response.json();
      setProject(projectData);
    }
    fetchProject();
  }, [projectId]);
  

  return (
    <div className=" w-full mt-4 pb-4  px-4 flex-1 text-gray-900 overflow-hidden">
      <div>
        <h2 className=" text-white">TICKETS</h2>
        <h3 className=" text-white"> {project.title} Project</h3>
      </div>
      <div className="flex  gap-5 mt-5">
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
        <div className=" w-full">
          <TickectsList
            projectId={projectId}
            setShowDetail={setShowDetail}
            setTicketDetail={setTicketDetail}
            project={project}
          />
        </div>
      </div>
      <div>
      {showDetail && <div className="w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 text-gray-900 ">
      <h2 className=" pt-2 text-blue-500 mb-3">Selected Ticket details</h2>
      <div className="flex gap-3">
        { <TicketDetails ticketDetail={ticketDetail}  projectId={projectId}/>}
        <CommentsOnTicket ticketDetail={ticketDetail}  projectId={projectId}/>
      </div>
    </div>}
        
      </div>
    </div>
  );
};

export default Project;
