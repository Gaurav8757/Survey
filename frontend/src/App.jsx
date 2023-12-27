import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Form from "./components/Forms";
import Login from "./admin_components/Login.jsx";
import ProtectedRoute from "./admin_components/Protected.jsx";
import AdminLayout from "./admin_components/AdminLayout.jsx";
import UserList from "./admin_components/componets/UserList.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      {/* survey routes */}
        <Route path="/" element={< Layout/>} >
        <Route path="" element={< Home/>} />
        <Route path="/surveyform" element={< Form/>} />
          </Route>

{/* admin routes */}
          <Route path="/admin" element={<Login/>}/>

          <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<AdminLayout/>}>
         
          <Route path="/dashboard/userlist" element={<UserList/>}/>
          </Route>
          </Route>
      </>
    ))

  return (
    <>
    
       <RouterProvider router={router} />
       
    </>
  )
}

export default App;
