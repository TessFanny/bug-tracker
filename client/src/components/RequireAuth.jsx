import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";



const RequireAuth = ({allowedRole}) => {

    const { auth} = useAuth();
    const location = useLocation();
  return (
      allowedRole.includes(auth?.role)
        ? <Outlet /> 
        : auth?.email
            ? <Navigate to="/layout/unauthorized" state={{from: location}} replace/>
            : <Navigate to="/login" state={{from: location}} replace/>
  );
}

export default RequireAuth