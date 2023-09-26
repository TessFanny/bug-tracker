// import { useState, useEffect } from "react";
// import axios from "../utils/axios";
// const Users = () => {
//   const [users, setUsers] = useState();
//   const [errMsg, setErrMsg] = useState("");
//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await axios.get("/users", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
//           },
//         });
//         console.log(response.data);
//         setUsers(response.data);
//       } catch (error) {
//         if (!error?.response) {
//           setErrMsg("no server response");
//         } else if (error?.response?.status === 404) {
//           setErrMsg(" not found");
//         } else if (error?.response?.status === 401) {
//           setErrMsg("Unauthorized");
//         } else {
//           setErrMsg("login failed");
//         }
//       }
//     };
//     getUsers();
//   }, []);
//   return (
//     <article>
//       <h2>Users List</h2>
//       {users?.length ? (
//         <ul>
//           {users.map((user, i) => (
//             <li key={i}>
//               {user?.firstname} {user?.lastname}{" "}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
//       )}
//     </article>
//   );
// };

// export default Users;
