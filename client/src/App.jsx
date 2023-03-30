import { Routes, Route } from "react-router-dom";
import {
  Layout,
  Register,
  Login,
  Unauthorized,
  Home,
  Project,
  Bug,
  Admin,
  Missing,
  Dashboard,
  RequireAuth,
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
          <Route path="project" element={<Project />} />
          <Route path="bug" element={<Bug />} />
        </Route>
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
          <Route path="admin" element={<Admin />} />          
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
