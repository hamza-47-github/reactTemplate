import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
// import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Modal from 'react-bootstrap/Modal';
import { NavLink, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import DashboardLayout from "./DashboardLayout";
import DashboardHeader from "./DashboardHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ProgressSpinnerLo from "../ProgressSpinner/ProgressSpinnerLo";
const IngredientsModal = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [addonSwitches, setAddonSwitches] = useState({});
  const [Enable, setEnable] = useState(false);
  const [disable, setdisable] = useState(true);
  const [categorySwitches, setCategorySwitches] = useState({});
  const [addonId, setaddonid] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [addonbyid, setaddonbyid] = useState({
    id: addonId,
    name: "",
    desc: "",
    price: "",
  });

  const fetchaddonById = (addonId) => {

    fetch(`https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/GetAddonsById?Id=${addonId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        setaddonbyid(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleOpenaddon = (addonId) => {
    // setupdateaddon(true);
    setShow2(true)
    fetchaddonById(addonId);
    setaddonid(addonId);
  };
  const handleSwitchChange = (e, itemName) => {
    const { name, checked } = e.target;
    const updatedTemplate = user.map((item) =>
      item.id === itemName ? { ...item, [name]: checked } : item
    );
    setUser(updatedTemplate)
    AddonForAll(itemName, checked);
  };

  // const handleSwitchChange = (addon, addonForall) => {
  //   if (addonForall === true) {
  //     setEnable(false);
  //   } else {
  //     setEnable(true);
  //   }
  //   setCategorySwitches((prevState) => ({
  //     ...prevState,
  //     [addon]: !prevState[addon],
  //     [addonForall]: prevState[Enable],
  //   }));
  //   AddonForAll(addon, !addonForall);
  // };
  const handleCheckboxChange = (e, itemName) => {

    const { name, checked } = e.target;
    const updatedTemplate = user.map((item) =>
      item.id === itemName ? { ...item, [name]: checked } : item
    );
    setUser(updatedTemplate)
    AddonEnable(itemName, checked);
  };
  const handleaddonSwitchChange = (addonId, addonIndicator) => {

    if (addonIndicator === true) {
      setEnable(false);
    } else {
      setEnable(true);
    }

    setAddonSwitches((prevState) => ({
      ...prevState,
      [addonId]: {
        ...prevState[addonId],
        addonIndicator: !prevState[addonId]?.addonIndicator,
        // Other properties you might have
      },
    }));

    AddonEnable(addonId, !addonIndicator);
  };
  const initializeAddonSwitches = (data) => {
    const initialSwitches = {};
    data.forEach((addon) => {
      initialSwitches[addon.id] = {
        addonIndicator: addon.addonIndicator,
        // Other properties you might have
      };
    });
    setAddonSwitches(initialSwitches);
  };
  const AddonListData = () => {
    setLoading(true);
    return fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/AdddonsList"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch addon list');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        initializeAddonSwitches(data);
        setLoading(false);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching addon list:', error);
        setLoading(false);
        throw error;
      });
  };
  
  useEffect(() => {
    AddonListData();
  }, []);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [updateaddon, setupdateaddon] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseaddon = () => {
    setupdateaddon(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    addonIndicator: true,
    isforAll: true,
  });

  const AddonEnable = async (addon, addonIndicator) => {
    try {
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/EnableAddons?addonId=${addon}&indicator=${addonIndicator}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
        }
      );
      const data = await response.json();
      console.log("addons enable successfully!");
      AddonListData()
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const AddonForAll = async (addon, addonForall) => {
    try {
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/AddonsForAll?addonId=${addon}&forAll=${addonForall}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
        }
      );
      const data = await response.json();

      console.log("addons ForAll successfully Added!");
      AddonListData()
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleInputChangeEventFOrAddon = (e) => {
    const { name, value } = e.target;
    setaddonbyid((prevMenubyid) => ({
      ...prevMenubyid,
      [name]: value,
    }));
    console.log(addonbyid)
  };

  const handleInputChangeEventForString = (e) => {
    const { name, checked, value } = e.target;
    const val = e.target.value;
    console.log(formData);
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleInputChangeEventForBool = (e) => {
    const { name, checked, value } = e.target;
    const val = Boolean(e.target.checked);
    console.log(formData);
    setFormData({
      ...formData,
      [name]: val,
    });
  };
  const updateAddonBy = async (addonId) => {
    try {
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/UpdateAddons?id=${addonId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
          body: JSON.stringify(addonbyid),
        }
      );
      const data = await response.json();
      setaddonbyid({
        id: addonId,
        name: "",
        desc: "",
        menuIndicator: true,
      });

      console.log("category added successfully!");
      navigate("/addon");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const updateAddon = (event) => {
    event.preventDefault();
    updateAddonBy(addonId);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/Addons",
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

      setFormData({
        name: "",
        desc: "",
        price: 0,
        addonIndicator: true,
        isforAll: false,
      });
      console.log("addons added successfully!");
      navigate("/addon");
      window.location.reload()
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderradius: "13px",
  };
  return (
    <>
      <DashboardLayout />
      <main style={{ marginTop: "58px", backgroundColor: "#F9F8F9" }}>
        <div className="container">
          <DashboardHeader />
          <div className="default-padding">
            <div style={{ backgroundColor: " #F9F8F9" }}>
              <div className="container ">
                <div className="row pb-4">
                  <div className="col-md-6">
                    <h3 className="orderdashboard-color2 pb-4 ps-4">
                      {" "}
                      Add Ons
                    </h3>
                  </div>
                  <div className="col-md-6">
                    <div className="text-end" value="1">
                      <FontAwesomeIcon
                        className=""
                        onClick={handleShow}
                        icon={constants.faPlus}
                        style={{ color: "grey", height: "15px" }}
                      />
                    </div>
                  </div>
                </div>
                {loading ?(<ProgressSpinnerLo/>):(
                  <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="orderdashboard-color">
                        Name
                      </TableCell>

                      <TableCell className="orderdashboard-color">
                        Price
                      </TableCell>
                      <TableCell className="orderdashboard-color">
                        {" "}
                        Enable/Disable
                      </TableCell>
                      <TableCell className="orderdashboard-color">
                        For All
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="hover-color">
                 
                    {user.map((addon) => (
                      <TableRow key={addon.id} className="addontable">
                        <TableCell
                          className="orderdashboard-color1"
                          onClick={() => handleOpenaddon(addon.id)}
                        >
                          {addon.name}
                        </TableCell>
                        <TableCell className="orderdashboard-color1">
                          {addon.price}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={addon.addonIndicator}
                            name={'addonIndicator'}
                            onChange={(e) => handleCheckboxChange(e, addon.id)}
                            // onChange={() =>
                            //   handleaddonSwitchChange(
                            //     addon.id,
                            //     addonSwitches[addon.id]?.addonIndicator ) }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={addon.isforAll}
                            name={'isforAll'}
                            // onChange={() =>
                            //   handleSwitchChange(addon.id, addon.isforAll)
                            // }
                            onChange={(e) => handleSwitchChange(e, addon.id)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </TableCell>
                        <TableCell>
                          <NavLink aria-current="true">
                            <FontAwesomeIcon
                             onClick={() => handleOpenaddon(addon.id)}
                              className="pe-2 pt-4 "
                              icon={constants.faEdit}
                              style={{ color: "red", height: "20px" }}
                          
                              // onClick={() => handleOpenupdate(category.id)}
                            />
                          </NavLink>
                        </TableCell>
                      </TableRow>






                    ))}
                  </TableBody>
                </Table>
                ) }
                
              </div>
            </div>
          </div>
        </div>
        {/* Add ons */}
        <Modal
          show={show}
          onClose={handleClose}
          // aria-labelledby="child-modal-title"
          // aria-describedby="child-modal-description"
          // className="modal-padding"
          size="md"
          backdrop="static"
          style={{ opacity: show ? 1 : 0 }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* <Box
            sx={{ ...style, width: 500, height: 565 }}
            className="modalstyle"
          > */}
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleClose}
                className="pe-3"
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>

            <div className="addon logout px-4">
              <p className="py-3 px-5">Add Ons?</p>
            </div>
            <form className="addons-form px-5 " onSubmit={handleSubmit}>
              <div className="addon">
                <Switch
                  name="addonIndicator"
                  checked={formData.addonIndicator}
                  value={formData.addonIndicator}
                  onChange={handleInputChangeEventForBool}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Enable/Disable
              </div>
              <div className="addon">
                <Switch
                  checked={formData.isforAll}
                  value={formData.isforAll}
                  name="isforAll"
                  onChange={handleInputChangeEventForBool}
                  inputProps={{ "aria-label": "controlled" }}
                />
                For All
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="  form-group pt-4 pb-4">
                    <label className="pb-3 addon">Name</label>
                    <input
                      className="form-control "
                      required
                      id="name"
                      name="name"
                      placeholder="name"
                      value={formData.name}
                      onChange={handleInputChangeEventForString}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group pwd-container">
                    <label className="pb-3 addon">Description</label>
                    <input
                      className="form-control"
                      required
                      id="desc"
                      name="desc"
                      placeholder="desc"
                      value={formData.desc}
                      onChange={handleInputChangeEventForString}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group pwd-container">
                    <label className="pb-3 addon">Price</label>
                    <input
                      className="form-control"
                      required
                      id="price"
                      name="price"
                      placeholder="71$"
                      value={formData.price}
                      onChange={handleInputChangeEventForString}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="text-end">
                    <div className="py-4">
                      <button
                        type="submit"
                        className="btn btn-danger submitbtn"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          {/* </Box> */}
        </Modal>
 {/* Add ons */}
        <Modal
         show={show2}
         onClose={handleClose2}
          // open={updateaddon}
          // onClose={handleCloseaddon}
          // aria-labelledby="child-modal-title"
          // aria-describedby="child-modal-description"
          // className="modal-padding"
          size="md"
          backdrop="static"
          style={{ opacity: show2 ? 1 : 0 }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* <Box
            sx={{ ...style, width: 500, height: 500 }}
            className="modalstyle"
          > */}
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleClose2}
                className="pe-3"
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>

            <div className="addon logout px-4">
              <p className="py-3 px-5">Add Ons?</p>
            </div>
            <form className="addons-form px-5 " onSubmit={updateAddon}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group pt-4 pb-4">
                    <label className="pb-3 addon">Name</label>
                    <input
                      className="form-control "
                      required
                      id="name"
                      name="name"
                      placeholder="name"
                      value={addonbyid.name}
                      onChange={handleInputChangeEventFOrAddon}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group pwd-container">
                    <label className="pb-3 addon">Description</label>
                    <input
                      className="form-control"
                      required
                      id="desc"
                      name="desc"
                      placeholder="desc"
                      value={addonbyid.desc}
                      onChange={handleInputChangeEventFOrAddon}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group pwd-container">
                    <label className="pb-3 addon">Price</label>
                    <input
                      className="form-control"
                      required
                      id="price"
                      name="price"
                      placeholder="75$"
                      value={addonbyid.price}
                      onChange={handleInputChangeEventFOrAddon}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="text-end">
                    <div className="py-4">
                      <button
                        type="submit"
                        className="btn btn-danger submitbtn"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          {/* </Box> */}
        </Modal>
      </main>
    </>
  );
};

export default IngredientsModal;
