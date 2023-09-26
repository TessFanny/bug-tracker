import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Layout,
  Register,
  Login,
  Unauthorized,  
  Dashboard,
  MyProjects,
  Admin,
  Missing,
  MyTickets,
  RequireAuth,
  Profile,
  Project,
  Loader
} from "./components";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/register" element={<Register />} />
      <Route path="/layout" element={<Layout />}>
        <Route element={<RequireAuth allowedRole={["developer", "admin"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="tickets" element={<MyTickets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="dashboard/project/:id" element={<Project />} />
          <Route path="projects/project/:id" element={<Project />} />
          <Route path="tickets/project/:id" element={<Project />} />
        </Route>
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
      
    </Routes>
  );
}

export default App;

