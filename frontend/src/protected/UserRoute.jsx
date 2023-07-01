import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user ? <Outlet /> : <Navigate to="/login" />;
};
export default UserRoute;
