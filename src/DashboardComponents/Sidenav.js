import React, {useState} from 'react';
import {Nav, NavItem, NavDropdown, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarText} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
const Sidenav = () => {
 
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const handleToggle = () => setCollapsed(!collapsed);
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
  
  
  return (
    <>
    <div className='container-fluid'>

    </div>
    
    <div id="sidebar-menu" className="sideBarMenuContainer">
        {/* <Navbar fluid className ="sidebar sidebar-menu sidebar-menu-hide-md sidebar-menu-expand-lg show sidebar-menu-dark " inverse style ={{backgroundColor:"grey"}}>
        <NavbarToggle onClick={handleToggle} aria-controls="sidebarMenu" style={{color:"black"}} className='text-black' />
        <nav
          id="sidebarMenu"
          className={`d-lg-block sidebar bg-white ${collapsed ? 'collapse' : ''}`}
          aria-expanded={!collapsed}
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">

              <a aria-current="page" className="navbar-brand active logopadding" href="/">
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
                ><span>Logout</span>
              </a>
            </div>
          </div>
        </nav>
        </Navbar> */}
            
        </div>
        </>
  )
}

export default Sidenav