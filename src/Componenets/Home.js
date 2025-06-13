import React from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Topbar from "./Topbar";
import AOS from "aos";
import "aos/dist/aos.css";
import AddtoCart from "./AddtoCart";
import { useEffect } from "react";
import Gallery from "./Gallery";
import Header from "./Header.tsx";
import Footer from "./Footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ViewCart from "./ViewCart";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TabList from "./TabList";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import ProgressSpinnerLo from "../ProgressSpinner/ProgressSpinnerLo";
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { useDispatch, useSelector } from "react-redux";
import { setCartMenuList, setCategoriesList, resetCategoriesList } from "../Redux/ProductSlide";
import { RootState } from '../Redux/Store';
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingmenu, setLoadingmenu] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("*");
  const nullimag = "/images/homebg.jpg";
  const [blog, setblog] = useState([]);
  const [modalopen, setmodalopen] = useState(false);
  // const [menuID, setmenuID] = useState();
  const [modalloading, setModalloading] = useState(false);
  const [desce, setDesc] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.product.cartMenuList);
  const openModal = (menuId, desc) => {
    // setmenuID(menuId)
    // fetchMenuDetails(menuId);
    const menuList = menu.filter((data) => data.id === menuId);
    const cartmenu = menuList[0].cartMenu;
    const MenuDetail = cartmenu.find(
      (p) => p.addonName === null && p.addonsId === null
    );
    const addondetails = cartmenu.filter(
      (p) => p.addonName !== null && p.addonsId !== null
    );
    setMenuDetails(MenuDetail);
    setAddonDetails(addondetails);
    setmodalopen(true);
    setModalShow(true)
    setDesc(desc);
    // fetchMenuDetails(menuId);
  };
  // const openModal = () => {

  //     setmodalopen(true)
  // }

  const closeModal = () => {
    setmodalopen(false);
    // toast.success('Add to Cart!');
  };

  const fetchBlog = () => {
    return fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Blog/GetAllBlog"
    )
      .then((response) => response.json())
      .then((data) => setblog(data));
  };
  useEffect(() => {
    // fetchBlog();
  }, []);

  const scrollToTarget = () => {
    const targetElement = document.getElementById("gallay");
    // if (targetElement) {
    //   targetElement.scrollIntoView({ behavior: "smooth" });
    // }
    navigate("https://order.online/store/parathas&platters-inc-hackensack-28921609/?hideModal=tru[…]l3yzLz_DyeTPx5UAHxQ9ywm6_WlGPNGwLvXDbyxXp9bRg==&utm_source=gfo")
  };

  useEffect(() => {
    AOS.init();
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalItems, setTotalItems] = useState(4);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const username = localStorage.getItem("Username");
  // const [categories, setCategories] = useState([]);
  const [categorymenu, setCategoryMenu] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [menudetail, setMenuDetails] = useState([]);
  const [addondetails, setAddonDetails] = useState({});
  // const [menu, setmenu] = useState([]);
  const categories = useSelector((state) => state.product.categoriesList);
  useEffect(() => {
    if (!categories) {
      fetchData();
    }

  }, []);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      menuData(selectedCategoryId);
    }
  }, [selectedCategoryId]);


  const fetchData = () => {
    fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/EnableCategoryList"
    )
      .then((response) => response.json())
      .then((data) => {
        const firstCategoryId = data.length > 0 ? data[0].id : null;
        setSelectedCategoryId(firstCategoryId);
        // setCategories(data);
        dispatch(setCategoriesList(data))
        // const resetTimeout = setTimeout(() => {
        //   dispatch(resetCategoriesList());
        // }, 60 * 60 * 1000); 
        // debugger
        // const resetTimeout = setTimeout(() => {
        //   dispatch(resetCategoriesList());
        // }, 1000);

        // clearTimeout(resetTimeout);
      });

  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    // setCategories(
    categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          active: !category.active,
        };
      }
      return category;
    })
    // );
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


  const fetchDatas = async () => {
    try {
      setLoadingmenu(true);

      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/GetEnableMenu"
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      // setmenu(data);
      dispatch(setCartMenuList(data));

    } catch (error) {
      console.error('Error fetching menu data:', error);
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoadingmenu(false);
    }
  };
  const fetchMenuDetails = (menuId) => {
    try {
      setModalloading(true)
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
          setModalloading(false)
        })
        .catch((error) => {
          setModalloading(false)
          console.error(error);
        });
    } catch (error) {
      console.error(error);
      setModalloading(false)
    }

  };

  useEffect(() => {
    if (!menu) {
      fetchDatas();
    }

  }, []);


  const carouselOptions = {
    items: 3,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        dots: false
      },
      768: {
        items: 2,
        dots: false
      },
      992: {
        items: 3,
      },
    },
  };
  const [open, setOpen] = useState(false);
  const handleClose = (confirmed) => {

    setOpen(false);
  };
  const [showFullDesc, setShowFullDesc] = useState(false);

  const toggleDesc = () => {
    setShowFullDesc(!showFullDesc);
  }
