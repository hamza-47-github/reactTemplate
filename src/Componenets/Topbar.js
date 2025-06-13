
import React, { useState } from 'react';
import { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';

import 'owl.carousel/dist/assets/owl.theme.default.css';



const Topbar = () => {
    const [user, setUser] = useState([]);

    const fetchData = () => {
        return fetch("https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Menu/GetAllMenu")
            .then((response) => response.json())
            .then((data) => setUser(data)

            );
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
       
    }, []);

    const carouselOptions = {
        items: 3,
        margin: 20,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    };
   

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="menu-lists food-menu-carousel  text-center">


                            <OwlCarousel items={3} margin={20} className='owl-theme' {...carouselOptions} >
                                {user.map((item) => (
                                    <div>
                                        <div className="item">
                                            <div className="thumb">
                                                <a href="#">
                                                    <img style ={{height:"243px"}} src={item.image} alt="Thumb" />
                                                </a>
                                                <div className="price">
                                                    <h5>{item.price}</h5>
                                                </div>

                                                <div className="info">
                                                    <h4><a href="#">{item.name}</a></h4>
                                                    <span>{item.ingredients}</span>
                                                    <p>
                                                        {item.desc}
                                                    </p>
                                                    <div className="button">
                                                        <a  href="#">Order Now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Topbar










