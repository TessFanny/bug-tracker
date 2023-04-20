import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Layout,
  Register,
  Login,
  Unauthorized,
  Home,
  Projects,
  Bug,
  Admin,
  Missing,
  Dashboard,
  RequireAuth,
  Profile,
  Project
} from "./components";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* public routes */}
      <Route path="/layout" element={loggedIn ? <Layout /> : <Home />}>
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRole={["developer", "admin"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="bug" element={<Bug />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects/project/:id" element={<Project />} />
        </Route>
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
