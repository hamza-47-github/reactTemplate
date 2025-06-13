import React, { useState,useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as constants from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';
import IngredientsModal from './IngredientsModal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';

import { useDropzone } from 'react-dropzone';
import ListItemText from '@mui/material/ListItemText';
import DashboardLayout from './DashboardLayout';
import DashboardHeader from './DashboardHeader';
import { NavLink, useNavigate } from 'react-router-dom';
import BlogList from './BlogList';

const Blog = () => {
  const navigate = useNavigate();
const [imageSrc, setImageSrc] = useState(null);
  const fileRef = useRef(null);
  useEffect(() => {
    if (imageSrc) {
      handleFileUpload(imageSrc);
    }
  }, [imageSrc]);
  
  const handleFileUpload = (imageSrc) => {
    
          setFormData({ ...formData, Image: imageSrc })
  }

  console.log(imageSrc)
  const [formData, setFormData] = useState({
    "title": "",
    "desc": "",
    "categoryId": 0,
    "menuId": 0,
    "image": '',
    "price": 0,
    "date": ""

  });
  function refreshPage() {
    window.location.reload(false);
  }
  const handleInputblog = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeblog = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch('https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Blog/AddBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Host': 'calculated when request is sent'
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setFormData({
        "title": "",
        "desc": "",
        "categoryId": 0,
        "menuId": 0,
        "image": '',
        "price": 0,
        "date": ""
      });
      console.log('Blog added successfully!');
      // refreshPage(); 

      navigate('/OrderDashboard');
          //  refreshPage(); 
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleFileUploadimg = (e) => {
    
    setFormData({ ...formData, Image: e.target.value })

  };

  const [isChecked, setIsChecked] = useState(false);

  const handleChange1 = () => {
    setIsChecked(!isChecked);
  };
  const [allchecked, setAllChecked] = React.useState([]);
  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedSize1, setSelectedSize1] = useState('');
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

  const [isChildModelOpen, setIsChildModelOpen] = useState(false);

  const handleOpen1 = () => {
    setIsChildModelOpen(true);
    setOpen1(true)
  };

  const handleClose1 = () => {
    setIsChildModelOpen(false);
    setOpen1(false)
  };

  const [inputValue, setInputValue] = useState('');
  const [outputValues, setOutputValues] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const saveAndShow = () => {
    if (inputValue.trim() !== '') {
      setOutputValues([...outputValues, inputValue]);
      setInputValue('');
    }
  };
  const [activeSection, setActiveSection] = useState('blogInfo'); 
  const [selectedSize, setSelectedSize] = useState(''); 

  const handleOpens = () => {
    setActiveSection('blogInfo');
  };

  const handleOpens2 = () => {
    setActiveSection('addOn');
  };

  const handleSizeChanges = (event) => {
    setSelectedSize(event.target.value);
  };

  const [toppings, setToppings] = useState([]);


  const [checkedItems, setCheckedItems] = useState({});

  const handleChangetopping = (event) => {
    setToppings(event.target.value);
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

  const [ingredients, setingredients] = useState([]);
  const handleChangeingredients = (event) => {
    setingredients(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    console.log(event.target.value)
    event.preventDefault();
  };
  const [inputTask, setInputTask] = useState('');
  const [list, setList] = useState([]);

  const handleAddTodo = () => {
    const newTask = {
      id: Math.random(),
      todo: inputTask
    };

    setList([...list, newTask]);
    setInputTask('');
  };

  const handleDeleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const handleInputChangetodo = (event) => {
    setInputTask(event.target.value);
  };

  const [cat, setCat] = useState([]);

  const fetccategory = () => {
    return fetch("https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Category/CategoryList")
      .then((response) => response.json())
      .then((data) => setCat(data)

      );
  }
  useEffect(() => {
    fetccategory();
  }, [])

  const handleInputCat = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <DashboardLayout />
      <main style={{  backgroundColor: "#F9F8F9" }}>
        <div className='container'>
          <DashboardHeader />
          <div className='default-padding '>
            <div >
              <div className='d-flex'>
                <div className={`pe-4 pb-0 section-selector  ${activeSection === 'blogInfo' ? 'selected-section' : ''}`} onClick={handleOpens}>
                  Add Blogs 
                </div>
                <div className={`ps-4 pb-0  section-selector ${activeSection === 'addOn' ? 'selected-section' : ''}`} onClick={handleOpens2}>
                  Blogs
                </div>
              </div>
              <hr></hr>
            </div>
            {activeSection === 'blogInfo' ? (
              <form onSubmit={handleInputChangeblog}>
                <div className="row pt-4 ">
                  <div className="col-md-6 pb-5 pt-4 ">
                  <TextField name='title' className="sub-font  textfield-padding menu-font menu-font1  form-control line-color line-color1" label=" Title" variant="filled" onChange={handleInputblog} />
                   

                  </div>
                  <div className="col-md-6 pt-4 pb-5">

                  <TextField name="desc" className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1 " label="Description" variant="filled" onChange={handleInputblog} />
                  </div>
                </div>
                <div className="row py-4 ">
                  <div className="col-md-6 pt-4 pb-5">
                  <FormControl fullWidth variant="filled" >
                      <InputLabel htmlFor="category-dropdown">Category</InputLabel>
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
                  {/* <TextField name="categoryId" className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1" label="Category" variant="filled" onChange={handleInputblog} /> */}

                  </div>
                  <div className="col-md-6 pt-4 pb-5" >
                  <TextField name="menuId" className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1" label="menuId" variant="filled" onChange={handleInputblog} />

                  </div>

                  <div className="col-md-6 pt-4 pb-5" >
                  <TextField name="price" className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1" label="Price" variant="filled" onChange={handleInputblog} />

                  </div>

                  <div className="col-md-6 pt-4 pb-5" >
                  <TextField name="date" type='date' className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1" variant="filled" onChange={handleInputblog} />

                  </div>

                </div>
                
                <div className='pt-5 px-3'>
                  <div
                    className='row text-center form-label  '
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                      backgroundColor: '#F1F1F1',
                      height: '200px',
                      border: '2px dashed #ccc',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }} name='Image' onChange={handleFileUploadimg}

                  >
                    <input
                      onChange={(e) => setImageSrc(e.target.files)}
                      type="file"
                      ref={fileRef}
                      name='image'
                      hidden
                      accept="image/*"
                    />
                    {imageSrc ? (
                      <img
                        onClick={() => fileRef.current.click()}
                        src={imageSrc}
                        alt="Dropped Image"
                        style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
                      />

                    ) : (
                      <p>Drag and drop an image here</p>
                    )}
                  </div>
                </div>
                <div className="text-end ">

                  <div className="py-4">
                    <button type="submit" className="btn btn-danger savebtn" >Save</button>
                  </div>
                </div>

              </form>
            ) : (
              <div className='container '>

                <BlogList/>
              </div>
            )}
          </div></div>

       
      </main>
    </>
  )
}

export default Blog