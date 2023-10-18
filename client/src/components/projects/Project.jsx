import React from "react";
import AddContributorsModal from "./AddContributorsModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TickectsList from "../tickets/TicketsList";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ShowContributors from "./ShowContributors";
import TicketDetails from "../tickets/TicketDetails";
import CommentsOnTicket from "../comments/CommentsOnTicket";
import Loader from "../Loader";
import { getAllProjects } from "../../features/projects/projectSlice";

const Project = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const projectId = useParams().id;
  const [openModal, setOpenModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({});
  const dispatch = useDispatch();
  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [projectId]);
  //const [project, setProject] = useState({});

  const project = projects.find((project) => project.id == projectId);

  return (
    <section className=" mt-[8rem] w-full h-full lg:p-5 ">
      {project ? (
        <div className=" grid ">
          <div className="grid lg:grid-cols-2 gap-3 ">
            <div className=" bg-white shadow-lg rounded-lg min-w-fit lg:min-w-full max-w-sm relative flex items-center flex-col max-h-[15rem]">
              <div className=" bgGradient shadow-md rounded-sm absolute top-[-1rem] w-[95%] p-2 text-whiteborder-b capitalize transition duration-300 ease-in-out text-white">
                <h2 className=" text-md  hover:text-black">
                  {project.title.charAt(0).toUpperCase() +
                    project.title.slice(1)}
                </h2>
                <button
                  className=" underline text-sm"
                  onClick={() => navigate(-1)}
                >
                  Back to list
                </button>
              </div>
              <div className=" mt-12 text-left p-5 ml-6 text-sm text-gray-700 w-[100%]">
                <h3 className=" font-semibold capitalize">
                  Project description
                </h3>
                <p className=" text-sm ">
                  {project.description.charAt(0).toUpperCase() +
                    project.description.slice(1)}
                </p>
              </div>
              <div className=" text-left ml-6  px-5 pb-2 text-sm text-gray-700 w-[100%]">
                <h3 className=" font-semibold capitalize">Project submitter</h3>
                <p className=" text-sm">
                  {project.author.charAt(0).toUpperCase() +
                    project.author.slice(1)}
                </p>
              </div>
            </div>

            <div className=" ">
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
      ) : (
        <Loader />
      )}

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
              <CommentsOnTicket ticket={ticket} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
