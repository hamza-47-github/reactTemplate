import { Outlet } from "react-router-dom";
import App from "../App";
import Login from "../Componenets/Login";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
const Private = () => {
 const userType=localStorage.getItem('userTypeId');
 if(userType==='2'){
return <Outlet/>
 }else{
    return <Login/>
 }
}

export default Private