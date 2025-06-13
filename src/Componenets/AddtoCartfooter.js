import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
const AddtoCartfooter = ({
  onCheckout,
  grandTotal,
  discountAmount,
  totalAmount,
  deliveryCharges,
  Vat,
  GrandTotal,
  formData,
  loading,
  CalTotal
}) => {
  const isFormValid = Object.values(formData).every((value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    return true;
  });
  return (
    <>
      <div className="cart-bg">
        <div className="fixed-bottom-cart">
          <div className="">
            <hr></hr>
          </div>
          <div className="row  mx-3 ">
            <div className="col-6 cart">
              <p className="cart">Total</p>
            </div>
            <div className="col-6 text-end">
              <p className="cart">${grandTotal}</p>
            </div>
          </div>
          {/* <div className="row  mx-3 ">
            <div className="col-6 cart">
              <p className="cart">Discount(40%)</p>
            </div>
            <div className="col-6 text-end">
              <p className="cart">(${discountAmount})</p>
            </div>
          </div> */}
          {/* <hr /> */}
          {/* <div className="row  mx-3 ">
            <div className="col-6 cart">
              <p className="cart"></p>
            </div>
            <div className="col-6 text-end">
              <p className="cart">${CalTotal}</p>
            </div>
          </div> */}
          <div className="row  mx-3 ">
            <div className="col-6 cart">
              <p className="cart">Tax(6.625%)</p>
            </div>
            <div className="col-6 text-end">
              <p className="cart">${Vat}</p>
            </div>
          </div>
          {/* <div className="row  mx-3">
            <div className="col-6 cart">
              <p className="cart">Delivery Charges</p>
            </div>
            <div className="col-6 text-end">
              <p className="cart">${deliveryCharges}</p>
            </div>
          </div> */}
          <hr />
          <div className="row  mx-3">
            <div className="col-6 cart">
              <p className="cart">Sub Total</p>
            </div>
            <div className="col-6 text-end">
              <p className="cart">${GrandTotal}</p>
            </div>
          </div>
          <div className=" ps-4  addtocartbtn-padding">
            <div className='d-flex align-items-center ' style={{height:'44px'}}>
              <input
                type="radio"

                onClick={onCheckout}
                disabled={!isFormValid}
              />
              <span className="px-2">Pickup</span>
            </div>
            {/* <div className='d-flex align-items-center ' style={{height:'10px'}}>
              <input
                type="radio"

                disabled={true}
              />
              <span className="px-2">Delivery</span>
            </div> */}

            {/* <button 
          className='btn  addtocartbt-primary rounded-pill px-5 '
          onClick={onCheckout}
          disabled={!isFormValid}
          >
            {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            Pickup</button>
          <button className='btn  addtocartbt-primary rounded-pill px-5'  disabled={true}>Delivery</button> */}
            {/* <button
              type="button"
              className="btn  addtocartbt rounded-pill "
              onClick={onCheckout}
              disabled={!isFormValid}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Checkout
            </button> */}
          </div>
        </div>
      </div>

    </>
  );
};

export default AddtoCartfooter;
