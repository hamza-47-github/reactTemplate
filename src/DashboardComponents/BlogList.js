import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as constants from '@fortawesome/free-solid-svg-icons'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';


const BlogList = () => {
  const [user, setUser] = useState([]);

  const fetchData = () => {
    return fetch("https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Blog/GetAllBlog")
      .then((response) => response.json())
      .then((data) => setUser(data)

      );
  }
  useEffect(() => {
    fetchData();
  }, [])
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [formData, setFormData] = useState({
    "title": "",
    "desc": "",
    "menuName": "",
    "categoryName": "",
    "price": "",
    "date": ""
  });

  const handleInputChange1 = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div style={{ backgroundColor: " #F9F8F9" }}>

        <div className='container ' >
          <div className='row pb-4'>
            <div className='col-md-6'>
              <h2 className=' addon' value='1'>
                Blog List
              </h2>
            </div>
            
          </div>
                    <div className='row sub-addon'>
            <div className='col-md-1 '>
             
            </div>
            <div className='blog-font  px-4 py-4 ps-1 col-md-2 pt-4'>
              Title
            </div>
            <div className='blog-font  px-4 py-4 ps-1 col-md-2 pt-4'>
              <div className='text-end'>
              Description
              </div>
            </div>
            <div className='blog-font  px-4 py-4 ps-1 col-md-2 pt-4'>
              <div className='text-end'>
              Category
              </div>
            </div>
            <div className='blog-font  px-4 py-4 ps-1 col-md-2 pt-4'>
              <div className='text-end'>
              Price
              </div>
            </div>
            <div className='col-md-2 pt-4'>
              <div className='text-end'>
              Date
              </div>
            </div>
            <hr></hr>
          </div>

          {user.map((blog) => (
            <div className=' row sub-addon ' key={blog.id}>
              <div >
              </div>
              <div className='col-md-1 '>
                <input value={blog.id} type='checkbox' />
              </div>
              <div className='col-md-2 pt-4'>
                <p>{blog.title}</p>
              </div>
              <div className='col-md-2 pt-4'>
                <div className='text-end' >
                  {blog.desc}
                </div>

              </div>
              <div className='col-md-2 pt-4'>
                <div className='text-end'>
                  {blog.categoryName}
                </div>

              </div>
              <div className='col-md-2 pt-4'>
                <div className='text-end' >
                  {blog.price}
                </div>

              </div>
              <div className='col-md-2 pt-4'>
                <div className='text-end' >
                  {blog.date}
                </div>

              </div>
            
              <hr></hr>
            </div>
          ))}
        </div>
        <div className="row">
          <div className='col-md-8'></div>
          <div className="col-md-2 text-end">
            <div className="">
              <div className="py-4">
                <button type="submit" className="btn edit-btn ">
                  <FontAwesomeIcon className='pe-4' icon={constants.faEdit} style={{ color: 'black' }} />
                  Edit</button>
              </div>
            </div>

          </div>
          <div className="col-md-2">
            <div className="">
              <div className="py-4">
                <button type="submit" className="btn btn-danger savebtn">
                  <FontAwesomeIcon className='pe-4' icon={constants.faTrash} style={{ color: 'white' }} />
                  Delete</button>

              </div>
            </div>
          </div>
        </div>
      </div>


      
    </>
  )
}

export default BlogList