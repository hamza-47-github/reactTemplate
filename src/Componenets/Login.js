import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constants from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import showPwdImg from "../show-password.svg";
import Header from "./Header.tsx";
import Footer from "./Footer";
import hidePwdImg from "../hide-password.svg";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
const Login = () => {
  const [loading, setloading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true); // Set loading to true before making the API call
      const response = await fetch(
        "https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/UserRegistration/Token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Host: "calculated when the request is sent",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      setloading(false);
      localStorage.setItem("userTypeId", data.userTypeId);
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("contact", data.contact);
      localStorage.setItem("email", data.email);
      localStorage.setItem("address", data.address);

      localStorage.setItem("password", data.password);
      if (data.userTypeId === 2) {
        navigate("/OrderDashboard");
        toastr.success('Login Successfully ');
      } else {
        // navigate('/OrderDashboard');
      }
      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      setloading(false); // Set loading to false in case of an error
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* <Header/> */}
      <div className="background-regimg">
        <div className="contact-us-area default-padding">
          <div className="container form-padding">
            <div className="row">
              <div className="contact-box">
                <div className="col-md-4"></div>

                <div className="col-md-4 form-box">
                  <div className="register-form">
                    <div className="text-center">
                      <img
                        src="/assests/img/form-logo.png"
                        alt="form-logo"
                        className="img-fluid "
                      />
                    </div>
                    <div className="grey-text pb-4">
                      <h3>Log in to continue!</h3>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              required
                              id="username"
                              name="username"
                              placeholder="Username"
                              type="text"
                              value={formData.username}
                              onChange={handleInputChange1}
                            />
                            <span className="alert-error"></span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group pwd-container">
                            <input
                              className="form-control"
                              required
                              id="password"
                              name="password"
                              placeholder="Password"
                              type={isRevealPwd ? "text" : "password"}
                              value={formData.password}
                              onChange={handleInputChange1}
                            />
                            <img
                              title={
                                isRevealPwd ? "Hide password" : "Show password"
                              }
                              src={isRevealPwd ? hidePwdImg : showPwdImg}
                              onClick={() =>
                                setIsRevealPwd((prevState) => !prevState)
                              }
                            />
                            <span className="alert-error"></span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group rounded-3 d-flex align-items-center">
                            <input
                              value="One"
                              type="checkbox"
                              id="rememberMe"
                              className="me-2 "
                            />
                            <label className="pt-2" for="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="button text-center">
                            <button
                              className="button-background"
                              disabled={loading} // Disable the button when loading is true
                            >
                              {loading && (
                                <span className="spinner-border spinner-border-sm mr-1"></span>
                              )}
                              Login
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 alert-notification">
                        <div id="message" className="alert-msg"></div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
