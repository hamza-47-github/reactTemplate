import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import SidebarofAddtoCart from "./SidebarofAddtoCart";
import { useDispatch, useSelector } from "react-redux";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../Redux/Store';
const Header = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [header, setHeader] = useState("no-background");
  const [image, setImage] = useState("/favicon1.svg");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  // const [counter, setcounter] = useState(0);
  const dispatch = useDispatch()
  const storedDataJSON = localStorage.getItem("cartData");
  const storedData = storedDataJSON ? JSON.parse(storedDataJSON) : [];
  const counter = useSelector((state: RootState) => state.product.productList);
  const listenScrollEvent = (event) => {
    if (window.scrollY <= 0) {
      return setHeader("no-background"), setImage("/favicon1.svg");

    } else if (window.scrollY > 0) {
      return setHeader(""), setImage("/assests/img/assetlogo.png");

    }
  };
  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: isScrolled ? "#fff" : "transparent",
    color: isScrolled ? "#000" : "#fff",
    // transition: "background-color 0.3s ease",
    zIndex: 1000,
    height: isScrolled ? "125px" : "150px",
  };
  // const handleResize = () => {
  //   const screenWidth = window.innerWidth;
  //   const shouldSetSmallScreen = screenWidth <= 640; 
  //   const shouldSetMediumScreen = screenWidth > 640 && screenWidth <= 1030;
  //   setIsSmallScreen(shouldSetSmallScreen);
  // };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 998); // Adjust the threshold as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 0; // Adjust this value based on when you want the navbar to become fixed

      setIsScrolled(shouldBeScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = `top-0 left-0 right-0 z-40 navbar white navbar-default fixed pt-0 navbar-fixed bootsnav brand-center center-side ${header}`;
  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleCloseCartModal = () => {
    // localStorage.removeItem("cartData");
    setIsCartOpen(false);
  };

  return (
    <>
      <header id="">
        <nav style={navbarStyle} className={navbarClasses}>
          <div className="">
            <div className="navbar-header">
              <div className="mobile-header ">
                <div className="d-flex justify-content-between align-items-center ">
                  <button
                    button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#navbar-menu"

                  >
                    <FontAwesomeIcon
                      icon={constants.faBars}
                      style={{ color: "black" }}
                    />
                  </button>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div>
                    <NavLink className="navbar-brand " to="/">
                      <img
                        src="/assests/img/assetlogo.png"
                        className="logos log-sm"
                        alt="Logo sm"

                      />
                    </NavLink>
                  </div>

                  <div className="pt-1">
                    <NavLink onClick={toggleCartModal}>
                      {isSmallScreen ? (
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          style={{
                            color: '#E7272D',
                            height: '20px',
                            position: 'relative'
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          style={{
                            color: isScrolled ? "#E7272D" : "#fff",
                            height: '20px',
                            position: 'relative'
                          }}
                        />
                      )}
                      {isSmallScreen ? (<>  {counter && counter.length > 0 && (
                        <span className="" style={{ position: 'relative', color: '#E7272D', top: '-13px' }}>{counter.length}</span>
                      )}</>) : (<>
                        {counter && counter.length > 0 && (
                          <span className="item-count">{counter.length}</span>
                        )}
                      </>)

                      }

                    </NavLink>
                  </div>

                </div>


              </div>

              <button
                button
                type="button"
                className="navbar-toggle btn-none-1 log-sm"
                data-toggle="collapse"
                data-target="#navbar-menu"
                style={{ paddingTop: '20px' }}

              >
                <FontAwesomeIcon
                  icon={constants.faBars}
                  style={{ color: "black" }}
                />
              </button>

              {isSmallScreen || isMediumScreen ? (
                <div className="logo-med-screen">
                  <NavLink className="navbar-brand" to="/">
                    <img
                      src="/assests/img/assetlogo.png"
                      className="logos log-sm btn-none-1  logo-imgs"
                      alt="Logo sm"

                    />
                  </NavLink>
                </div>

              ) : (

                <NavLink className="navbar-brand" to="/">
                  <img
                    src={image}
                    className="logo ps-5"
                    alt="Logo"
                    width={isScrolled ? "180px" : "180px"}
                  />

                </NavLink>
              )}
              <div className="phone-view" >
                <div className="phone-view2" >
                  <>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      style={{
                        color: "#E7272D",
                        height: '20px',
                        position: 'relative'
                      }}
                    >
                      <sup>
                        {counter && counter.length > 0 && (
                          isSmallScreen ? (
                            <span style={{ position: 'relative', color: '#E7272D', top: '-13px' }}>
                              {counter.length}
                            </span>
                          ) : (
                            <span className="item-count">
                              {counter.length}
                            </span>
                          )
                        )}
                      </sup>
                    </FontAwesomeIcon>


                  </>

                </div>

              </div>
            </div>
            <div className="collapse navbar-collapse" id="navbar-menu">
              <div className="row">
                <div className="col-half ">
                  <ul className="nav navbar-nav" data-in="#" data-out="#">
                    <li className="dropdown active ">
                      <NavLink className="active active link-no-underline" to="/">
                        Home
                      </NavLink>
                    </li>

                    <li className="dropdown active">
                      <NavLink to="/contact" className="active active link-no-underline">contact</NavLink>
                    </li>
                    {/* <li className="dropdown">
                      <NavLink
                        to="/menu"
                        className=" active"
                        data-toggle="dropdown"
                      >
                        Menus
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
                <div className="col-half ">
                  <ul className="nav navbar-nav" data-in="#" data-out="#">
                    {/* <li className="dropdown">

                                            <NavLink to='/register' className="active " data-toggle="dropdown">Register</NavLink>

                                        </li> */}
                    <li className="dropdown active link-no-underline">

                      <NavLink to='/menu' className="active active link-no-underline">
                        Menu
                      </NavLink>
                    </li>

                    <li className="dropdown active counter-btn">
                      <NavLink onClick={toggleCartModal}>
                        {isSmallScreen ? (
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{
                              color: '#E7272D',
                              height: '20px',
                              position: 'relative'
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{
                              color: isScrolled ? "#E7272D" : "#fff",
                              height: '20px',
                              position: 'relative'
                            }}
                          />
                        )}
                        {isSmallScreen ? (<>  {storedData && storedData.length > 0 && (
                          <span className="counter-btn" style={{ position: 'relative', color: '#E7272D', top: '-13px' }}>{storedData.length}</span>
                        )}</>) : (<>
                          {storedData && storedData.length > 0 && (
                            <span className="item-count counter-btn">{storedData.length}</span>
                          )}
                        </>)

                        }

                      </NavLink>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <SidebarofAddtoCart
        isSidebarOpen={isCartOpen}
        onClose={handleCloseCartModal}

      />
    </>
  );
};

export default Header;
