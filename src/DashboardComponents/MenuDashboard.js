import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardLayout from "./DashboardLayout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

const MenuDashboard = () => {
  const [loading, setloading] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [dropdwonid, setdropdownid] = useState(1);
  const [categoryid, setcategoryid] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categorySwitches, setCategorySwitches] = useState({});
  const [categorymenu, setCategoryMenu] = useState([]);
  const [menubyid, setmenubyid] = useState({
    id: categoryid,
    name: "",
    description: "",
    catIndicator: true,
  });
  const handleSwitchChange = (e, itemName) => {
    const { name, checked } = e.target;
    const updatedTemplate = categories.map((item) =>
      item.id === itemName ? { ...item, [name]: checked } : item
    );
    setCategories(updatedTemplate);
    CategoryEnable(itemName, checked);
  };
  const handleMenuSwitchChangess = (e, itemName) => {
    const { name, checked } = e.target;
    const updatedTemplate = categorymenu.map((item) =>
      item.id === itemName ? { ...item, [name]: checked } : item
    );
    setCategoryMenu(updatedTemplate);
    MenuEnable(itemName, checked);
  };
  const CategoryEnable = async (categoryId, CatIndicator) => {
    try {
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/EnableCategory?categoryId=${categoryId}&indicator=${CatIndicator}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
        }
      );
      const data = await response.json();

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const MenuEnable = async (menucategory, menuIndicator) => {
    try {
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/EnableMenu?menuId=${menucategory}&indicator=${menuIndicator}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
        }
      );
      const data = await response.json();

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [menucategorySwitches, setmenuCategorySwitches] = useState({});

  // const handleMenuSwitchChange = (menucategory, checked) => {
  //   setmenuCategorySwitches((prevState) => ({
  //     ...prevState,
  //     [menucategory.id]: checked,
  //   }), () => {
  //     handleSubmitmenu(menucategory, checked);
  //   });
  // };
  const handleChange = (event) => {
    
    setChecked(event.target.checked);
    const { name, value,checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  // const handleSubmitmenu = (menucategory, isCheck) => {
  //   try {
  //     menucategory.catIndicator = isCheck;

  //     fetch(`https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/UpdateCategory?id=${menucategory.id}`, {
  //       method: 'PUT',
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //         } else {
  //           console.error(`Failed to update category ${menucategory.id} status.`);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  // const handleMenuSwitchChange = (menucategory, checked) => {
  //   setmenuCategorySwitches(
  //     (prevState) => ({
  //       ...prevState,
  //       [menucategory.id]: checked,
  //     }),
  //     () => {
  //       handleSubmitmenu(menucategory, checked);
  //     }
  //   );
  // };
  // const handleChange = (event) => {

  //   const { checked, value } = event.target;
  //   const val = Boolean(event.target.checked);
  //   setChecked(event.target.checked);
  //   setFormData({
  //     ...formData,
  //     catIndicator: val,
  //   });
  // };
  const handleSubmitmenu = (menucategory, isCheck) => {
    try {
      // Assuming menucategory is an object with an id property
      menucategory.catIndicator = isCheck;

      fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/UpdateCategory?id=${menucategory.id}`,
        {
          method: "PUT",
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log(
              `Category ${menucategory.id} status updated successfully.`
            );
            // You might want to handle state updates or other actions here
          } else {
            console.error(
              `Failed to update category ${menucategory.id} status.`
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const username = localStorage.getItem("Username");
  const navigate = useNavigate();
  const [CategoryListloading, setCategoryListloading] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryStyle, setSelectedCategoryStyle] = useState({});
  useEffect(() => {
    fetchData();
    menuData(1);
    // if (selectedCategoryId !== null) {

    //   menuData(selectedCategoryId);
    // }
  }, []);
  const fetchData = () => {
    setCategoryListloading(true);

    fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/CategoryList"
    )
      .then((response) => response.json())
      .then((data) => {
        const firstCategoryId = data.length > 0 ? data[0].id : null;
        setSelectedCategoryId(firstCategoryId);
        setCategories(data);
        setCategoryListloading(false); // Move this line inside the .then block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCategoryListloading(false);
      });
  };
  const [prevSelectedCategoryId, setPrevSelectedCategoryId] = useState(null);
  const handleCategoryClick = (categoryId) => {
    setdropdownid(categoryId);
    menuData(categoryId);
    if (prevSelectedCategoryId !== null) {
      setSelectedCategoryStyle((prevState) => ({
        ...prevState,
        [prevSelectedCategoryId]: {},
      }));
    }

    setSelectedCategoryId(categoryId);
    setPrevSelectedCategoryId(categoryId);

    setSelectedCategoryStyle((prevState) => ({
      ...prevState,
      [categoryId]: { backgroundColor: "#FFEAEA" },
    }));
  };

  const menuData = async (categoryId) => {
    try {
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/MenuByCategory?cat=${categoryId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setCategoryMenu(data);
    } catch (error) {
      console.error("Error fetching menu data:", error.message);
    }
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const menubyId = (categoryId) => {
    

    fetch(
      `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/GetCategoryById?Id=${categoryId}`
    )
      .then((response) => response.json())
      .then((data) => setmenubyid(data));
  };
  const menuby = async (categoryId) => {
    try {
      setloadingUpdate(true);
      
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/UpdateCategory?id=${categoryId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when request is sent",
          },
          body: JSON.stringify(menubyid),
        }
      );
      const data = await response.json();
      console.log(data);
      setloadingUpdate(false);
      setopencategory(false);
      setmenubyid({
        id: categoryId,
        name: "",
        description: "",
        menuIndicator: true,
      });
      // navigate("/MenuDashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      setloadingUpdate(false);
    }
  };
  const handleInputChangeupdatbyname = (event) => {
    const { name, value } = event.target;
    setmenubyid((prevMenubyid) => ({
      ...prevMenubyid,
      name: value,
    }));
  };
  const handleInputChangeupdatedesc = (event) => {
    const { name, value } = event.target;
    setmenubyid((prevMenubyid) => ({
      ...prevMenubyid,
      desc: value,
    }));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [opencategory, setopencategory] = useState(false);
  const [updatecategory, setupdatecategory] = useState(false);

  const [Enable, setEnable] = useState(false);
  const handleOpencategory = () => {
    setopencategory(true);
  };

  const handleClosecategory = () => {
    setopencategory(false);
  };
  const handleOpenupdate = (categoryId) => {
    setupdatecategory(true);
    menubyId(categoryId);
    setcategoryid(categoryId);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch data or perform any other necessary actions
    menuby(categoryid);
  };
  const handleCloseupdate = () => {
    setupdatecategory(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    catIndicator: true,
  });

  const handleInputChangecat = (e) => {
    // const { name, value } = e.target;
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  const handleInputChangecat1 = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };
  const handleSubmitcategory = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/AddCategory",
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
      setOpen(true);
      setloading(false);
      // window.location.reload();

      setFormData({
        name: "",
        description: "",
        catIndicator: true,
      });

      navigate("/MenuDashboard");
      handleClosecategory();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
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
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <DashboardLayout />

      <main style={{ backgroundColor: "#F9F8F9" }}>
        <div className="container pt-4">
          {CategoryListloading ? (
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
              }}
            >
              <div
                className="spinner-border loading text-primary"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <DashboardHeader />

              <div className="orderdashboard-background">
                <div className="default-padding">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card ">
                        <div className="row d-flex">
                          <div className="col-md-6">
                            <h2 className="Category-font px-4 py-4 ps-5">
                              Categories
                            </h2>
                          </div>
                          <div className=" col-md-6 px-4 py-4 text-end">
                            <FontAwesomeIcon
                              className="pe-5"
                              icon={constants.faPlus}
                              style={{ color: "grey" }}
                              onClick={handleOpencategory}
                            />

                            {/* <FontAwesomeIcon className='pe-5' icon={constants.faTrash} style={{ color: 'grey' }} /> */}
                          </div>
                        </div>
                        {categories.map((category, index) => (
                          <div
                            className="Category-subfont row gx-0 text-end pe-5"
                           
                            key={index}
                            onClick={() => handleCategoryClick(category.id)}
                            style={selectedCategoryStyle[category.id] || {}}
                          >
                            <div className="col-md-6 "  style={{cursor:'pointer'}}>
                              <div className="py-4 px-4">
                                <h5 className="text-start" >{category.name}</h5>
                              </div>
                            </div>
                            <div className="col-md-6 ">
                              <Switch
                                name={"catIndicator"}
                                checked={category.catIndicator}
                                onChange={(e) =>
                                  handleSwitchChange(e, category.id)
                                }
                                // onChange={() =>
                                //   handleSwitchChange(
                                //     category.id,
                                //     category.catIndicator
                                //   )
                                // }
                                inputProps={{ "aria-label": "controlled" }}
                              />
                              <NavLink aria-current="true">
                                <FontAwesomeIcon
                                  className="pe-2 pt-4 "
                                  icon={constants.faEdit}
                                  style={{ color: "red" }}
                                  onClick={() => handleOpenupdate(category.id)}
                                />
                              </NavLink>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div
                        className="card "
                        style={{ backgroundColor: "#fff" }}
                      >
                        <div className="row d-flex">
                          <div className="col-md-6">
                            <h2 className="Category-font px-4 py-4 ps-5">
                              {
                                categories.find(
                                  (cat) => cat.id === selectedCategoryId
                                )?.name
                              }
                            </h2>
                          </div>
                          <div className="col-md-6 px-4 py-4 text-end">
                            <NavLink to="/MenuForm" aria-current="true">
                              <FontAwesomeIcon
                                className="pe-5"
                                icon={constants.faPlus}
                                style={{ color: "grey" }}
                              />
                            </NavLink>
                            {/* <FontAwesomeIcon className='pe-5' icon={constants.faTrash} style={{ color: 'grey' }} /> */}
                          </div>
                        </div>
                        {categorymenu.map((menucategory, index) => (
                          <div className="Category-subfont row text-end pe-5">
                            <div className="col-md-6 " key={index} style={{cursor:'pointer'}}>
                              <div className="py-4  px-4">
                                <h5 className="text-start" >
                                  {menucategory.name}
                                </h5>
                              </div>
                            </div>
                            <div className="col-md-6 ">
                              <Switch
                                name="menuIndicator"
                                checked={menucategory.menuIndicator}
                                onChange={(e) =>
                                  handleMenuSwitchChangess(e, menucategory.id)
                                }
                                // onChange={() =>
                                //   handleMenuSwitchChange(
                                //     menucategory.id,
                                //     menucategory.menuIndicator
                                //   )
                                // }
                                inputProps={{ "aria-label": "controlled" }}
                              />
                              <NavLink
                                to={`/updatemenuform/${menucategory.id}`}
                                aria-current="true"
                              >
                                <FontAwesomeIcon
                                  className="pe-2 pt-4 "
                                  icon={constants.faEdit}
                                  style={{ color: "red" }}
                                />
                              </NavLink>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <DashboardHeader /> */}
        </div>

        <Modal
          open={opencategory}
          onClose={handleClosecategory}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{ ...style, width: 500, height: 500 }}
            className="modalstyle"
          >
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleClosecategory}
                className="pe-3"
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>
            <form className="addons-form " onSubmit={handleSubmitcategory}>
              <div className="addon">
                <Switch
                  name="catIndicator"
                  checked={formData.catIndicator}
                  // value={formData.catIndicator}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Categoryss
              </div>
              <hr></hr>
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
                      // value={formData.name}
                      onChange={handleInputChange1}
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
                      id="description"
                      name="description"
                      placeholder="desc"
                      // value={formData.description}
                      onChange={handleInputChange1}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-end">
                    <div className="py-4">
                      <button
                        className="btn btn-danger submitbtn"
                        // onClick={() => {
                        //   handleClosecategory();
                        // }}
                        disabled={loading}
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </Modal>

        <Modal
          open={updatecategory}
          onClose={handleCloseupdate}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{ ...style, width: 500, height: 500 }}
            className="modalstyle"
          >
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleCloseupdate}
                className="pe-3"
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>
            <form className="addons-form " onSubmit={handleSubmit}>
              <div className="addon">
                <Switch
                name="catIndicator"
                  checked={menubyid.catIndicator}
                  // value={menubyid.menuIndicator}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Category
              </div>

              <hr></hr>
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
                      value={menubyid.name}
                      onChange={handleInputChangeupdatbyname}
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
                      id="description"
                      name="description"
                      placeholder="desc"
                      value={menubyid.description}
                      onChange={handleInputChangeupdatedesc}
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
                        disabled={loadingUpdate}
                      >
                        {loadingUpdate && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </main>
    </>
  );
};

export default MenuDashboard;
