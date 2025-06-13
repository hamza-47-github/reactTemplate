import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import AddtoCart from "./AddtoCart";
import ViewCart from "./ViewCart";
import Header from "./Header.tsx";
import Footer from "./Footer";
import { Chip } from "primereact/chip";
import TabList from "./TabList";
import ProgressSpinnerLo from "../ProgressSpinner/ProgressSpinnerLo";
import { useLocation } from 'react-router-dom';
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { useParams } from 'react-router-dom';
const Menu = () => {
  const { id } = useParams();
  const currentLocation = useLocation();
  const [activeCategory, setActiveCategory] = useState("*");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorymenu, setCategoryMenu] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [menudetail, setMenuDetails] = useState([]);
  const [addondetails, setAddonDetails] = useState({});
  const [menu, setmenu] = useState([]);
  const [activeLink, setActiveLink] = useState(0);
  const [categoryid, setcategoryid] = useState(1);
  const [modalloading, setModalloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

    // const queryParams = new URLSearchParams(currentLocation.search);
    // const targetId = queryParams.get('id');
    const targetIdNumbere = parseInt(id);
    if (targetIdNumbere) {
      menuData(targetIdNumbere);
      setcategoryid(targetIdNumbere)
      setSelectedCategoryId(targetIdNumbere)
    }
    else {
      menuData(1);
    }
  }, [currentLocation]);
  // useEffect(() => {
  //   if (selectedCategoryId !== null) {
  //     menuData(selectedCategoryId);
  //   }
  // }, [selectedCategoryId]);

  const fetchData = () => {
    fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/EnableCategoryList"
    )
      .then((response) => response.json())
      .then((data) => {
        const firstCategoryId = data.length > 0 ? data[0].id : null;
        setSelectedCategoryId(firstCategoryId);
        setCategories(data);
      });
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    menuData(categoryId);
  };


  const menuData = async (categoryId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/GetCategoryEnableMenu?cat=${categoryId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCategoryMenu(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setError(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  const [modalopen, setmodalopen] = useState(false);
  const [desce, setDesc] = useState("");
  const openModal = (menuId, desc) => {
    fetchMenuDetails(menuId);
    setmodalopen(true);
    setModalShow(true)
    setDesc(desc);
  };
  const closeModal = () => {
    setmodalopen(false);
  };
  const fetchMenuDetails = (menuId) => {
    fetch(
      `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Cart/GetCartMenu?menuId=${menuId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const MenuDetail = data.find(
          (p) => p.addonName === null && p.addonsId === null
        );
        const addondetails = data.filter(
          (p) => p.addonName !== null && p.addonsId !== null
        );

        setMenuDetails(MenuDetail);
        setAddonDetails(addondetails);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDatas = () => {
    return fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/GetEnableMenu"
    )
      .then((response) => response.json())
      .then((data) => setmenu(data));
  };
  useEffect(() => {
    fetchDatas();
  }, []);


  return (
    <>
      <Header />
      <div className="breadcrumb-area shadow text-center dark bg-fixed text-light food-img">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Food Menus</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="/" className="link-no-underline">
                    <FontAwesomeIcon
                      icon={constants.faHome}
                      style={{ color: "white" }}
                    />{" "}
                    Home
                  </a>
                </li>
                <li className="active link-no-underline">
                  <FontAwesomeIcon
                    className="pe-3"
                    icon={constants.faChevronRight}
                    style={{ color: "white" }}
                  />
                  MENUS
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="food-menu-area inc-isotop default-padding">
        <div className="container">
          <div className="food-menu-area text-center">
            <div className="row">
              <div className="col-md-12 food-menu-content">
                <div className="mix-item-menu text-center overflow-add  menu-display">
                  {/* {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <Chip
                        label={category.name}
                        className="redChip mx-2 my-4"
                      />
                    </div>
                  ))} */}
                  <TabList categories={categories} handleCategoryClick={handleCategoryClick} selectedCategoryId={selectedCategoryId} />
                </div>

                <div className=" text-center masonary">
                  <div className="menu-lists text-center row">
                    {loading ? (<ProgressSpinnerLo />):(   <>  {categorymenu && categorymenu.map((menucategory, index) => (
                      <div
                        onClick={() => openModal(menucategory.id, menucategory.desc)}
                        key={index}
                        className={`item-single pf-item pancakes meat col-md-4 `}
                        style={{
                          display:
                            activeCategory === "*" ||
                              menucategory.category.includes(activeCategory)
                              ? "block"
                              : "none",
                        }}
                      >
                        <div className="item">
                          <div className="thumb">
                            <a href="#">
                              <img
                                style={{ height: "243px" }}
                                src={menucategory.image}
                                alt="Thumb"
                              />
                            </a>
                            <div className="price">
                              <h5>${menucategory.price}</h5>
                            </div>
                          </div>
                          <div className="info">
                            <h4>{menucategory.name}</h4>
                            {menucategory.ingredients ? (<span>{menucategory.ingredients}</span>) : (<>
                              <p style={{ display: 'block', marginBottom: '41px' }}></p>

                            </>)}


                            <p className="card-text">{menucategory.desc}</p>
                            <div className="button">
                              <a href="#" className="link-no-underline">
                                Order Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}</>) }
                    {error && <p>Error: {error}</p>}
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <AddtoCart modalopen={modalopen} closeModal={closeModal} /> */}
        {/* <ToastContainer/> */}

        {/* <AddtoCart
          modalopen={modalopen}
          menuDetail={menudetail}
          addonDetails={addondetails}
          closeModal={closeModal}
          desce={desce}
        /> */}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          menuDetail={menudetail}
          addonDetails={addondetails}
          modalloading={modalloading}
          desce={desce}
        />
      </div>

      <Footer />
      <div className="view-cart-container">
        <ViewCart />
      </div>
    </>
  );
};

export default Menu;
