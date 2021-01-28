import React, { useEffect, useState } from "react";
import NumericInput from "react-numeric-input";
import CancelIcon from "@material-ui/icons/Cancel";
import MainLayout from "../components/layouts/Layout";
import { Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getCartsAction } from "../store/actions/orders/CartAction";

const placeorder = ({ router }, props) => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.cart.loading);
  const carts = useSelector((state) => state.cart.carts);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const shippingCost = useSelector((state) => state.cart.shippingCost);

  useEffect(() => {
    dispatch(getCartsAction());
    // calculateTotalQtyAndPrices();
  }, []);
  return (
    <>
      <MainLayout>
        <div className="homebanner pb bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="card mt-5">
                  <div className="card-body">
                    <h5 className="card-title">Shipping Address</h5>
                    <form>
                      <div className="row">
                        <div className="col">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your or Receiver name"
                          />
                        </div>
                        <div className="col">
                          <label>Contact Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Contact Number"
                          />
                        </div>
                      </div>
                      <div className="row mt-3 mb-3">
                        <div className="col">
                          <label>Shipping address</label>
                          <textarea
                            className="form-control"
                            placeholder="Type your full address"
                          ></textarea>
                        </div>
                        <div className="col">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email address (optional)"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="shippmentDetails">
                  <div className="shippmentDetailsHeader mt-3 mb-3">
                    <h1>Shippment Details</h1>
                  </div>
                  <div className="shippmentDetailsTitle">
                    <h3 className="d-inline item">Items</h3>
                    <h3 className="d-inline qty">Qty</h3>
                    <h3 className="d-inline unitPrice">Unite price</h3>
                    <h3 className="d-inline">Subtotal</h3>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="">

                  {
                    carts.length && carts.map((item, index) => (
                      <div className="innerwishlist bg-white">
                        <div className="wishsingleproduct shippingImg">
                          <img className="img-fluid w-75 p-3" src={item.productImage} alt="product image" />
                        </div>
                        <div className="shippmentBoxText pt-3">
                          <h1>{item.productName}</h1>
                          <h5 className="text-danger">Seller: Seller shop name</h5>
                        </div>
                        <div className="wishsingleproductIcon">
                          <p>{item.quantity}</p>
                        </div>
                        <div className="wishsingleproductIcon">
                          <p>৳ {item.offerPrice !== null && item.price !== "" ? item.offerPrice : item.price}</p>
                        </div>
                        <div className="wishsingleproductIcon">
                          {/* item.quantity * item.offerPrice */}
                          <p>৳ {item.offerPrice !== null && item.price !== "" ? item.quantity * item.offerPrice : item.quantity * item.price}</p>
                        </div>
                      </div>
                    ))
                  }

                  <div className="clearfix"></div>
                  <button className="btn btn-primary float-right mt-3 backCartbtn">
                    Back to Cart
                  </button>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="promocodesection priceDetailsHeading py-2 px-3 mt-5 mb-2">
                  <h1>Price Detail</h1>
                </div>
                <div className="placeOrderSummery bg-white p-3">
                  <div className="float-left">
                    <p>Price </p>
                    <p>Number of Items</p>
                    <p>Shipping cost</p>
                  </div>
                  <div className="float-right">
                    <p>৳ {totalPrice}</p>
                    <p className="ml-4">{totalQuantity}</p>
                    <p>৳ {shippingCost}</p>
                  </div>
                  <div className="clearfix"></div>
                  <div className="border-top pt-1">
                    <p className="float-left">Total Price</p>
                    <p className="float-right">৳ {totalPrice + shippingCost}</p>
                  </div>
                  <div className="clearfix"></div>
                  <div className="proceedBtn">
                    <button className="btn btn-warning text-white pb-2">
                      PROCEED
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default placeorder;
