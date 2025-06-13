import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";
import DashboardHeader from "./DashboardHeader";
import { useParams } from "react-router-dom";
import ProgressSpinnerLo from "../ProgressSpinner/ProgressSpinnerLo";
const Management = () => {
  const username = localStorage.getItem("Username");
  const [loading, setloading] = useState(false)
  const { id } = useParams();
  const [orderdetailDashboard, setorderdetails] = useState([]);

  const [orderdetailDashboardobject, setorderdetailsobject] = useState([]);

  useEffect(() => {
    orderetailsData();
  }, []);

  const orderetailsData = () => {
    setloading(true)
    fetch(
      `https://3zpzfxepp8.execute-api.ap-south-1.amazonaws.com/Prod/api/Order/OrderDetails?OrderID=${id}`
    )
      .then((response) => response.json())

      .then((data) => {
        setorderdetails(data);

        setorderdetailsobject(data.orderDetailResponse);
        setloading(false)
      });
  
  };

  return (
    <>
      <DashboardLayout />
      <main style={{ backgroundColor: "#F9F8F9" }}>
        <div className="container ">
          <DashboardHeader />
          <div className="default-padding orderdashboard-background">
            <h3 className="orderdetail2 ps-3">Order Details</h3>
            <div className="row pe-4">
              <div className="col-md-8 py-4 px-4">
                {loading ? (<ProgressSpinnerLo />) : (<>
                  {orderdetailDashboardobject.map((orderDetailObj, index) => (
                  <div key={index} className="pb-4 mt-2 order-border">
                    <div className="row py-4 px-4 ">
                      <div className="col-md-4 ps-5 pt-4">
                        <h4 className="orderdetail">Product Name</h4>
                        <p className="orderdetail1">
                          {orderDetailObj.productName}
                        </p>
                      </div>
                      <div className="col-md-4  pt-4">
                        <h4 className="orderdetail">Created Time</h4>
                        <p className="orderdetail1">
                          {orderDetailObj.createdTime}
                        </p>
                      </div>
                      <div className="col-md-4  pt-4">
                        <h4 className="orderdetail">Ingredients</h4>
                        <p className="orderdetail1">
                          {orderDetailObj.ingredients}
                        </p>
                      </div>
                    </div>
                    <div className="row px-4 py-4">
                      <div className="col-md-4 ps-5">
                        <h4 className="orderdetail">Delivery Address</h4>
                        <p className="orderdetail1">
                          {orderDetailObj.deliveryAddress}
                        </p>
                      </div>
                      <div className="col-md-4 ">
                        <h4 className="orderdetail">Category</h4>
                        <p className="orderdetail1">
                          {orderDetailObj.category}
                        </p>
                      </div>
                      <div className="col-md-4 ">
                        <h4 className="orderdetail">Contact No</h4>
                        <p className="orderdetail1">
                          {orderDetailObj.contact || 0}
                        </p>
                      </div>
                      {/* <div className='col-md-4 '>
                                                <h4 className='orderdetail'>Created by</h4>
                                                <p className='orderdetail1'>{orderDetailObj.createdBy}</p>
                                            </div> */}
                    </div>
                  </div>
                ))}
                </>)}

                <h3 className="py-4 orderdetail2">Food Items</h3>
                <div className="">
                  {orderdetailDashboardobject.map((item, index) => (
                    <div key={index} className="row pb-3 px-4 fooditem ">
                      <div className=" order-border pt-5 pb-4">
                        <div className="col-md-4 ">
                          {item.image && (
                            <img
                              className="border-radius"
                              src={item.image}
                              alt={item.productName}
                            />
                          )}
                        </div>
                        <div className="col-md-6 ps-4 ">
                          <h4 className="">{item.productName}</h4>
                          <p>${item.menuPrice || item.extras_price}</p>
                          {/* <p>Extras: {item.extras}</p> */}
                          {item.instruction && (
                            <p>Special Instruction: {item.instruction}</p>
                          )}
                        </div>
                        <div className="col-md-2">
                          <p>Qty</p>
                          <p>{item.quantity}X</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4 py-4 px-4 ">
                {orderdetailDashboardobject.map((itembill, index) => (
                  <div key={index} className="px-4 py-4 mt-2 order-border">
                    <h4 className="orderdetail">{itembill.productName}</h4>
                    <div className="row orderdetail">
                      <div className="col-md-6 d-flex">
                        <p>Price</p>
                      </div>
                      <div className="col-md-6 text-end">
                        <p>${itembill.menuPrice || itembill.extras_price}</p>
                      </div>
                    </div>
                    <div className="row orderdetail">
                      <div className="col-md-6 d-flex">
                        <p>Qty</p>
                      </div>
                      <div className="col-md-6 text-end">
                        <p>{itembill.quantity}</p>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex"></div>
                    <div className="row orderdetail"></div>
                  </div>
                ))}
                <div className="  px-4 py-4  mt-2 total-order-border">
                  <div className="row orderdetail">
                    <div className="col-md-6 d-flex">
                      <p>Total</p>
                    </div>

                    <div className="col-md-6 text-end">
                      <p>${orderdetailDashboard.total}</p>
                    </div>
                    {/* <div className="col-md-6 d-flex">
                      <p>Discount</p>
                    </div>

                    <div className="col-md-6 text-end">
                      <p>${orderdetailDashboard.discount}</p>
                    </div> */}
                    <div className="col-md-6 d-flex">
                      <p>Tax</p>
                    </div>

                    <div className="col-md-6 text-end">
                      <p>${orderdetailDashboard.vat}</p>
                    </div>

                    {/* <div className="col-md-6 d-flex">
                      <p>Delivery Charges</p>
                    </div>

                    <div className="col-md-6 text-end">
                      <p>${orderdetailDashboard.deliveryCharges}</p>
                    </div> */}

                    <div className="col-md-6 d-flex">
                      <p>Grand Total</p>
                    </div>

                    <div className="col-md-6 text-end">
                      <p>${orderdetailDashboard.grandTotal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Management;
