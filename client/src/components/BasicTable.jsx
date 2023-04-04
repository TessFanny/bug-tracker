import { useTable } from "react-table";
import { COLUMNS } from "./columns";
//import  {mock_data } from "./mock_data";
import { useMemo } from "react";
import axios from "../utils/axios";
import { useState, useEffect } from "react";

const BasicTable = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await axios
      .get("http://localhost:3000/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
        },
      })
      .catch((error) => console.log(error));
    if (response) {
      const projects = await response.data;
      setProjects(projects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => projects, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default BasicTable;