//   useEffect(() => {
//     const resetTimeout = setTimeout(() => {
//       debugger
//         dispatch(resetCategoriesList());
//     }, 2000);
//     return () => clearTimeout(resetTimeout);
// }, []);
  return (
    <>
      <Header />
      <div className="banner-area ds-fonts text-light text-center">
        <div
          id="bootcarousel"
          className="carousel slide animate_text"
          data-ride="carousel"
        >
          <div className="carousel-inner transparent-nav heading-uppercase text-dark ">
            <div className="item active bg-cover bg-item1">
              <div className="box-table shadow dark">
                <div className="box-cell">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2  ">
                        <div className="content 'carousel-text" style={{ height: '100vh', display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        
                          <h1 className="carousel-text2 ">
                            Start Your Flavorful Journey with Parathas &
                            Platters
                          </h1>
                          <p className="carousel-text3 ">
                            Discover Delightful Traditions at Parathas &
                            Platters, Where Classic Flavors Blend with Modern
                            Taste
                          </p>
                          <a
                          href="https://order.online/store/parathas&platters-inc-hackensack-28921609/?hideModal=tru[…]l3yzLz_DyeTPx5UAHxQ9ywm6_WlGPNGwLvXDbyxXp9bRg==&utm_source=gfo"
                            className="border-2 btn-padding btn btn-light border btn-md link-no-underline"
                            // onClick={() => scrollToTarget()}
                          >
                            {" "}
                            Order Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item bg-cover bg-item3 ">
              <div className="box-table shadow dark">
                <div className="box-cell">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2 ">
                        <div className="content 'carousel-text " style={{ height: '100vh', display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    
                          <h1 className="carousel-text2">
                            Discover Tradition and Flavor in Every Bite!
                          </h1>
                          <p className="carousel-text3">
                            Parathas & Platters invites you on a culinary
                            journey where heritage meets innovation in every
                            delicious bite
                          </p>
                          <a
                            data-animation="animated slideInUp"
                            className="border-2  btn-padding btn btn-light border btn-md link-no-underline"
                            onClick={() => scrollToTarget()}
                          >
                            Order Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item bg-cover bg-item2 ">
              <div className="box-table shadow dark">
                <div className="box-cell">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2 ">
                        <div className="content 'carousel-text" style={{ height: '100vh', display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          {/* <h2 className='carousel-text1'>Sandwich</h2> */}
                          <h1 className="carousel-text2">
                            Savor the Symphony of Flavors at Parathas & Platters
                          </h1>
                          <p className="carousel-text3">
                            Relish a culinary experience from classic Parathas
                            to mouthwatering Rolls that tantalizes your taste
                            buds.
                          </p>
                          <a
                            data-animation="animated slideInUp"
                            className="border-2  btn-padding btn btn-light border link-no-underline "
                            onClick={() => scrollToTarget()}
                          >
                            Order Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            className="left carousel-control"
            href="#bootcarousel"
            data-slide="prev"
          >
            {/* <FontAwesomeIcon
              icon={constants.faChevronLeft}
              style={{ color: "white" }}
            /> */}
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#bootcarousel"
            data-slide="next"
          >
            {/* <FontAwesomeIcon
              icon={constants.faChevronRight}
              style={{ color: "white" }}
            /> */}
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="wavesshape">
          <img src="assests\img\shape.png" alt="Shape" />
        </div>
      </div>
      <div className="basic-info-area text-center">
        <div className="container  section-padding">
          <div className="row">
            <div className="col-md-4 single-item">
              <div className="item">
                <h4>Contact Us</h4>
                <p>
                  Get in touch with us for any inquiries or assistance you may need.
                </p>
                <h2>(201) 250-8255</h2>
              </div>
            </div>
            <div className="col-md-4 single-item ">
              <img src="assests\img\food.png" alt="Thumb" />
            </div>
            <div className="col-md-4 single-item">
              <div className="item">
                <h4>SPECIAL PROMOTIONS</h4>
                <p>
                  Subscribe now for daily exclusive promotions. Joining is a
                  simple process, taking just a couple of minutes.
                </p>
                <form >
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Enter your e-mail here"
                      className="form-control"
                      name="email"
                    />
                    <button type="button" >
                      <NavLink to="/thankpage">
                        <FontAwesomeIcon
                          icon={constants.faPaperPlane}
                          style={{ color: "white" }}
                        />
                      </NavLink>

                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="food-menu-area path-less carousel-shadow bg-gray default-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="site-heading text-center">
                <h3>Discover</h3>
                <h2>Our Signature Dishes</h2>
                <p>
                  Savor our diverse selection of delicious options, including
                  fries, burgers, kababs, rice, and parathas—perfect for any
                  time of day.
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="menu-lists food-menu-carousel  text-center">
                  {loadingmenu && <ProgressSpinnerLo />}
                  {error && <p>Error: {error}</p>}
                  <OwlCarousel
                    items={3}
                    margin={20}
                    className="owl-theme homecrousel"
                    {...carouselOptions}

                  >
                    {menu && menu.map((item, index) => (
                      <div key={index}>
                        <div

                          className="item"
                          // onClick={() => setModalShow(true)}
                          // onClick={() => openModal(item.id, item.desc)}
                        >
                          <div className="thumb">
                            <a>
                              <img
                                style={{ height: "243px" }}
                                src={item.image || nullimag}
                                alt="Thumb"
                              />
                            </a>
                            <div className="price">
                              <h5>${item.price}</h5>
                            </div>

                            <div className="info">
                              <h4>{item.name}</h4>
                              <span>{item.ingredients}</span>
                              <p className="card-text-1" >
                                {item.desc}
                              </p>
                              <div className="button">
                                <a href="https://order.online/store/parathas&platters-inc-hackensack-28921609/?hideModal=tru[…]l3yzLz_DyeTPx5UAHxQ9ywm6_WlGPNGwLvXDbyxXp9bRg==&utm_source=gfo" className="link-no-underline">
                                  Order Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="food-menu-area inc-isotop default-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="site-heading text-center">
                <h3>Discover</h3>
                <h2>OUR SPECIAL MENU</h2>
                <p>
                  Indulge in a feast of flavors at Parathas & Platters with our
                  diverse menu that brings together traditional and contemporary
                  dishes.
                </p>
              </div>
            </div>
          </div>
          <div className="food-menu-area">
            <div className="row">
              <div className="col-md-12 text-center food-menu-content">
                <div className="text-center  menu-display  overflow-add">
                  {/* {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <Chip
                        label={category.name}
                        className={`redChip mx-2 my-4 ${
                          category.active ? "active" : ""
                        }`}
                      />
                    </div>
                  ))} */}
                  <TabList
                    categories={categories}
                    handleCategoryClick={handleCategoryClick}
                    selectedCategoryId={selectedCategoryId}
                  />
                </div>
                <div className="row masonary menu-cursor" id="gallay">
                  <div className="menu-flex ">
                    {loading && <ProgressSpinnerLo />}
                    {error && <p>Error: {error}</p>}
                    {categorymenu && categorymenu.map((menucategory, index) => (
                      <div key={index}>
                        <div

                          className={`item-single pf-item  col-md-6 `}
                          style={{
                            display:
                              activeCategory === "*" ||
                                menucategory.category.includes(activeCategory)
                                ? "block"
                                : "none",
                          }}
                          onClick={() => openModal(menucategory.id, menucategory.desc)}
                        >
                          <div className="item">
                            <div className="thumb">
                              <div style={{ height: "100px", width: '100px', background: 'transparent' }}>
                                <img src={menucategory.image} alt="Thumb" />
                                <h5>${menucategory.price}</h5>
                              </div>
                            </div>
                            <div className="info">
                              <h4>{menucategory.name}</h4>
                              <p className="card-text">{menucategory.desc}</p>
                              <span>{menucategory.ingredients}</span>
                              <div className="pt-3">
                                <button
                                  type="button"
                                  className="btn  addtocartbtn1 rounded-pill  "
                                >
                                  <FontAwesomeIcon
                                    className="pe-2 pe-sm-0"
                                    icon={constants.faPlus}
                                    style={{ color: "white" }}
                                  />
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Gallery />

      {/* <AddtoCart
        modalopen={modalopen}
        menuDetail={menudetail}
        addonDetails={addondetails}
        closeModal={closeModal}
        modalloading={modalloading}
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
      <Footer />
      <div className="view-cart-container">
        <ViewCart />
      </div>
    </>
  );
};

export default Home;
