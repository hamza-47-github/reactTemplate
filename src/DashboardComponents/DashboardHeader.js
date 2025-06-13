import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import Vat from './Vat';


const DashboardHeader = () => {
  const username = localStorage.getItem('username');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCloseCartModal = () => {
    // localStorage.removeItem("cartData");
    setIsCartOpen(false);

  };
  const VatModal = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
     <div className="topbar">
          <div style={{ backgroundColor: "#F9F8F9" }}>
            <div className="row">
              <div className='col-md-6'>
                <h2>Dashboard</h2>

              </div>


              {/* <div className="col-md-2 mt-4">

              </div> */}

              <div className='col-md-6 text-end '>

              <NavLink to='/ProfileForm'>
                <div className="btn-group pt-2" style={{height:"40px"}}  >
               

                  <div type="button" className="btn btn-danger pt-3 px-4" style={{backgroundColor:"#e7272d"}} >
                 
                    {/* <img
                      src="/assests/img/Admin pic.jpg"
                      className="rounded-circle"
                      height="22"
                      alt=""
                      loading="lazy"
                    /> */}
                    &nbsp;&nbsp;
                    {username} &nbsp; 
                  </div>

                </div>
                </NavLink>

              </div>
              {/* <div className='col-md-2 d-flex align-items-center justify-content-end' >
              <i className="fa fa-cog me-3" onClick={VatModal}></i
                >
              </div> */}
            </div>
          </div>


        </div>
    <Vat
      isSidebarOpen={isCartOpen}
      onClose={handleCloseCartModal}
    />
    </>
  )
}

export default DashboardHeader