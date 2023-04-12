import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllContributors } from "../../features/projects/projectSlice";
import { useEffect } from "react";

const ShowContributors = ({ newProject, projectId, contributors }) => {
 

  return (
    <div className="w-full mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1 ">
    <div className="shadow-lg overflow-auto pt-4">
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
                
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-100 ">
              {contributors.map((contributor) => (
                <tr key={contributor.id}>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    
                      {contributor.contributor}
                    
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {contributor.email}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                    {contributor.role}
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
