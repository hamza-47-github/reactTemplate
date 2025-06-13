import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import IngredientsModal from "./IngredientsModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import Badge from "react-bootstrap/Badge";
import { useDropzone } from "react-dropzone";
import ListItemText from "@mui/material/ListItemText";
import DashboardLayout from "./DashboardLayout";
import DashboardHeader from "./DashboardHeader";
import { NavLink, useNavigate } from "react-router-dom";
import Compress from "compress.js";
const MenuForm = () => {
  const navigate = useNavigate();
  const compress = new Compress();
  const [loading, setloading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const fileRef = useRef(null);
  const [inputTask, setInputTask] = useState("");
  const [list, setList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [allchecked, setAllChecked] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedSize1, setSelectedSize1] = useState("");
  const [isChildModelOpen, setIsChildModelOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [outputValues, setOutputValues] = useState([]);
  const [activeSection, setActiveSection] = useState("productInfo");
  const [selectedSize, setSelectedSize] = useState("");
  const [badges, setBadges] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [ingredientsLabel, setIngredientsLabel] = useState("Ingredients");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ID, setId] = useState();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [listTopping, setlistTopping] = useState([]);
  const [addonlist, setAddonlist] = useState([]);
  const [cat, setCat] = useState([]);
  const [byteArraynum, setbyteArray] = useState([]);
  const [filevalidation, setfilevalidation] = useState(false);
  const [menudiscount, setmenudiscount] = useState(false);
  const[errormesage,seterrormessage]=useState(true)

  useEffect(() => {
    fetccategory();
    fetchAddonsList();
  }, []);

  const fetchAddonsList = () => {
    return fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Addons/AdddonsList"
    )
      .then((response) => response.json())
      .then((data) => setAddonlist(data));
  };
  const fetccategory = () => {
    return fetch(
      "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/CategoryList"
    )
      .then((response) => response.json())
      .then((data) => setCat(data));
  };

  const handleInputCat = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (imageSrc) {
      handleFileUpload(imageSrc);
    }
  }, [imageSrc]);
  const handleFileUpload = (imageSrc) => {
    setFormData({ ...formData, Image: imageSrc });
  };
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    ingredients: null,
    price: 0,
    createdBy: 0,
    modifiedBy: 0,
    categoryId: 0,
    Imagebyte: null,
    addonIds: null,
    discount: 0,
  });
  const handleInputChangemenu = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlerInputChangemenudiscount = (e) => {
    const { name, value } = e.target;
    if (value >= 0 && value <= 100) {
      seterrormessage(true);
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      seterrormessage(false);
    }

 
  };
  const handleSubmitmenu = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/AddMenu",
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
      console.log(data);
      setloading(false);
      if (response.ok) {
        setFormData({
          name: "",
          desc: "",
          ingredients: null,
          price: 0,
          createdBy: 0,
          modifiedBy: 0,
          categoryId: 0,
          addonIds: null,
          Imagebyte: null,
          menuIndicator: true,
          discount: 0,

        });
      }
      console.log("Menu added successfully!");
      navigate("/menuDashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      setloading(false);
    }
  };

  const handleFileUploadimg = async (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0].size;
      const maxsize = 1 * 1000 * 1024;

      if (img > maxsize) {
        // setfilevalidation(true)
        await processImage(file);
        return false;
      } else {
        const byteArray = await convertImageToByteArray(file);
        
        setImageSrc(URL.createObjectURL(file));
        setFormData({ ...formData, Imagebyte: byteArray });
      }
    }
  };

  const processImage = async (file) => {
    try {
      // Step 1: Compress the image
      const fileSize = file.size;
      setImageSrc(URL.createObjectURL(file));
      const compressedFile = await compressImage(file);
      // Step 2: Convert the compressed image to byte array
      const byteArray = await convertImageToByteArray(compressedFile);
      // Optional: Set the byte array in the form data or component state
      setFormData({ ...formData, Imagebyte: byteArray });
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle the error, show user-friendly message, etc.
    }
  };

  // Function to compress the image
  const compressImage = async (file) => {
    const resizedImage = await compress.compress([file], {
      size: 1, // the max size in MB, defaults to 2MB
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
      resize: true,
    });
    const img = resizedImage[0];
    const base64str = img.data;
    const imgExt = img.ext;
    const compressedFile = Compress.convertBase64ToFile(base64str, imgExt);
    return compressedFile;
  };

  const convertImageToByteArray = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result.split(",")[1];
        const byteCharacters = atob(arrayBuffer);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        resolve(byteNumbers);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDrop = async (event) => {
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleChange1 = () => {
    setIsChecked(!isChecked);
  };
  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    handleOpen();
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
  const handleOpen1 = () => {
    setIsChildModelOpen(true);
    setOpen1(true);
  };
  const handleClose1 = () => {
    setIsChildModelOpen(false);
    setOpen1(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOpens = () => {
    setActiveSection("productInfo");
  };
  const handleOpens2 = () => {
    setActiveSection("addOn");
  };
  const handleSizeChanges = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleChangetopping = (event) => {
    setSelectedToppings(event.target.value);
    const addonIdsList = event.target.value;
    // setlistTopping(addonIdsList)
    const addonIdsString = addonIdsList.join(",");
    setFormData({ ...formData, addonIds: addonIdsString });
  };

  const handleCheckboxToggle = (value) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [value]: !prevCheckedItems[value],
    }));

    setToppings((prevToppings) => {
      if (prevToppings.includes(value)) {
        return prevToppings.filter((topping) => topping !== value);
      } else {
        return [...prevToppings, value];
      }
    });
  };

  const handleChangeingredients = (event) => {
    const selectedIngredients = event.target.value.filter(
      (ingredient) => ingredient !== null
    );
    setIngredients(selectedIngredients);
    const categoryitems = selectedIngredients;
    const stringRepresentation = categoryitems.join(",");
    setFormData({ ...formData, ingredients: stringRepresentation });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputTask.trim() !== "") {
      setBadges([...badges, { id: Date.now(), todo: inputTask }]);
      setInputTask("");
    }
  };
  const handleDeleteBadge = (id) => {
    const updatedBadges = badges.filter((badge) => badge.id !== id);
    setBadges(updatedBadges);

    updateIngredientsLabel(updatedBadges);
  };
  const updateIngredientsLabel = (updatedBadges) => {
    const updatedIngredientsList = updatedBadges.map((badge) => badge.todo);
    setIngredientsList(updatedIngredientsList);

    if (updatedIngredientsList.length === 1) {
      setIngredientsLabel(`Ingredients: ${updatedIngredientsList[0]}`);
    } else if (updatedIngredientsList.length > 1) {
      setIngredientsLabel(
        `Ingredients: ${updatedIngredientsList[0]} + ${
          updatedIngredientsList.length - 1
        } others`
      );
    } else {
      setIngredientsLabel("Ingredients");
    }
  };
  const handleInputChangetodo = (e) => {
    setInputTask(e.target.value);
  };
  const handleSaveIngredients = () => {
    const ingredientsString = badges.map((badge) => badge.todo).join(", ");
    setIngredientsLabel(`Ingredients: ${ingredientsString}`);
    handleClose2();
  };
  const handleSave = () => {
    if (inputTask.trim() !== "") {
      const updatedBadges = [...badges, { id: Date.now(), todo: inputTask }];
      setBadges(updatedBadges);

      updateIngredientsLabel(updatedBadges);
      setInputTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Save and show in badges
      e.preventDefault();
      handleSave();
    }
  };
  const isFormValid = Object.values(formData).every((value) => {
  
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    return true; 
  });
  return (
    <>
      <DashboardLayout />
      <main style={{ backgroundColor: "#F9F8F9" }}>
        <div className="container">
          <DashboardHeader />
          <div className="default-padding ">
            <div>
              <div className="d-flex">
                <div
                  className={`pe-4 pb-0 section-selector  ${
                    activeSection === "productInfo" ? "selected-section" : ""
                  }`}
                  onClick={handleOpens}
                >
                  Product Info
                </div>
              </div>
              <hr></hr>
            </div>

            <form onSubmit={handleSubmitmenu}>
              <div className="row pt-4 ">
                <div className="col-md-6 pb-5 pt-4 ">
                  <TextField
                    name="name"
                    className="sub-font  textfield-padding menu-font menu-font1  form-control line-color line-color1"
                    label="Product Name"
                    variant="filled"
                    onChange={handleInputChangemenu}
                  />
                </div>
                <div className="col-md-6 pt-4 pb-2">
                  <FormControl
                    fullWidth
                    variant="filled"
                    className="category-fill"
                  >
                    <InputLabel htmlFor="category-dropdown">
                      Category
                    </InputLabel>
                    <Select
                      labelId="category-dropdown"
                      id="category-dropdown"
                      value={formData.categoryId}
                      onChange={handleInputCat}
                      name="categoryId"
                    >
                      {cat.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>


                  </FormControl>

                  
                </div>
              </div>
              <div className="row pb-4 ">
                <div className="col-md-6 pt-4 pb-5">
                  <TextField
                    name="price"
                    className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                    label="Price"
                    variant="filled"
                    onChange={handleInputChangemenu}
                  />
                </div>
                <div className="col-md-6 pt-4 pb-5">
                  <TextField
                    name="desc"
                    className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                    label="Description"
                    variant="filled"
                    onChange={handleInputChangemenu}
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-6 ">
                  <FormControl fullWidth variant="filled">
                    <InputLabel
                      htmlFor="ingredients"
                      onChange={handleInputChangemenu}
                    >
                      Ingredients
                    </InputLabel>
                    <Select
                      labelId="ingredients-label"
                      id="ingredients"
                      multiple
                      value={ingredients}
                      onChange={handleChangeingredients}
                      renderValue={(selected) => (
                        <div className="d-flex">
                          {selected.length > 0 && (
                            <Chip
                              key={selected[0]}
                              label={selected[0]}
                              style={{ marginRight: 5 }}
                            />
                          )}
                          {selected.length > 1 && (
                            <Chip
                              label={`(+${selected.length - 1} ${
                                selected.length === 2 ? "other" : "others"
                              })`}
                            />
                          )}
                        </div>
                      )}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <p className="ps-4">Add Ingredients</p>
                        </div>
                        <div className="col-md-6 text-end">
                          <FontAwesomeIcon
                            className="pe-3 "
                            onClick={handleOpen2}
                            icon={constants.faPlus}
                            style={{ color: "grey" }}
                          />
                        </div>
                      </div>
                      {ingredientsList.map((ingredient) => (
                        <MenuItem key={ingredient} value={ingredient}>
                          <Checkbox
                            checked={ingredients.indexOf(ingredient) > -1}
                          />
                          <ListItemText primary={ingredient} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 ">
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="toppings-label">Addons</InputLabel>
                    <Select
                      labelId="toppings-label"
                      id="toppings"
                      multiple
                      value={selectedToppings}
                      onChange={handleChangetopping}
                      renderValue={(selected) => (
                        <div className="d-flex">
                          {selected.map((toppingId, index) => (
                            <Chip
                              key={index}
                              label={
                                addonlist.find(
                                  (topping) => topping.id === toppingId
                                )?.name || ""
                              }
                            />
                          ))}
                          {listTopping.length > 1 && (
                            <Chip
                              label={`(+${listTopping.length - 1} ${
                                listTopping.length === 2 ? "other" : "others"
                              })`}
                            />
                          )}
                        </div>
                      )}
                    >
                      <div className="row"></div>
                      {addonlist.map((topping) => (
                        <MenuItem key={topping.id} value={topping.id}>
                          <Checkbox
                            checked={selectedToppings.indexOf(topping.id) > -1}
                          />
                          <ListItemText primary={topping.name} />
                          {topping.id}
                          {topping.price}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row pb-4 ">
                <div className="col-md-6 pt-4 pb-5">
                  <TextField
                    name="discount"
                    className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                    label="Discount %"
                    variant="filled"
                    onChange={handlerInputChangemenudiscount}
                  />

                 
                </div>
                {errormesage ? (
                        <p style={{ color: "red" }}>
                        
                        </p>
                      ) : (
                        <p  style={{ color: "red" }}>  Enter Between 0 to 100.</p>
                      )} 
                {/* <span style={{color:'red'}}>{errormesage}</span> */}
              
              </div>
              <div className="pt-5 px-3">
                <div
                  className="row text-center form-label"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    backgroundColor: "#F1F1F1",
                    height: "200px",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    onChange={handleFileUploadimg}
                    type="file"
                    ref={fileRef}
                    name="Image"
                    hidden
                    accept="image/*"
                  />
                  {imageSrc ? (
                    <img
                      onClick={() => fileRef.current.click()}
                      src={imageSrc}
                      alt="Dropped Image"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <>
                      {/* {filevalidation ? (
                        <p style={{ color: "red" }}>
                          File size exceeds 5MB. Please choose a smaller file.
                        </p>
                      ) : (
                        <p></p>
                      )} */}
                    </>
                  )}
                </div>
                <input
                  onChange={handleFileUploadimg}
                  type="file"
                  ref={fileRef}
                  name="Image"
                  accept="image/*"
                />
              </div>

              <div className="text-end ">
                <div className="py-4">
                  <button type="submit" className="btn btn-danger savebtn" disabled={!isFormValid}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"
                     
                 
                      ></span>
                    )}
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          className="modal-padding"
        >
          <Box
            sx={{ ...style, width: 500, height: 500 }}
            className=""
          >
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleClose1}
                className="pe-3"
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>
            <div className="addon logout px-4">
              <p className="py-3 px-5">Product Size</p>
            </div>

            <form className="login-form px-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="  form-group pt-4 pb-4">
                    <label className="pb-3 addon">Name</label>
                    <input
                      className="form-control "
                      required
                      id="username"
                      name="Name"
                      placeholder="Name"
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
          </Box>
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          className="modal-padding"
        >
          {/* Modal content */}
          <Box sx={{ ...style, width: 500, height: 500 }} className="">
            <div className="text-end modal-icon">
              <FontAwesomeIcon
                onClick={handleClose2}
                className="pe-3 "
                icon={constants.faCircleXmark}
                style={{ color: "red", height: "20px" }}
              />
            </div>
            <div className="addon logout px-4">
              <p className="py-3 px-5">Ingredients</p>
            </div>

            <form className="login-form px-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="  form-group pt-4 pb-4">
                    <input
                      className="form-control "
                      type="text"
                      value={inputTask}
                      onChange={handleInputChangetodo}
                      placeholder="Type here"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="badges-container ">
                    {badges.map((badge) => (
                      <div key={badge.id} className="badge badge-css ">
                        <div className="d-flex row pt-2">
                          <div className="col-md-6 text-center">
                            {badge.todo}
                          </div>
                          <div className="col-md-6  text-end pb-5">
                            <FontAwesomeIcon
                              className=" "
                              onClick={() => handleDeleteBadge(badge.id)}
                              icon={constants.faCircleXmark}
                              style={{ color: "#fff", height: "15px" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-end">
                    <div className="py-4">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="btn btn-danger submitbtn"
                      >
                        Add
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

export default MenuForm;
