import { Component, React, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { BrowserRouter as Link } from "react-router-dom";
import App from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as constants from '@fortawesome/free-solid-svg-icons'
import ProfileForm from './ProfileForm'
import MenuForm from './MenuForm';
import MenuDashboard from './MenuDashboard';
import DashboardOrder from './DashboardOrder';
import IngredientsModal from './IngredientsModal';
import Management from './Management';

const Sidebar = () => {
  const navigate = useNavigate();


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

 
    const [activeLink, setActiveLink] = useState('/OrderDashboard');
  
    const handleNavLinkClick = (to) => {
      setActiveLink(to);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('userTypeId');
      navigate('/admin');

    };

  return (
    <>

      <header>
        <nav
          id="sidebarMenu"
          className={`d-lg-block sidebar bg-white ${collapsed ? 'collapse' : ''}`}
          aria-expanded={!collapsed}
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">

              <a aria-current="page" className="navbar-brand active" href="/">
                <img src="/assests/img/logo.png" className="logo ps-5" alt="Logo"></img>

              </a>

              <NavLink
                to="/OrderDashboard"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/OrderDashboard' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/OrderDashboard')}
                aria-current="true"
                
              >
                <i className="fa fa-th-large fa-fw me-3"></i>
                <span >
                  Dashboard
                </span>
              </NavLink>

              <NavLink
                to="/MenuDashboard"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/MenuDashboard' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/MenuDashboard')}
              >
                <i className="fa fa-bars fa-fw me-3"></i>
                <span>Menu</span>
              </NavLink>

              <NavLink
                to="/OrderManagement"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/OrderManagement' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/OrderManagement')}
                aria-current="true"
              >
                <i className="fa-solid fa-calendar-check fa-fw me-3"></i
                ><span>Order Management</span>
              </NavLink>

              <NavLink
                to="/ProfileForm"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/ProfileForm' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/ProfileForm')}
                aria-current="true"
              >
                <i className="fa fa-cog me-3"></i
                ><span>Settings</span>
              </NavLink>

              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="fa fa-power-off  me-3"></i
                ><span onClick={handleLogout}>Logout</span>
              </a>
            </div>
          </div>
        </nav>

      </header>
      {/* <main style={{ backgroundColor: "#F9F8F9" }} >
        <ProfileForm/>
        <MenuForm />
        <MenuDashboard/>
        <DashboardOrder/>

        <Management/>
      </main> */}
    </>
  );
};

export default Sidebar;
