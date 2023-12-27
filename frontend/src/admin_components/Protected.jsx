import { Navigate, Outlet } from "react-router-dom";
const ProtectRoute = () => {
  let auth = sessionStorage.getItem('token');
  if (auth !== undefined && auth?.length > 0) {
    return <Outlet />
  } else {
    return <Navigate to="/admin" />
  }
}
export default ProtectRoute;