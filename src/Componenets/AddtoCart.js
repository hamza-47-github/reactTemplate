import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { ToastContainer } from 'react-toastify';

import { useDispatch } from "react-redux";
import { setitemCounte } from "../Redux/ProductSlide";
import 'react-toastify/dist/ReactToastify.css';
import toastr from 'toastr'
import ProgressSpinnerLo from "../ProgressSpinner/ProgressSpinnerLo";
import 'toastr/build/toastr.min.css'
const AddtoCart = ({ modalopen, closeModal, menuDetail, addonDetails, modalloading,desce }) => {
  const nullimag = "/images/homebg.jpg"
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const Swal = require('sweetalert2')
  const handleSpecialInstructionsChange = (event) => {
    setSpecialInstructions(event.target.value);
  };

  const handleAddToCart = () => {
    const selectedAddonsList = addonList
      .filter((addon) => selectedAddons.includes(addon.menuQuantityId))
      .map((addon) => ({
        price: addon.price,
        addonsname: addon.addonName,
        quantity: quantity,
        menuQuantityId: addon.menuQuantityId,
      }));
    // Calculate the total price of the menu item including addons
    const menuPrice = menuDetail.price;
    const addonsTotalPrice = selectedAddonsList.reduce((total, addon) => total + addon.price * quantity, 0);
    const totalPrice = menuPrice * quantity + addonsTotalPrice;
    const menuData = {
      menu: {
        menuQuantityId: menuDetail.menuQuantityId,
        menuName: menuDetail.menuName,
        price: menuDetail.price,
        quantity: quantity,
        imageUrl: menuDetail.imageUrl || nullimag,
        specialInstructions: specialInstructions,
      },
      addonslist: selectedAddonsList,
    };


    const existingCartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const existingMenuIndex = existingCartData.findIndex(
      (item) => item.menu.menuQuantityId === menuDetail.menuQuantityId
    );

    if (existingMenuIndex !== -1) {

      existingCartData[existingMenuIndex].menu.quantity += quantity;

      selectedAddonsList.forEach((selectedAddon) => {
        const existingAddonIndex = existingCartData[existingMenuIndex].addonslist.findIndex(
          (addon) => addon.menuQuantityId === selectedAddon.menuQuantityId
        );

        if (existingAddonIndex !== -1) {

          existingCartData[existingMenuIndex].addonslist[existingAddonIndex].quantity = quantity;
        } else {

          existingCartData[existingMenuIndex].addonslist.push(selectedAddon);
        }
      });
    } else {

      existingCartData.push(menuData);
    }
    const calculateTotalPrice = (cartData) => {
      let totalPrice = 0;
      cartData.forEach((item) => {
        totalPrice += item.menu.price * item.menu.quantity; // Add menu item price
        item.addonslist.forEach((addon) => {
          totalPrice += addon.price * addon.quantity; // Add addon price
        });
      });
      return totalPrice;
    };
    localStorage.setItem("cartData", JSON.stringify(existingCartData));
    dispatch(setitemCounte(existingCartData));
    toastr.success('Item added to Cart!');
    const totalCartPrice = calculateTotalPrice(existingCartData);
    localStorage.setItem('GrantTotal', totalCartPrice)
    console.log("Total Cart Price:", totalCartPrice);
    setSpecialInstructions("");
    setSelectedAddons([]);
    setQuantity(1);
  };

  const handleAddonSelection = (addonId) => {
    const updatedAddons = selectedAddons.includes(addonId)
      ? selectedAddons.filter((addon) => addon !== addonId)
      : [...selectedAddons, addonId];

    setSelectedAddons(updatedAddons);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const addonList = Object.values(addonDetails);

  useEffect(() => { }, []);
  const [open, setOpen] = useState(false);

  const entities = [
    { id: 1, label: "small", price: 371 },
    { id: 2, label: "medium", price: 500 },
    // Add more entities as needed
  ];
  const addon = [
    { id: 1, label: "Sweetcorn", price: 371 },
    { id: 2, label: "cheese", price: 500 },
    { id: 3, label: "fries", price: 900 },
    // Add more entities as needed
  ];
  const handleOpen = () => {
    setOpen(modalopen);
  };
  const handleClose = () => {
    setOpen(closeModal);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#fff",

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderradius: "13px",
  };
  return (
    <>
      <Modal
        open={modalopen}
        onClose={() => handleClose(modalopen)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="modal-padding"
      >
        <Box
          sx={{
            ...style,
            width: 800,
            height: 600,
            paddingTop: 5,
            paddingBottom: 8,
            "@media (max-width: 750px)": {
              width: 300,
              height: 730,
            },
          }}
          className="modalstyle"
        >
          <div className="text-end modal-icon" >
            <div className="circle" onClick={handleClose}>
              <span className="pb-2">x</span>
              {/* <FontAwesomeIcon
              onClick={handleClose}
              className="pe-3"
              icon={constants.faCircleXmark}
              style={{ color: "#E5262A",width:'42px', height: "42px" }}
            /> */}
            </div>

          </div>
          {modalloading ? (<ProgressSpinnerLo />):(
              <div className="container">
              <form>
                <div className="row">
                  <div className="col-md-4 ">
                    <div style={{ height: '100%' }}>
                      <img
                        src={menuDetail.imageUrl || nullimag}
                        alt="menu-img"
                        className="img-fluid"
                        style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '15px' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 ">
                    <div className="d-flex justify-content-between">
                      <div className="addtocart-head pe-5">
                        {menuDetail.menuName}
                      </div>
                      <div className="px-4 ">
                        <p className="addtocart-price "><sup>$</sup>{`${menuDetail.price * quantity}`}</p>
                      </div>
                    </div>


                    <p className="dialog-p px-2">
                    {desce}
                    </p>
                    <div className="row px-4">
                      <div className="col-md-10 entity-price">
                        {/* <p>{`${menuDetail.price* quantity}$`}</p> */}
                      </div>
                      {/* <div className="col-md-2 d-flex text-end">
                      <div>
                        <FontAwesomeIcon
                          className="ps-3"
                          icon={constants.faCirclePlus}
                          style={{
                            color: "#E7272D",
                            height: "20px",
                            cursor: "pointer",
                          }}
                          onClick={handleIncreaseQuantity}
                        />
                      </div>
                      <p className="ps-3">{quantity}</p>
                      <div>
                        <FontAwesomeIcon
                          className="ps-4"
                          icon={constants.faCircleMinus}
                          style={{
                            color: "#E7272D",
                            height: "20px",
                            cursor: "pointer",
                          }}
                          onClick={handleDecreaseQuantity}
                        />
                      </div>
                    </div> */}
                    </div>

                    <div className="px-2">
                      <p className="pt-2" style={{ fontSize: '18px', fontWeight: "600", lineHeight: '27px', color: '#000000' }}>Add Ons</p>
                      <div>
                        <div className="scroll-addon" style={{ height: "200px" }}>
                          {addonList.map((addon) => (
                            <div
                              key={addon.menuQuantityId}
                              className="d-flex sub-addon "
                            >
                              <div className="col-md-8 entity-h px-0">
                                <FormControlLabel
                                  value="end"
                                  control={
                                    <Checkbox
                                      onChange={() =>
                                        handleAddonSelection(addon.menuQuantityId)
                                      }
                                    />
                                  }
                                  label={addon.addonName}
                                  labelPlacement="end"
                                  className="entity-h"
                                />
                              </div>
                              <div className="col-md-4 text-end ">
                                <div className="text-end entity-p pt-3">{`${addon.price * quantity}$`}</div>
                              </div>

                              <hr className="entity-line"></hr>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="instruction-card">
                      {" "}
                      <div className="">
                        <p className="pt-2" style={{ fontSize: '18px', fontWeight: "600", lineHeight: '27px', color: '#000000' }}>Special Instruction</p>
                        <input
                          name="name"
                          className="sub-font  textfield-padding menu-font menu-font1  form-control line-color line-color1"
                          label="Product instructions"
                          variant="filled"
                          placeholder="Type here"
                          value={specialInstructions}
                          onChange={handleSpecialInstructionsChange}
                        />
                      </div>

                      <div className="d-flex justify-content-between  pt-5">
                        <div className="price-section rounded-pill justify-content-between d-flex align-items-center px-2">
                          <div className="p-circle d-flex align-items-center justify-content-center " onClick={handleDecreaseQuantity} >
                            <span className="fs-3 pb-1 fw-bold">-</span>

                          </div>
                          <div className="" style={{ font: 'Inter', fontSize: '20px', fontWeight: '600', lineHeight: "24.2px" }}>
                            {quantity}
                          </div>
                          <div className="p-circle d-flex align-items-center justify-content-center" onClick={handleIncreaseQuantity} >
                            <span className="fs-3 fw-bold">+</span>

                          </div>

                        </div>
                        <button
                          type="button"
                          className="btn  addtocartbtn rounded-pill "
                          onClick={() => {
                            handleAddToCart();
                            handleClose();
                          }}
                        >

                          Add to Cart
                        </button>

                      </div>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        
          

        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddtoCart;
