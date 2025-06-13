import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
const Vat = ({ isSidebarOpen, onClose }) => {
  const [isOpen, setisOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [GetPreset, setGetPreset]=useState({
    id: 1,
    deliveryCharges: 0,
    vat: 0,
  })
  const [vatFormData, setVatFormData] = useState({
    id: 1,
    deliveryCharges: 0,
    vat: 0,
  });
  useEffect(() => {
    getPreset();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGetPreset({
      ...GetPreset,
      [name]: value,
    })
    setVatFormData({
      ...vatFormData,
      [name]: value,
    });
  };

  const handleSubmitVat = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Presets/UpdatePreset?id=1`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
          body: JSON.stringify(vatFormData),
        }
      );
      setloading(false);
      toastr.success('Updated successfully!');
      onClose(false)
      const data = await response.json();
      setVatFormData({
        id: 1,
        deliveryCharges: 0,
        vat: 0,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setloading(false);
    }
  };
  const getPreset = () => {
    return fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Presets/GetPreset"
    )
      .then((response) => response.json())
      .then((data) => setGetPreset(data[0]));
  };
  const isFormValid = Object.values(vatFormData).every((value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    return true;
  });
  return (
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
          className={` d-lg-block sidebar sidebarcart  bg-white ${
            isOpen ? "show" : ""
          }`}
        >
          <div className="position-sticky container addtocartfooter">
            <div className="row d-flex mx-3 ">
              <div className="col-md-6">
                <p className="cart-h">VAT</p>
              </div>
              <div className="col-md-6 text-end">
                <FontAwesomeIcon
                  icon={constants.faCircleXmark}
                  onClick={onClose}
                  style={{ color: "#E7272D", height: "20px" }}
                />
              </div>
              <hr></hr>
            </div>

            <div>
              <form className="pt-4 px-3" onSubmit={handleSubmitVat}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Delivery</label>
                  <input
                    type=""
                    className="form-control"
                    name="deliveryCharges"
                    aria-describedby="emailHelp"
                    placeholder="$1"
                    value={GetPreset.deliveryCharges}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">VAT</label>
                  <input
                    type=""
                    className="form-control"
                    id="exampleInputEmail1"
                    name="vat"
                    value={GetPreset.vat}
                    aria-describedby="emailHelp"
                    placeholder="0"
                    onChange={handleChange}
                  />
                </div>
                <div className=" pt-5 text-center addtocartbtn-padding">
                  <button
                    // type="button"
                    className="btn  addtocartbt rounded-pill "
                    // onClick={onCheckout}
                    disabled={!isFormValid}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    submit
                  </button>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </nav>
      </Box>
    </Modal>
  );
};

export default Vat;
