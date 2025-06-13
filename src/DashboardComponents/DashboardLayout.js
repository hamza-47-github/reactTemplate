import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import App from "../App";
import DashboardOrder from "./DashboardOrder";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const DashboardLayout = ({}) => {
  const [isOpen, setisOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setisOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userTypeId");
    navigate("/admin");
  };
  const [collapsed, setCollapsed] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleNotificationClick = () => {
    setNotificationOpen(!isNotificationOpen);
  };
  const [activeLink, setActiveLink] = useState("/OrderDashboard");

  const handleNavLinkClick = (to) => {
    setActiveLink(to);
  };
  useEffect(() => {}, []);

  const menuitem = [
    {
      path: "/OrderDashboard",
      name: "OrderDashboard",
      icon: "fas fa-circle-plus fa-fw ",
    },
    {
      path: "/MenuDashboard",
      name: "MenuDashboard",
      icon: "fas fa-circle-plus fa-fw ",
    },
    {
      path: "/ProfileForm",
      name: "ProfileForm",
      icon: "fas fa-circle-plus fa-fw ",
    },
  ];
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 100,
    bgcolor: "background.paper",

    boxShadow: 14,
  };
  return (
    <>
      <header>
        <nav
          id="sidebarMenu"
          className={`collapse d-lg-block sidebaradmin collapse bg-white ${
            isOpen ? "show" : ""
          }`}
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3  ">
              <a
                aria-current="page"
                className="ps-5 pb-4"
                href="/OrderDashboard"
              >
                <img
                  src="/assests/img/logo.png"
                  className="logo ps-5"
                  alt="Logo"
                ></img>
              </a>

              <Link
                to={"/OrderDashboard"}
                onClick={() => handleNavLinkClick("/OrderDashboard")}
                className={`list-group-item list-group-item-action py-2 ripple ${
                  window.location.pathname === "/OrderDashboard" ? "active" : ""
                }`}
                aria-current="true"
              >
                <i className="fa fa-th-large fa-fw me-3"></i>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/OrderMngmnt"
                className={`list-group-item list-group-item-action py-2 ripple ${
                  window.location.pathname === "/OrderMngmnt" ? "active" : ""
                }`}
                onClick={() => handleNavLinkClick("/OrderMngmnt")}
                aria-current="true"
              >
                <i className="fa-solid fa-calendar-check fa-fw me-3"></i>
                <span>Order Management</span>
              </Link>

              <Link
                to={"/MenuDashboard"}
                className={`list-group-item list-group-item-action py-2 ripple ${
                  window.location.pathname === "/MenuDashboard" ? "active" : ""
                }`}
                onClick={() => handleNavLinkClick("/MenuDashboard")}
              >
                <i className="fa fa-bars fa-fw me-3"></i>
                <span>Menu</span>
              </Link>
              <Link
                to={"/addon"}
                className={`list-group-item list-group-item-action py-2 ripple ${
                  window.location.pathname === "/addon" ? "active" : ""
                }`}
                onClick={() => handleNavLinkClick("/addon")}
              >
                <i className="fa fa-plus fa-fw me-3"></i>
                <span>Add Ons</span>
              </Link>
              {/* <Link
                  to="/Blog"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    window.location.pathname === "/Blog"? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick('/Blog')}
                  aria-current="true"
                >
                  <i className="fa fa-newspaper me-3"></i
                  ><span>Blogs</span>
                </Link> */}

              <Link
                to="/ProfileForm"
                className={`list-group-item list-group-item-action py-2 ripple ${
                  window.location.pathname === "/ProfileForm" ? "active" : ""
                }`}
                onClick={() => handleNavLinkClick("/ProfileForm")}
                aria-current="true"
              >
                <i className="fa fa-cog me-3"></i>
                <span>Settings</span>
              </Link>

              <Link
                onClick={handleOpen}
                to="#"
                className={`list-group-item list-group-item-action py-2 ripple 
                  `}
                aria-current="true"
              >
                <i className="fa fa-power-off  me-3"></i>
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </nav>
        <nav
          id="main-navbar"
          style={{ backgroundColor: "#F9F8F9" }}
          className="colorsidebar navbar navbar-expand-lg  justify-content-start"
        >
          <div className="">
            <button
              className="navbar-toggler"
              onClick={toggle}
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 369, height: 230 }} className="">
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleClose}
                className="pe-3 "
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>
            <div className="addon logout px-4">
              <p className="py-3 px-5">Logout?</p>
            </div>
            <div className="py-5 px-5">
              <p className="px-4">Are you sure want to logout?</p>
            </div>
            <form className="addons-form ">
              <div className="d-flex">
                <div className=" px-5">
                  <div className=" ps-4 pe-2 ">
                    <button
                      type="submit"
                      onClick={handleClose}
                      className="logout-btn btn "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="pe-4">
                  <div className="">
                    <button
                      type="submit"
                      onClick={handleLogout}
                      className="btn btn-danger savebtn"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </header>
    </>
  );
};

export default DashboardLayout;
