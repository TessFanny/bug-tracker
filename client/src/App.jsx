import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Layout,
  Login,
  Unauthorized,
  Projects,
  MyProjects,
  Missing,
  MyTickets,
  RequireAuth,
  Profile,
  Project,
  Loader,
  TicketDetails,
  Ticket
} from "./components";
import { Admin, Register, Dashboard, Tickets } from "./pages";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/layout" element={<Layout />}>
        <Route element={<RequireAuth allowedRole={["developer", "admin"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tickets" element={<Tickets />} />
          <Route
            path="projects/project/:projectId/ticket/:ticketId"
            element={<TicketDetails />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="projects/project/:id" element={<Project />} />
          <Route
            path="tickets/ticket/:ticketId"
            element={<Ticket/>}
          />
        </Route>
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
