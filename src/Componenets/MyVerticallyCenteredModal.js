import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { setitemCounte } from "../Redux/ProductSlide";
import 'react-toastify/dist/ReactToastify.css';
import toastr from 'toastr'
import ProgressSpinnerLo from "../ProgressSpinner/ProgressSpinnerLo";
import 'toastr/build/toastr.min.css'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
export default function MyVerticallyCenteredModal(props) {
  const nullimag = "/images/homebg.jpg"
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const Swal = require('sweetalert2')
  const handleSpecialInstructionsChange = (event) => {
    setSpecialInstructions(event.target.value);
  };  
const menudataobject=props.menuDetail;
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
    const menuPrice = props.menuDetail.price;
    const addonsTotalPrice = selectedAddonsList.reduce((total, addon) => total + addon.price * quantity, 0);
    const totalPrice = menuPrice * quantity + addonsTotalPrice;
    const menuData = {
      menu: {
        menuQuantityId: props.menuDetail.menuQuantityId,
        menuName: props.menuDetail.menuName,
        price: props.menuDetail.price,
        quantity: quantity,
        imageUrl: props.menuDetail.imageUrl || nullimag,
        specialInstructions: specialInstructions,
      },
      addonslist: selectedAddonsList,
    };
    const existingCartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const existingMenuIndex = existingCartData.findIndex(
      (item) => item.menu.menuQuantityId === props.menuDetail.menuQuantityId
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
  const addonList = Object.values(props.addonDetails);
  const handleclosed = () => {
    props.onHide()
    setQuantity(1)
  };
  const handleClose = () => {
    props.onHide()
  };
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      style={{ opacity: props.show ? 1 : 0 }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className=" d-flex justify-content-end close-btn-style ">
      <div className="text-end mt-3 me-0" onClick={handleclosed}>
        <div className="circle" onClick={handleclosed}>
          <span className="pb-2" onClick={handleclosed}>x</span >
        </div>
      </div>
      </div>
     
      <Modal.Body className="pb-5">
        <Modal.Body>
        {props.modalloading ? (<ProgressSpinnerLo />):(
              <div className="container">
              <form>
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="menu-img-add" >
                      <img
                        src={props.menuDetail.imageUrl || nullimag}
                        alt="menu-img"
                        className="img-fluid"
                        style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '15px' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 ">
                    <div className="d-flex justify-content-between">
                      <div className="addtocart-head pe-5">
                        {props.menuDetail.menuName}
                      </div>
                      <div className="px-4 ">
                        <p className="addtocart-price "><sup>$</sup>{`${props.menuDetail.price * quantity}`}</p>
                      </div>
                    </div>


                    <p className="dialog-p px-2">
                    {props.desce}
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
                              <div className="col-md-8 col-sm-8 entity-h px-0">
                                <FormControlLabel
                                  value="end"
                                  control={
                                    <Checkbox className="add-oncheck"
                                    color="error"
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
                              <div className="col-md-4 col-sm-4 text-end flex-fill">
                                <div className="text-end entity-p pt-3">{`$${addon.price * quantity}`}</div>
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
       
        </Modal.Body>
      </Modal.Body>
    
    </Modal>
  );
}