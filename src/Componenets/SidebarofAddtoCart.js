import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import App from "../App";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddtoCartfooter from "./AddtoCartfooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setitemCounte } from "../Redux/ProductSlide";
import Swal from "sweetalert2";
const SidebarofAddtoCart = ({ isSidebarOpen, onClose }) => {
  const [GetPreset, setGetPreset] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [deliveryCharges, setdeliveryCharges] = useState(0);
  const [VATCharges, setVATCharges] = useState(6.625); 
  const [menuObjects, setMenuObjects] = useState([]);
  const [addonObjects, setAddonObjects] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const dispatch = useDispatch();
  const storedData = JSON.parse(localStorage.getItem("cartData")) || [];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(40);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Vat, setVat] = useState(0);
  const [GrandTotal, setGrandTotals] = useState(0);
  const [CalTotal, setcalTotals] = useState(0);
  const Swal = require("sweetalert2");
  // useEffect(() => {
  //   getPreset();
  //   const calculatedDiscountAmount = (grandTotal * discountPercentage) / 100;
  //   const calculatedTotalAmount = grandTotal - calculatedDiscountAmount;
  //   setcalTotals(calculatedTotalAmount)
  //   setDiscountAmount(calculatedDiscountAmount);
  //   const calculatedVat = (calculatedTotalAmount * VATCharges) / 100;
  //   const calculated = calculatedVat.toFixed(2);
  //   setVat(parseFloat(calculated));
  //   const calculatedGrandTotal =
  //     calculatedTotalAmount + calculatedVat + deliveryCharges;
  //   const calculatedtoFixed = calculatedGrandTotal.toFixed(2);
  //   setGrandTotals(parseFloat(calculatedtoFixed));
  //   localStorage.setItem('GrantTotal', calculatedtoFixed)
  // }, [grandTotal, discountPercentage]);
  useEffect(() => {
    getPreset();
    const calculatedVat = (grandTotal * VATCharges) / 100;
    const calculated = calculatedVat.toFixed(2);
    debugger
    setVat(parseFloat(calculated));
    const calculatedGrandTotal = grandTotal + calculatedVat;
    const calculatedtoFixed = calculatedGrandTotal.toFixed(2);
    setGrandTotals(parseFloat(calculatedtoFixed));
    localStorage.setItem('GrantTotal', calculatedtoFixed);
  }, [grandTotal, VATCharges]);
  useEffect(() => {
    if (isSidebarOpen) {
      Cartdata();
    }
  }, [isSidebarOpen]);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const handlesuccessmodalopen = () => {
    setSuccessOpen(true);
  };

  const handlesuccessClose = () => {
    setSuccessOpen(false);
  };
  const getPreset = async () => {
    await fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Presets/GetPreset"
    )
      .then((response) => response.json())
      .then((data) => {
        // const firstCategoryId = data.length > 0 ? data[0].id : null;
        // setSelectedCategoryId(firstCategoryId);
        setGetPreset(data);
        setdeliveryCharges(data[0].deliveryCharges);
        // setVATCharges(data[0].vat);
      });
  };
  const [userdata, setuserdata] = useState({
    id: "",
    username: "",
    email: "",
    contact: "",
    address: "",
    userTypeId: 0,
    password: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    address: "",
    userTypeId: 2,
    password: "123456",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRemoveItem = (index) => {
    localStorage.setItem("GrantTotal", '0');
    const updatedData = storedData.filter(
      (_, dataIndex) => dataIndex !== index
    );
    localStorage.setItem("cartData", JSON.stringify(updatedData));
    Cartdata();
    dispatch(setitemCounte(updatedData));
  };
  const handleCheckout = async () => {
    try {
      setloading(true);

      // Validate form data
      if (!validateForm()) {
        console.log('Form validation failed:', errors);
        setloading(false);
        return; // Exit function if form validation fails
      }

      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/UserRegistration/UserRegister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
          body: JSON.stringify(formData),
        }
        
      );

      const data = await response.json();
      userBYID(data);
      setuserdata(data);
      onClose(false);
      Swal.fire({
        icon: "success",
        title: "Order Successfully Placed",
        text: "Thank you for choosing Parathas & Platters. We look forward to serving you soon!",
        timer: 5000,
        width: 500,
      });
      localStorage.setItem("cartData", JSON.stringify([]));
      Cartdata();
      dispatch(setitemCounte([]));
      setFormData({
        username: "",
        email: "",
        contact: "",
        address: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const userBYID = async (data) => {
    const Combinelistmenu = [...menuObjects, ...addonObjects];
    try {
      const extractedData = Combinelistmenu.map((item) => ({
        menuQuantityId: item.menuQuantityId,
        price: item.price,
        qty: item.quantity || 1,
        instruction: item.instruction,
      }));

      const checkoutData = {
        userId: data.id,
        received: 0,
        discount: 0,
        date: "2024-01-25T01:01:10.600Z",
        orderStatusId: 3,
        orderTypeId: 1,
        orderdetail: extractedData,
        deliveryCharges: deliveryCharges,
        vat: Vat,
        discount: discountAmount,
        grandTotal: GrandTotal,
      };

      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Order/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
          body: JSON.stringify(checkoutData),
        }
      );

      setSuccessOpen(true);
      setloading(false);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.clear();
        setCombinedList([]);
        setMenuObjects([]);
        setAddonObjects([]);
        setloading(false);
        setSuccessOpen(true);
      } else {
        console.error("Failed to place order. Status:", response.status);
        setloading(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const Cartdata = () => {
    try {
      const storedData = JSON.parse(localStorage.getItem("cartData"));
      if (!storedData) {
        console.error("No data found in local storage");
        return;
      }
      const menuObjects = storedData.map(({ menu, addonslist }) => ({
        menuQuantityId: menu.menuQuantityId,
        menuName: menu.menuName,
        quantity: menu.quantity,
        price: menu.price,
        imageUrl: menu.imageUrl,
        instruction: menu.specialInstructions,
      }));
      const addonObjects = storedData.flatMap(({ addonslist }) =>
        addonslist.map((addon) => ({
          menuQuantityId: addon.menuQuantityId,
          price: addon.price,
          quantity: addon.quantity,
          addonsname: addon.addonsname,
        }))
      );
      setMenuObjects(menuObjects);
      setAddonObjects(addonObjects);
      const combinedList = storedData.map(({ menu, addonslist }) => {
        const menuObject = {
          menuQuantityId: menu.menuQuantityId,
          menuName: menu.menuName,
          quantity: menu.quantity,
          price: menu.price,
          imageUrl: menu.imageUrl,
          addons: addonslist.map((addon) => ({
            menuQuantityId: addon.menuQuantityId,
            price: addon.price,
            quantity: addon.quantity,
            addonsname: addon.addonsname,
          })),
        };
        return menuObject;
      });

      setCombinedList(combinedList);
      const newGrandTotal = combinedList.reduce(
        (total, item) =>
          total +
          item.price * (item.quantity || 1) +
          item.addons.reduce(
            (addonTotal, addon) =>
              addonTotal + addon.price * (addon.quantity || 1),
            0
          ),
        0
      );
      setGrandTotal(newGrandTotal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Combinelistmenu = [...menuObjects, ...addonObjects];

  // const toggle = () => {
  //   setisOpen(!isOpen);
  // };

  // const [collapsed, setCollapsed] = useState(true);

  // const toggleCollapse = () => {
  //   setCollapsed(!collapsed);
  // };

  const handleIncreaseQuantity = (index) => {
    setCombinedList((prevCombinedList) =>
      prevCombinedList.map((item, i) =>
        i === index
          ? {
            ...item,
            quantity: (item.quantity || 0) + 1,
          }
          : item
      )
    );
    updateLocalStorage(index, "increase");
  };
  const handleDecreaseQuantity = (index) => {
    const currentItem = combinedList[index];

    if (currentItem.quantity > 1) {
      setCombinedList((prevCombinedList) =>
        prevCombinedList.map((item, i) =>
          i === index
            ? {
              ...item,
              quantity: Math.max((item.quantity || 1) - 1, 1),
            }
            : item
        )
      );
      updateLocalStorage(index, "decrease");
    }
  };
  const updateLocalStorage = (index, action) => {
    const storedData = JSON.parse(localStorage.getItem("cartData"));
    const updatedData = storedData.map((dataItem, dataIndex) => {
      if (dataIndex === index) {
        return {
          ...dataItem,
          menu: {
            ...dataItem.menu,
            quantity:
              action === "increase"
                ? (dataItem.menu.quantity || 0) + 1
                : Math.max((dataItem.menu.quantity || 0) - 1, 0),
          },
          addonslist: dataItem.addonslist.map((addon) => ({
            ...addon,
            quantity:
              action === "increase"
                ? (addon.quantity || 0) + 1
                : Math.max((addon.quantity || 0) - 1, 0),
          })),
        };
      }
      return dataItem;
    });
    localStorage.setItem("cartData", JSON.stringify(updatedData));
    Cartdata();
  };
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Validate name
    if (!formData.username.trim()) {
      newErrors.username = 'Name is required';
      valid = false;
    }

    // Validate contact
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    // Update errors state
    setErrors(newErrors);

    return valid;
  };
  const img = "https://d2h6wiohk8vgxj.cloudfront.net/menuImages/8db2b154-3491-41ee-b6bc-3fff4e91d86aAloo%20Paratha.jpg"
  return (
    <>
      <Modal
        open={isSidebarOpen}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box>
          <nav
            id="sidebarMenu"
            placement="end"
            className={` d-lg-block sidebar sidebarcart  bg-white ${isOpen ? "show" : ""
              }`}
          >
            <div className="position-sticky container addtocartfooter">
              <div className="row mx-3 ">
                <div className="col-6">
                  <p className="cart-h">Your Cart</p>
                </div>
                <div className="col-6 text-end">
                  <FontAwesomeIcon
                    icon={constants.faCircleXmark}
                    onClick={onClose}
                    style={{ color: "#E7272D", height: "20px" }}
                  />
                </div>
                <hr></hr>
              </div>
              {/* 
              <div style={{ cursor: 'pointer', height: '100%', width: '100%' }}>
                <div className="card-product">
                  <div className="card-img">
                    <div className="box-flex product-image-container">
                      <div className="product-image-container" style={{ height: '48px' }}>
                        <div style={{
                          backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          border: '1px solid #dcdcdc',
                          height: '48px',
                          borderRadius: '8px'
                        }}>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className="box-flex product-details-container w-100 fw-nowrap">
                    <div className="box-flex">
                      <p className="card-product-name">fdsgfdsgf</p>
                    </div>
                    <div className="box-flex price-quantity-container ai-center fd-row">
                      <div className="box-flex product-price-container ai-center fd-row">
                        <p>Rs. 280</p>
                      </div>
                    </div>
                    <div className="instant-cart-manager-container">
                      <div data-quantity="1">
                        <div className="bds-c-quantity-stepper bds-c-quantity-stepper--size-small bds-c-quantity-stepper--variant-button instant-cart-manager-stepper">
                          <div className="bds-c-btn-circular-cursor">
                            <button className="bds-c-btn-circular bds-c-btn-circular-basic bds-c-btn-circular--size-medium zi-surface-base bds-c-quantity-stepper__button bds-c-quantity-stepper__button--decrement">
                              <span className="bds-c-quantity-stepper__button-wrap">
                                <img src="/assests/img/part.svg" />
                              </span>
                            </button>
                          </div>
                          <div className="bds-c-quantity-stepper__quantity bds-c-quantity-stepper__quantity--decrementing f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                            1
                          </div>
                          <div className="bds-c-btn-circular-cursor">
                            <button className="bds-c-btn-circular bds-c-btn-circular-basic bds-c-btn-circular--size-medium zi-surface-base bds-c-quantity-stepper__button bds-c-quantity-stepper__button--decrement">
                              <span className="bds-c-quantity-stepper__button-wrap">
                                <img src="/assests/img/part1.svg" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div> */}

              {combinedList.length > 0 ? (
                <div>
                  <ul>
                    {combinedList.map((item, index) => (
                      <div className="px-4" style={{ cursor: 'pointer', height: '100%', width: '100%' }} key={item.menuQuantityId}>
                        <div className="card-product">
                          <div className="card-img">
                            <div className="box-flex product-image-container">
                              <div className="product-image-container" style={{ height: '48px' }}>
                                {/* <div style={{
                                  backgroundImage: `url(${item.imageUrl})`,
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat',
                                  border: '1px solid #dcdcdc',
                                  height: '48px',
                                  borderRadius: '8px'
                                }}>
                                </div> */}
                                <img
                                  src={item.imageUrl}
                                  // style={{ borderRadius: "10px" }}
                                  alt={item.menuName}
                                  // className="img-fluid"
                                  style={{
                                    // backgroundImage: `url(${item.imageUrl})`,
                                    // backgroundSize: 'contain',
                                    // backgroundRepeat: 'no-repeat',
                                    border: '1px solid #dcdcdc',
                                    height: '48px',
                                    width: '48px',
                                    borderRadius: '8px'
                                  }}
                                />
                              </div>


                            </div>
                          </div>
                          <div className="box-flex product-details-container w-100 fw-nowrap">
                            <div className="d-flex justify-content-between ">
                              <p className="card-product-name cl-interaction-primary fw-bold mb-0 pb-0">{item.menuName} </p>
                              <p style={{ fontSize: '16px', fontWeight: '700', color: '' }}>${item.price}</p>
                            </div>
                            {item.addons.map((addon, addonIndex) => (
                              <div className="d-flex product-toppings justify-content-between " key={index}>
                                <p className="mb-0" style={{ fontSize: '14px', fontWeight: '600', color: '' }}>{addon.addonsname} </p>
                                <p className="mb-0"  style={{ fontSize: '14px', fontWeight: '600', color: '' }}>${addon.price}</p>
                              </div>
                            ))}
                            {/* <div className="box-flex price-quantity-container ai-center fd-row">
                              <div className="box-flex product-price-container ai-center fd-row">
                                <p style={{ fontSize: '16px', fontWeight: '700', color: '' }}>${item.price}</p>
                              </div>
                            </div> */}
                            <div className="instant-cart-manager-container">
                              <div data-quantity="1">
                                <div className="bds-c-quantity-stepper bds-c-quantity-stepper--size-small bds-c-quantity-stepper--variant-button instant-cart-manager-stepper">
                                  <div className="bds-c-btn-circular-cursor">
                                    <button className="bds-c-btn-circular bds-c-btn-circular-basic bds-c-btn-circular--size-medium zi-surface-base bds-c-quantity-stepper__button bds-c-quantity-stepper__button--decrement">
                                      <span className="bds-c-quantity-stepper__button-wrap" onClick={() => handleDecreaseQuantity(index)} disabled={item.quantity === 1}>
                                        {item.quantity === 1 ? (
                                          <img src="/assests/img/part.svg" style={{ opacity: 1 }} onClick={() => handleRemoveItem(index)} />
                                        ) : (
                                          <img src="/assests/img/partm.svg" />
                                        )}
                                      </span>
                                    </button>
                                  </div>
                                  <div className="bds-c-quantity-stepper__quantity bds-c-quantity-stepper__quantity--decrementing f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                                    {item.quantity}
                                  </div>
                                  <div className="bds-c-btn-circular-cursor">
                                    <button className="bds-c-btn-circular bds-c-btn-circular-basic bds-c-btn-circular--size-medium zi-surface-base bds-c-quantity-stepper__button bds-c-quantity-stepper__button--decrement">
                                      <span className="bds-c-quantity-stepper__button-wrap" onClick={() => handleIncreaseQuantity(index)}

                                      >
                                        <img src="/assests/img/part1.svg" />
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      // <li key={item.menuQuantityId}>
                      //   <div className="col-md-1 text-end">
                      //     <FontAwesomeIcon
                      //       icon={constants.faTimesCircle}
                      //       onClick={() => handleRemoveItem(index)}
                      //       style={{
                      //         color: "#E7272D",
                      //         height: "20px",
                      //         cursor: "pointer",
                      //       }}
                      //     />
                      //   </div>

                      //   <div className="row d-flex mx-3">
                      //     <div className="col-md-3 ">
                      //       <img
                      //         src={item.imageUrl}
                      //         style={{ borderRadius: "10px" }}
                      //         alt={item.menuName}
                      //         className="img-fluid"
                      //       />
                      //     </div>
                      //     <div className="col-md-4  cart">
                      //       <p className="cart">{item.menuName}</p>
                      //     </div>
                      //     <div className="col-md-5 text-end">
                      //       <p className="cart">${item.price}</p>
                      //     </div>
                      //   </div>

                      //   {item.addons.length > 0 && (
                      //     <div className="padding-cart">
                      //       <p className="cart-p ps-5">Add Ons</p>
                      //     </div>
                      //   )}
                      //   {item.addons.map((addon, addonIndex) => (
                      //     <div
                      //       key={index}
                      //       className=" cart-text row d-flex mx-3"
                      //     >
                      //       <div className="col-md-3 cart-h"></div>
                      //       <div className="col-md-6 cart-h">
                      //         <p className="cart-text">{addon.addonsname}</p>
                      //         <p className="cart-text">${addon.price}</p>
                      //       </div>
                      //     </div>
                      //   ))}

                      //   <div className="padding-cart1 d-flex text-end">
                      //     <div>
                      //       <FontAwesomeIcon
                      //         onClick={() => handleIncreaseQuantity(index)}
                      //         className="ps-3"
                      //         icon={constants.faCirclePlus}
                      //         style={{ color: "#E7272D", height: "30px" }}
                      //       />
                      //     </div>
                      //     <p className="ps-3">{item.quantity}</p>
                      //     <div>
                      //       <FontAwesomeIcon
                      //         onClick={() => handleDecreaseQuantity(index)}
                      //         disabled={item.quantity === 1}
                      //         className="ps-4"
                      //         icon={constants.faCircleMinus}
                      //         style={{ color: "#E7272D", height: "30px" }}
                      //       />
                      //     </div>
                      //   </div>
                      //   <div className="px-4">
                      //     <hr></hr>
                      //   </div>
                      // </li>
                    ))}
                  </ul>
                  <form className="pt-4 px-3" >
                    <div className="form-group">
                      <label htmlFor="username">Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.username ? "is-invalid" : ""
                          }`}
                        name="username"
                        value={formData.username}
                        placeholder="Name"
                        onChange={handleInputChange}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        className={`form-control ${errors.contact ? "is-invalid" : ""
                          }`}
                        name="contact"
                        value={formData.contact}
                        placeholder="1234566778"
                        onChange={handleInputChange}
                      />
                      {errors.contact && (
                        <div className="invalid-feedback">{errors.contact}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className={`form-control ${errors.email ? "is-invalid" : ""
                          }`}
                        name="email"
                        value={formData.email}
                        placeholder="email@gmail.com"
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""
                          }`}
                        name="address"
                        value={formData.address}
                        placeholder="St#,House #,NY"
                        onChange={handleInputChange}
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>

                  </form>
                  <div>
                    <AddtoCartfooter
                      onCheckout={handleCheckout}
                      grandTotal={grandTotal}
                      discountAmount={discountAmount}
                      totalAmount={totalAmount}
                      deliveryCharges={deliveryCharges}
                      Vat={Vat}
                      GrandTotal={GrandTotal}
                      formData={formData}
                      loading={loading}
                      CalTotal={CalTotal}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="text-center">No Cart Data</h4>
                </>
              )}
            </div>
          </nav>
        </Box>
      </Modal>
    </>
  );
};
export default SidebarofAddtoCart;
