import React from 'react'
import { NavLink } from "react-router-dom";
const ThankPage = () => {
    const img = 'https://d2h6wiohk8vgxj.cloudfront.net/images/check-mail.png';
  return (
    <div
    style={{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh',
      }}>
  <div
    style={{
      fontFamily: 'Roboto, sans-serif',
      textAlign: 'center',
      fontSize: '18px',
      lineHeight: '24px',
      margin: '0 auto',
      maxWidth: '480px',
      display: 'block',
    }}
  >
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        marginBottom: '32px',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: '1',
          background: `url(${img}) center center no-repeat`,
          backgroundSize: 'cover',
          width: '110px',
          height: '110px',
      
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          background: `url(${img}) center center no-repeat`,
          backgroundSize: '97% 97%',
           width: '110px',
          height: '110px',
        }}
      ></div>
    </div>

    <p><strong className='fs-1'>Thank You!</strong></p>

    <p>
    We're delighted to have you on board! By subscribing to our newsletter, you're now part of our vibrant community, gaining exclusive access to exciting updates, special offers.
    </p>

    {/* <p>You'll hear from us soon.</p> */}
    <button className='px-5 py-2 ' style={{
        borderRadius:'20px',
        border:'none',
        color:'#fff',
        background:'#e7272d'
    }}>
        <NavLink to="/" style={{
       
     
        color:'#fff',
       
    }}>
        Close
        </NavLink>
        </button>
  </div>
    </div> 
  
  )
}

export default ThankPage
