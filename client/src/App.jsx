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
  Profile
} from "./components";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/layout" element={<Layout />}>
        {/* public routes */}

        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRole={["developer", "admin"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project" element={<Projects />} />
          <Route path="bug" element={<Bug />} />
          <Route path="profile" element={<Profile />} />
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
