import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRole }) => {
  const { user } = useSelector((store) => store.user);
  //const { auth} = useAuth();
  const location = useLocation();
  return allowedRole.includes(user?.role) ? (
    <Outlet />
  ) : user?.email ? (
    <Navigate to="/layout/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
