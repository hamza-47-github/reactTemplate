import React, { useState } from 'react';
import SidebarofAddtoCart from './SidebarofAddtoCart';

const ViewCart = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleViewCartClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
const GrandTotal=  localStorage.getItem("GrantTotal");
  return (
    <>
      <div className='viewcart-bottom'>
        <div className="mx-3 py-4 viewcart">
          <div className=''>
            <p className='cart'>${GrandTotal}</p>
          </div>
          <div className='cart text-end'>
            <p className='cart' onClick={handleViewCartClick}>View Cart</p>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <SidebarofAddtoCart
          isSidebarOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />
      )}
    </>
  );
};

export default ViewCart;
