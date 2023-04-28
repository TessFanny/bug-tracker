import React from "react";
import AddContributorsModal from "./AddContributorsModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TickectsList from "../tickets/TicketsList";

import ShowContributors from "./ShowContributors";

const Project = () => {
  const projectId = useParams().id;
  const [openModal, setOpenModal] = useState(false);
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
    <div className=" w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1 text-gray-900">
      <div>
        <h2>PROJECT </h2>
        <h3> {project.title}</h3>
      </div>
      <div className=" flex">
        <div>
          <ShowContributors
            projectId={projectId}
            setOpenModal={setOpenModal}
            project={project}
          />

          <AddContributorsModal open={openModal} closeModal={closeModal} projectId={projectId} />
        </div>
        <div>
          <TickectsList projectId={projectId}/>
        </div>
      </div>
    </div>
  );
};

export default Project;
