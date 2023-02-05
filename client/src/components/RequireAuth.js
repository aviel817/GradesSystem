import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function getFromLocation(location)
{
    if (location === '/logout')
    {
        location.state.from = '/'
        location.reload(); 
        //return location
    }
    else
    {
        return location
    }
}

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('location: '+ location)
    return (
        auth?.id
            ? <Outlet />
            : <Navigate to="/login" state={{ from: getFromLocation(location) }} replace />
    )
};

export default RequireAuth;