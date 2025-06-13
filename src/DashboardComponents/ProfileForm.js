import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";
import TextField from "@mui/material/TextField";
import DashboardHeader from "./DashboardHeader";
import showPwdImg from "../show-password.svg";
import hidePwdImg from "../hide-password.svg";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const ProfileForm = () => {
  const Swal = require('sweetalert2')
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const userid = localStorage.getItem("id");
  const usertypeid = localStorage.getItem("userTypeId");
  const username = localStorage.getItem("username");
  const contact = localStorage.getItem("contact");
  const email = localStorage.getItem("email");
  const address = localStorage.getItem("address");
  const current_password = localStorage.getItem("password");
  const [userbyid, setuserbyid] = useState({
    userTypeId: usertypeid,
    id: userid,
    username: username,
    contact: contact,
    email:email,
    address: address,
    password: current_password,
   confirmpassword: "",
  });
  const [imageSrc, setImageSrc] = useState("/assests/img/Admin pic.jpg");
  // const fileInputRef = useRef(null);

  // const handleEditIconClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];

  //   if (selectedFile) {
  //     // Assuming you want to handle image change by updating the state
  //     const reader = new FileReader();
  //     // reader.onload = (e) => {
  //     //   setImageSrc(e.target.result);
  //     // };
  //     reader.readAsDataURL(selectedFile);

  //     // Add your logic for handling the selected file, e.g., uploading to a server
  //     // Note: This logic is just an example, you may need to adjust it based on your requirements
  //   }
  // };
  
  const updateProfileBy = async (user) => {
    console.log(user)
    try {
      
      const response = await fetch(
        `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/UserRegistration/UpdateUser?id=${user.id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
      setuserbyid({
        userTypeId:usertypeid,
        id:userbyid,
        username: data.username,
        contact: data.contact,
        email: data.email,
        address: data.address,
        password:data.password,
        confirmpassword:"",
      });
localStorage.setItem("username",userbyid.username)
localStorage.setItem("contact",userbyid.contact)
localStorage.setItem("email",userbyid.email)
localStorage.setItem("address",userbyid.address)
localStorage.setItem("password",userbyid.password)

}
    
      
    } catch (error) {
      
    }
  };
  const updateProfile = (event) => {
   
    if(userbyid.password===userbyid.confirmpassword){
    event.preventDefault();
    updateProfileBy(userbyid);
    Swal.fire({
      icon: "success",
      title: "Congrats...",
      text: "Profile Updated!",
      denyButtonText:"OK"
    });
    }
    else{
      event.preventDefault();
   
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password not matched!",
       
      });
    }
  };
  const handleInputChangeEventForUser = (e) => {
    
    const { name, value } = e.target;
    
    setuserbyid((userbyid) => ({
      ...userbyid,
      [name]: value,
    }));
    console.log(userbyid)
  };
  return (
    <>
      <DashboardLayout />
      <main style={{ backgroundColor: "#F9F8F9" }}>
        <div className="Profile-background container">
          <DashboardHeader />
          <div className="container default-padding">
            <h4 className="profile pb-4">Settings</h4>
            <form className="row g-3" onSubmit={updateProfile}>
              <div className="profile-border py-4 px-4">
                <div className="d-flex gap-4 ps-4 pt-4 ">
                  <div className="position-relative">
                    <img
                      src="./images/Avatar.jpg"
                      alt="Avatar"
                      width="80px"
                      height="80px"
                      className="rounded-circle"
                    />
                    {/* <div
                      className="bg-primary1 rounded-circle d-flex"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "28px",
                        height: "28px",
                        background: "#E7272D",
                      }}
                    >
                      <i
                        className="fa fa-pencil ps-3 pt-2 text-white"
                        aria-hidden="true"
                        onClick={handleEditIconClick}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="file"
                          id="input-file-max-fs"
                          className="addon form-control file-upload"
                          data-max-file-size="2M"
                          placeholder="Drag & Drop Your Image Here"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </i>
                    </div> */}
                  </div>
                  <div className="">
                    <h4 className="profile1">Personal Details</h4>
                    <p className="profile2">Profile photo</p>
                  </div>
                </div>
                <div className="col-md-6 py-5">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                      type=""
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="name"
                      value={userbyid.username}
                      name="username"
                      onChange={handleInputChangeEventForUser}
                    />
                  </div>
                  {/* <TextField id="filled-basic" className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1" label="Name" variant="filled" value={username} /> */}
                </div>
              
                <div className="col-md-6 py-5">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone number</label>
                    <input
                      type=""
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Phone number"
                      value={userbyid.contact}
                      name="contact"
                      onChange={handleInputChangeEventForUser}
                    />
                  </div>
                  {/* <TextField
                    id="filled-basic"
                    className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                    label="Phone number"
                    variant="filled"
                    value={contact}
                  /> */}
                </div>
                <div className="col-md-6 py-5">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type=""
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      value={userbyid.email}
                      name="email"
                      onChange={handleInputChangeEventForUser}
                    />
                  </div>
                  
                  {/* <TextField
                    id="filled-basic"
                    className="pb-4 sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                    label="Email"
                    variant="filled"
                    value={email}
                  /> */}
                </div>
                <div className="col-md-6 py-5">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Address</label>
                    <input
                      type= ""
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="St#4 NY"
                      value={userbyid.address}
                      name="address"
                      onChange={handleInputChangeEventForUser}
                    />
                  </div>
                  {/* <TextField
                    id="filled-basic"
                    className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                    label=""
                    variant="filled"
                  /> */}
                </div>
              </div>
              <div className="py-4"></div>
              <div className="updatepassword profile-border p-4">
                <h4 className="pt-4 ps-4">Password Change</h4>
                <div className="">
                  <div className="col-md-6 py-5">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">New Password</label>
                    <input
                      type=""
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Current Password"
                      value={userbyid.password}
                      name="password"
                      onChange={handleInputChangeEventForUser}
                    />
                  </div>
                    {/* <TextField
                      id="filled-basic"
                      className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                      label="Current Password"
                      variant="filled"
                      value={current_password}
                    /> */}
                  </div>
                  <div className="col-md-6 py-5 form-group pwd1-container">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Re-Enter Password</label>
                    <input
                      type={isRevealPwd ? "password" : "text"}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="New Password"
                      value={userbyid.confirmpassword}
                      name="confirmpassword"
                      onChange={handleInputChangeEventForUser}
                    />
                  </div>
                    {/* <TextField
                      id="filled-basic"
                      className="sub-font  menu-font menu-font1  textfield-padding form-control line-color line-color1"
                      label="New Password "
                      variant="filled"
                      value={current_password}
                      type={isRevealPwd ? "password" : "text"}
                    /> */}
                    {/* <img
                      title={isRevealPwd ? "Hide password" : "Show password"}
                      src={isRevealPwd ? hidePwdImg : showPwdImg}
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                    /> */}
                  </div>
                </div>

                <div className="col-md-12 pt-4">
                  <div className=" pt-4 SaveSettingBtn text-end">
                    <button type="submit" className="btn btn-danger">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileForm;
