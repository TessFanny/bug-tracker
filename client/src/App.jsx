import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Layout,
  Register,
  Login,
  Unauthorized,
  Home,
  Dashboard,
  MyProjects,
  Admin,
  Missing,
  MyTickets,
  RequireAuth,
  Profile,
  Project,
  Loading,
} from "./components";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
      <Route path="/layout" element={<Layout />}>
        <Route element={<RequireAuth allowedRole={["developer", "admin"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="tickets" element={<MyTickets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="dashboard/project/:id" element={<Project />} />
          <Route path="projects/project/:id" element={<Project />} />
        </Route>
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
      
    </Routes>
  );
}

export default App;

// <Routes>
// <Route path="" element={<Home />} />
// {loggedIn === undefined ? (
//   // Show a loading state until the user's authentication status is determined
//   <Route path="*" element={<Loading />} />
// ) : loggedIn ? (
//   <Route path="/layout" element={<Layout />}>
//     <Route element={<RequireAuth allowedRole={["developer", "admin"]} />}>
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="projects" element={<MyProjects />} />
//       <Route path="tickets" element={<MyTickets />} />
//       <Route path="profile" element={<Profile />} />
//       <Route path="unauthorized" element={<Unauthorized />} />
//       <Route path="dashboard/project/:id" element={<Project />} />
//     </Route>
//     <Route element={<RequireAuth allowedRole={["admin"]} />}>
//       <Route path="admin" element={<Admin />} />
//     </Route>
//   </Route>
// ) : (
//   <Route path="login" element={<Login />} />
// )}
// <Route path="register" element={<Register />} />

// </Routes>
