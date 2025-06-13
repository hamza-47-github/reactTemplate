import "./App.css";
import "./Sidebar.css";

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Componenets/Home";
import AOS from "aos";
import { useEffect, useState } from "react";
import Menu from "./Componenets/Menu";
import ContactUs from "./Componenets/ContactUs";
import Login from "./Componenets/Login";
import Register from "./Componenets/Register";
import AdminDashboard from "./DashboardComponents/AdminDashboard";

import Header from "./Componenets/Header.tsx";
import Footer from "./Componenets/Footer";
import DashboardOrder from "./DashboardComponents/DashboardOrder";
import MenuDashboard from "./DashboardComponents/MenuDashboard";
import MenuForm from "./DashboardComponents/MenuForm";
import ProfileForm from "./DashboardComponents/ProfileForm";
import IngredientsModal from "./DashboardComponents/IngredientsModal";
import Management from "./DashboardComponents/Management";
import DashbordLayout from "./DashboardComponents/DashboardLayout";
import Private from "./PrivateComponent/Private";
import Blog from "./DashboardComponents/Blog";
import BlogList from "./DashboardComponents/BlogList";
import AddtoCart from "./Componenets/AddtoCart";
import SidebarofAddtoCart from "./Componenets/SidebarofAddtoCart";
import OrderMngmnt from "./DashboardComponents/OrderMngmnt";
import Updatemenuform from "./DashboardComponents/Updatemenuform";
import ThankPage from "./Componenets/ThankPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const isAdmindashboardRoute = location.pathname === "/AdminDashboard";
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="App">
      {/* <DashbordLayout> */}
      <ToastContainer/>
      <Routes>
        <Route path="/admin" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
   
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addtocart" element={<AddtoCart />} />
        <Route path="/addcart" element={<SidebarofAddtoCart />} />
        <Route path="/thankpage" element={<ThankPage />} />
        <Route element={<Private />}>
          <Route path="/MenuDashboard" element={<MenuDashboard />} />
          {/* <Route path="/AdminDashboard" element={<AdminDashboard />} /> */}
         
          <Route path="/MenuForm" element={<MenuForm />} />
          {/* <Route path="/updatemenuform" element={<Updatemenuform />} /> */}
          <Route path="/updatemenuform/:id" element={<Updatemenuform />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/ProfileForm" element={<ProfileForm />} />
          <Route path="/OrderDashboard" element={<DashboardOrder />} />
          <Route path="/Addon" element={<IngredientsModal />} />
          <Route path="/OrderManagement/:id" element={<Management />} />
          <Route path="/OrderMngmnt" element={<OrderMngmnt />} />
          <Route path="/BlogList" element={<BlogList />} />
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      {/* </DashbordLayout> */}
    </div>
  );
}

export default App;
