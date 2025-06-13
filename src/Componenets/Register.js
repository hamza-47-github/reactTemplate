import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as constants from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import showPwdImg from '../show-password.svg'; // Replace with the correct path
import hidePwdImg from '../hide-password.svg';

const Register = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [allchecked, setAllChecked] = React.useState([]);
    function handleChange(e) {
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
        } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "username": "",
        "email": "",
        "contact": "",
        "address": "",
        "userTypeId": 1,
        "password": "",



    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit1 = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch('https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/UserRegistration/UserRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Host': 'calculated when request is sent'
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setFormData({
                "username": "",
                "email": "",
                "contact": "",
                "address": "",
                "userTypeId": 1,
                "password": "",
            });
            console.log('registered  successfully!');
            navigate('/admin');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <div className='background-regimg'>

                <div className="contact-us-area default-padding">
                    <div className="container form-padding">
                        <div className="row">
                            <div className="contact-box">

                                <div className='col-md-4'></div>
                                <div className="col-md-5 form-box">


                                    <div className="register-form">
                                        <div className='text-center'>
                                            <img src='/assests/img/form-logo.png' alt='form-logo' className='img-fluid ' />
                                        </div>
                                        <div className="grey-text pb-4">
                                            <h3>Sign up to continue!</h3>
                                        </div>
                                        <form className="contact-form" onSubmit={handleSubmit1}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className=" form-group ">
                                                        <input className="form-control" required id="username" name="username" placeholder="Username*" type="username" value={formData.username}
                                                            onChange={handleInputChange} />
                                                        <span className="alert-error"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className=" form-group ">
                                                        <input className="form-control" required id="email" name="email" placeholder="Email*" type="email" value={formData.email}
                                                            onChange={handleInputChange} />
                                                        <span className="alert-error"></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className=" form-group ">
                                                        <input className="form-control" required id="contact" name="contact" placeholder="Contact*" type="integer" value={formData.contact}
                                                            onChange={handleInputChange} />
                                                        <span className="alert-error"></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className=" form-group ">
                                                        <input className="form-control" required id="address" name="address" placeholder="Address" type="text" value={formData.address}
                                                            onChange={handleInputChange} />
                                                        <span className="alert-error"></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className=" form-group pwd-container">
                                                        <input className="form-control" required id="password" name="password" placeholder="Password*" type={isRevealPwd ? "password" : "text"}
                                                            value={formData.password} onChange={handleInputChange}
                                                        />
                                                        <img
                                                            title={isRevealPwd ? "Hide password" : "Show password"}
                                                            src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                            onClick={() => setIsRevealPwd(prevState => !prevState)}
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
                                                        <label className="pt-2" for="rememberMe">Remember me</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                <div className="button text-center">
                                                    <button className="button-background" type="submit" name="submit" id="" value="Submit">
                                                        Sign Up
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

                                <div className='col-md-3'></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register;