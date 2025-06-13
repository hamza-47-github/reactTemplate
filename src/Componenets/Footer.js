import React from 'react'
import { NavLink } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <footer className="bg-dark">
                <div className="container">


                    <div className="f-items  title-effect text-light default-padding">
                        <div className="row">

                            <div className="col-md-4 col-sm-6  equal-height item">
                                <div className="f-item address">
                                    <img src="/favicon1.svg" className="w-25" alt="Logo" />

                                    <ul>
                                        <li>
                                            <span>Address: </span>329 Main St, Hackensack, NJ 07601
                                        </li>
                                        <li>
                                            <span>Phone: </span>(201) 250-8255
                                        </li>
                                        <li>
                                            <span>Email:</span> parathasandplatters@gmail.com
                                        </li>
                                    </ul>
                                </div>
                            </div>



                            <div className="col-md-2 col-sm-6  equal-height item">
                                <div className="f-item link">
                                    <h4>Food Menu</h4>
                                    <ul>
                                        <li>
                                            <NavLink to={"/menu/?id=1"} className="link-no-underline" >Paratha Corner </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/menu/?id=2"} className="link-no-underline">Paratha Rolls</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/menu/?id=3"} className="link-no-underline">Rice Platters</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/menu/?id=7"} className="link-no-underline">Fried Chicken + Fries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/menu/?id=8"} className="link-no-underline">Chicken Family Combo + Fries</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-2 col-sm-6 equal-height item">
                                <div className="f-item inst-feed">
                                    <h4>Follow us </h4>
                                    <div className='row gx-0 gy-2 icon-media'>
                                        <div className='col-lg-4 col-md-2 col-sm-2'>
                                            <a href="https://www.instagram.com/parathas.platters/">
                                                <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/instagram.png" alt="thumb" width={'45px'} />
                                            </a>
                                        </div>
                                        <div className='col-lg-4 col-md-2 col-sm-2'>
                                            <a href="https://www.facebook.com/parathas.platters/">
                                                <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/facebook.png" alt="thumb" width={'45px'} />
                                            </a>
                                        </div>
                                        <div className='col-lg-4 col-sm-2'>

                                        </div>
                                        <div className='col-lg-4 col-md-2 col-sm-2'>
                                            <a href="https://www.tiktok.com/@ParathasandPlatters">
                                                <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/tiktok1.png" alt="thumb" width={'45px'} />
                                            </a>
                                        </div>
                                        <div className='col-lg-4 col-md-2 col-sm-2'>
                                            <a href="https://www.linkedin.com/company/parathas-platters/?viewAsMember=true">
                                                <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/linkedin.png" alt="thumb" width={'45px'} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className=' d-flex gap-4 pt-4'>
                                        <a href="https://www.instagram.com/parathas.platters/" className='icon-media-1'>
                                            <img src="assests/img/gallery/instagram.png" alt="thumb" width={'60px'} />
                                        </a>
                                        <a href="https://www.facebook.com/parathas.platters/" className='icon-media-1'>
                                            <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/facebook.png" alt="thumb" width={'60px'} />
                                        </a>
                                        <a href="https://www.tiktok.com/@ParathasandPlatters" className='icon-media-1'>
                                            <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/tiktok1.png" alt="thumb" width={'60px'} />
                                        </a>
                                        <a href="https://www.linkedin.com/company/parathas-platters/?viewAsMember=true" className='icon-media-1'>
                                            <img src="https://d2h6wiohk8vgxj.cloudfront.net/images/linkedin.png" alt="thumb" width={'60px'} />
                                        </a>
                                    </div>
                                    <div className='icon-media-1 d-flex gap-4 pt-4'>

                                    </div>

                                    {/* <ul> 
                                        <li>
                                            <a href="https://www.instagram.com/parathas.platters/">
                                                <img src="assests/img/gallery/instagram.png" alt="thumb" />
                                            </a>
                                        </li>
                                   
                                        <li>
                                            <a href="https://www.facebook.com/parathas.platters/">
                                                <img src="assests/img/gallery/facebook.png" alt="thumb" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="assests/img/gallery/tiktok1.png" alt="thumb" />
                                            </a>
                                        </li>
                                 
                                        <li>
                                            <a href="https://www.linkedin.com/company/parathas-platters/?viewAsMember=true">
                                                <img src="assests/img/gallery/linkedin.png" alt="thumb" />
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-6 equal-height item ">
                                <div className="f-item opening-hours">
                                    <h4>Store  Hours</h4>
                                    <ul>
                                        <li>
                                            <span> Monday - Tuesday :  </span>
                                            <div className="pull-right"> 11.00am to 10.00pm</div>
                                        </li>
                                        <li>
                                            <span> Wednesday - Thursday :</span>
                                            <div className="pull-right"> 11.00am to 10.00pm </div>
                                        </li>
                                        <li>
                                            <span>Friday - Saturday : </span>
                                            <div className="pull-right"> 11.00am to 10.00pm </div>
                                        </li>
                                        <li>
                                            <span> Sunday : </span>
                                            <div className="pull-right "> 11.00am to 10.00pm </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="footer-bottom bg-dark text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <p>&copy; Copyright 2024. All Rights Reserved by <a href="#">Parathas & Platters</a></p>
                            </div>
                            <div className="col-md-6 text-right link">
                                <ul>
                                    <li>
                                        {/* <a href="#">Terms of user</a> */}
                                    </li>
                                    <li>
                                        {/* <a href="#">License</a> */}
                                    </li>
                                    <li>
                                        {/* <a href="#">Support</a> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer></>
    )
}

export default Footer