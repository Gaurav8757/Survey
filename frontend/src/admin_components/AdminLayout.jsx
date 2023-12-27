import {Outlet} from "react-router-dom";
import Sidebar from "../admin_components/componets/Sidebar.jsx";
function AdminLayout() {
    return (
      <>
      <Sidebar/>
        <Outlet />
      </>
    );
  }
  
  export default AdminLayout;