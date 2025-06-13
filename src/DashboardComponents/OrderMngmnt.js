import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import * as constants from '@fortawesome/free-solid-svg-icons'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DashboardHeader from './DashboardHeader';
import DashboardLayout from './DashboardLayout';
import { useNavigate } from 'react-router-dom';


const OrderMngmnt = () => {
  const navigate = useNavigate();
const [loading,setloading]=useState(false)
  const [orders, setOrderlist] = useState([]);

  const [openOrderLists, setOpenOrderLists] = useState({});

  const fetchorderlist = () => {
    try{
      setloading(true)
    return  fetch("https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Order/DashboardOrderList")
      .then((response) => response.json())
      .then((data) =>{
        setOrderlist(data)
        setloading(false);
      } );
    }catch{
      setloading(false);
    }
    
  }
  useEffect(() => {
    fetchorderlist();
  }, [])



  const handleEllipsisClick = (orderId) => {
    setOpenOrderLists((prevOpenOrderLists) => ({
      ...prevOpenOrderLists,
      [orderId]: !prevOpenOrderLists[orderId],
    }));
  };
  const handleOptionClick = (option, orderId) => {
    let statusId;

    switch (option) {
      case 'Confirm':
        statusId = 1;
        break;
      case 'Decline':
        statusId = 2;
        break;
      case 'Delivered':
        statusId = 4;
        break;
      case 'View':
        navigate(`/OrderManagement/${orderId}`);
        return;
      default:
        break;
    }
    fetch(`https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Order/UpdateOrderStatus?orderid=${orderId}&statusid=${statusId}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.ok) {
          refreshPage();
        } else {
          console.error(`Failed to update order ${orderId} status.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setOpenOrderLists((prevOpenOrderLists) => ({
      ...prevOpenOrderLists,
      [orderId]: false,
    }));
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <DashboardLayout />
      <main style={{ backgroundColor: "#F9F8F9" }}>
        <div className="container pt-4">
        {loading ? (
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
              }}
            >
              <div
                className="spinner-border loading text-primary"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
   <DashboardHeader />

<div className='orderdashboard-background'>
  <div className='container default-padding'>
    <div className='container pt-4 pb-4'>
      <h3 className='orderdashboard-color2 pb-4'>Order Received</h3>
      <TableContainer component={Paper} className='orderdashboard-color pt-4 container orderdashboard-color' style={{ backgroundColor: '#fff' }}>

        <Table >
          <TableHead >
            <TableRow >
              <TableCell className='orderdashboard-color' >Order ID</TableCell>
              <TableCell className='orderdashboard-color'>Name</TableCell>
              <TableCell className='orderdashboard-color'>Phone no</TableCell>
              <TableCell className='orderdashboard-color'>Created Time</TableCell>
              <TableCell className='orderdashboard-color'>Status</TableCell>
              <TableCell className='orderdashboard-color'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='hover-color' >
            {orders.map((order) => (
              <TableRow key={order.orderId}  >
                <TableCell className='orderdashboard-color1' onClick={() => handleOptionClick('View', order.orderID)}>{order.orderID}</TableCell>
                <TableCell className='orderdashboard-color1'onClick={() => handleOptionClick('View', order.orderID)}>{order.name}</TableCell>

                <TableCell className='orderdashboard-color1'onClick={() => handleOptionClick('View', order.orderID)}>{order.phoneNumber}</TableCell><TableCell className='orderdashboard-color1' onClick={() => handleOptionClick('View', order.orderID)}>
  {new Date(order.createdTime).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })}{' '}
  {new Date(order.createdTime).toLocaleTimeString([], { hour12: false })}
</TableCell><TableCell className='orderdashboard-color1 '>
                  {order.orderStatus === 'Accepted' && (
                    <FontAwesomeIcon icon={constants.faCircleCheck} style={{ color: '05CD99 ', height: "20px" }} className="accepted-icon pe-3" />
                  )}
                  {order.orderStatus === 'Rejected' && (
                    <FontAwesomeIcon icon={constants.faCircleXmark} style={{ color: 'EE5D50', height: "20px" }} className="rejected-icon pe-3" />
                  )}
                  {order.orderStatus === 'Delivered' && (
                    <FontAwesomeIcon icon={constants.faCheckCircle} style={{ color: '2B3674', height: "20px" }} className="delivered-icon pe-3" />
                  )}

                  {order.orderStatus !== 'Accepted' && order.orderStatus !== 'Rejected' && order.orderStatus !== 'Delivered' && (
                    <FontAwesomeIcon icon={constants.faCircleExclamation} style={{ color: 'F9A74E ', height: "20px" }} className="unknown-status-icon pe-3" />
                  )}
                  {order.orderStatus}
                </TableCell>
                <TableCell className='orderdashboard-color1'>

                  <div className='orderdashboard-padding'>
                    <IconButton onClick={() => handleEllipsisClick(order.orderID)}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </IconButton>
                    <div>
                      {openOrderLists[order.orderID] && (
                        <div className="options-container text-center">
                          {order.orderStatus === 'Accepted' && (
                            <div>
                              <div className='d-flex border-bottom border-secondary'>
                                <FontAwesomeIcon icon={constants.faCheckCircle} style={{ color: '#2B3674', height: '20px' }} className="delivered-icon pt-2 " />
                                <div className="delivered " onClick={() => handleOptionClick('Delivered', order.orderID)}>Delivered</div>
                              </div>
                              <div className='d-flex'>
                                <FontAwesomeIcon icon={constants.faCircleCheck} style={{ color: 'grey', height: '20px' }} className="accepted-icon pt-2 " />
                                <div className="view " onClick={() => handleOptionClick('View', order.orderID)}>View</div>
                              </div>
                            </div>

                          )}
                          {order.orderStatus === 'Pending' && (
                            <div>
                              <div className='d-flex border-bottom border-secondary'>
                                <FontAwesomeIcon icon={constants.faCircleCheck} style={{ color: '#05CD99', height: '20px' }} className="accepted-icon pt-2 ps-4" />
                                <div className="confirm " onClick={() => handleOptionClick('Confirm', order.orderID)}>Accept</div>
                              </div>
                              <div className='d-flex border-bottom border-secondary'>
                                <FontAwesomeIcon icon={constants.faCircleXmark} style={{ color: '#EE5D50', height: '20px' }} className="rejected-icon pt-2 ps-4" />
                                <div className="pending " onClick={() => handleOptionClick('Reject', order.orderID)}>Reject</div>
                              </div>
                              <div className='d-flex'>
                                <FontAwesomeIcon icon={constants.faCircleCheck} style={{ color: 'grey', height: '20px' }} className="accepted-icon pt-2 ps-4" />
                                <div className="view " onClick={() => handleOptionClick('View', order.orderID)}>View</div>
                              </div>
                            </div>
                          )}
                          {order.orderStatus === 'Delivered' && (
                            <div className='d-flex'>
                              <FontAwesomeIcon icon={constants.faCircleCheck} style={{ color: '#05CD99', height: '20px' }} className="accepted-icon pt-2 ps-4" />
                              <div className="view " onClick={() => handleOptionClick('View', order.orderID)}>View</div>
                            </div>
                          )}
                          {order.orderStatus === 'Rejected' && (
                            <div className='d-flex'>
                              <FontAwesomeIcon icon={constants.faCircleCheck} style={{ color: 'grey', height: '20px' }} className="accepted-icon pt-2 ps-4" />
                              <div className="view " onClick={() => handleOptionClick('View', order.orderID)}>View</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>


                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
    </div>
  </div>

</div>

            </>
          )}
       
        </div>
      </main>



    </>
  )
}

export default OrderMngmnt