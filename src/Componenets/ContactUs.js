import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import * as constants from '@fortawesome/free-solid-svg-icons'
import Header from './Header.tsx'
import Footer from './Footer'
const ContactUs = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contact: "",
        desc: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const isFormValid = Object.values(formData).every((value) => {
        if (typeof value === "string") {
            return value.trim() !== "";
        }
        return true;
    });
    const Swal = require("sweetalert2");
    const handlesuccessmodalopen = () => {
        Swal.fire({
            icon: "success",
            title: "Message Sent Successfully",
            text: "Your suggestion has been successfully received. We value your feedback and will take it into consideration!",
            timer: 5000,
            width: 500,
        });
    };
    return (
        <>
            <Header />
            <div className="breadcrumb-area shadow text-center dark bg-fixed text-light contact-img" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Contact Us</h1>
                            <ul className="breadcrumb">
                                <li><a href="/" className='link-no-underline'><FontAwesomeIcon icon={constants.faHome} style={{ color: 'white' }} /> Home</a></li>
                                {/* <li><FontAwesomeIcon className='pe-3' icon={constants.faChevronRight} style={{ color: 'white' }} /> <a href="#">Pages</a></li> */}
                                <li className="active link-no-underline"><FontAwesomeIcon className='pe-3' icon={constants.faChevronRight} style={{ color: 'white' }} />  Contact</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-us-area default-padding">
                <div className="container">
                    <div className="row">
                        <div className="contact-box">


                            <div className="col-md-5 form-box">
                                <div className="form-content">
                                    <div className="heading">
                                        <h3>Drop us a line</h3>
                                    </div>
                                    <form  >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input className="form-control" id="name" name="username" placeholder="Enter name" type="text" onChange={handleInputChange} />
                                                    <span className="alert-error"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input className="form-control" id="email" name="email" placeholder="Email*" type="email" onChange={handleInputChange} />
                                                    <span className="alert-error"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input className="form-control" id="phone" name="contact" placeholder="Phone" type="text" onChange={handleInputChange} />
                                                    <span className="alert-error"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group comments">
                                                    <textarea className="form-control" id="comments" name="desc" placeholder="" onChange={handleInputChange}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="">
                                                <Link to={"/contact"} >
                                                    <button onClick={handlesuccessmodalopen} disabled={!isFormValid}>

                                                        Send Message
                                                        <FontAwesomeIcon icon={constants.faPaperPlane} style={{ color: 'white' }} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-12 alert-notification">
                                            <div id="message" className="alert-msg"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                            <div className="col-md-6 col-md-offset-1 info">
                                <h2>Contact Us</h2>
                                <p>
                                    Our team at Parathas & Platters is committed to providing excellent service and ensuring your experience with us is nothing short of fantastic.
                                </p>
                                <div className="address-items">
                                    <div className="row">

                                        <div className="col-md-6 col-sm-6 equal-height">
                                            <div className="item">
                                                <div className="icon"><FontAwesomeIcon icon={constants.faMapMarkedAlt} style={{ color: 'red' }} /></div>
                                                <span></span>
                                                <span> 329 Main st, Hackensack NJ 07601<br /></span>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6 equal-height">
                                            <div className="item">
                                                <div className="icon"> <FontAwesomeIcon icon={constants.faClock} style={{ color: 'red' }} /></div>
                                                <span>11.00 am to 10.00 pm</span>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6 equal-height">
                                            <div className="item">
                                                <div className="icon"> <FontAwesomeIcon icon={constants.faPhone} style={{ color: 'red' }} /></div>
                                                <span>(201) 250-8255</span>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6 equal-height">
                                            <div className="item">
                                                <div className="icon"><FontAwesomeIcon icon={constants.faEnvelopeOpen} style={{ color: 'red' }} /></div>
                                                <span>parathasandplatters@gmail.com</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="maps-area">
                <div className="container-full">
                    <div className="row">
                        <div className="google-maps">
                            <iframe src="https://maps.google.com/maps?q=40.888902,-74.040583&hl=es;z=14&amp;output=embed"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs