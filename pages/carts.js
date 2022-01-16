import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import SimpleBtn from "../components/master/SimpleBtn/SimpleBtn";
import Modal from "../components/master/Modal/Modal";
import RemoveCartItem from "../components/RemoveCartItem/RemoveCartItem";
import OrderSummery from "../components/orders/OrderSummery";

import { toggleModal } from "../_redux/store/action/globalAction";
import {
  getCartsAction,
  removeAllCartItem,
  toggleAllCartSelection,
} from "../components/carts/_redux/action/CartAction";

import dynamic from 'next/dynamic';
import { handleShippingCost } from "../components/orders/_redux/action/OrderAction";

const CartProduct = dynamic(() => import('../components/carts/cart-product/CartProduct'));

export default function Carts() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isModalActive } = useSelector((state) => state.global);
  const { supplierWiseCarts, carts, checkedAllCarts } = useSelector(
    (state) => state.cart
  );
  const userData = useSelector((state) => state.user.userData);

  const deleteItemsHandler = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  const placeOrder = () => {
    if (userData !== null) {
      router.push("/checkout").then((_) => window.scrollTo(0, 0));
    } else if (userData === null) {
      router.push("/login").then((_) => window.scrollTo(0, 0));
    }
  };

  const toggleModalHandler = () => {
    setIsModalVisible(visible => !visible);
  }

  const clearAllItem = () => {
    dispatch(removeAllCartItem());
    dispatch(handleShippingCost());
    toggleModalHandler();
  };
  
  const selectAllHandler = () => {
    dispatch(toggleAllCartSelection(!checkedAllCarts));
    dispatch(handleShippingCost());
  }
  
  const selectShopHandler = (item) => {
    dispatch(toggleAllCartSelection(!item.isChecked, null, item.sellerID));
    dispatch(handleShippingCost());
  }
 
  return (
    <>
        <Modal closeModalHandler={toggleModalHandler} visible={isModalVisible}>
          <p className="remove_title">Cart item</p>
          <div className="mb-3">All products will be removed</div>
          <div className="d-flex justify-content-end">
            <button 
              className="custom_secondary_btn custom-button-component"
              onClick={toggleModalHandler} >
              Cancel
            </button>
            <button
              className="custom-button-component ml-3"
              style={{ padding: "5px 10px" }}
              onClick={clearAllItem} >
              Remove all
            </button>
          </div>
        </Modal>
        <div className="container">
          <div className="row mt-3 mb-5">
            <div className="col-lg-8 col-md-7 px-0 px-sm-2">
              <div className="cart_container_body">
                <p className="cart__preferred_delivery">My Carts</p>
                {/* <Card>
                  <div className="cart__left-top">
                    <div>
                      <IoIosCheckmarkCircle />
                      <p>Please select items</p>
                    </div>
                    <p>Availability and promotions will be shown here</p>
                  </div>
                </Card> */}



                <div className="card mt-3">

                  <div className="cart_item_box_top">
                    {
                      carts.length > 0 && (
                        <>
                          <div className="pointer d-flex align-items-center" onClick={selectAllHandler}>
                            <input type="checkbox" checked={checkedAllCarts} onChange={() => { }} />
                            &nbsp; Select All ({carts.length} items)
                          </div>
                          <div>
                            <span onClick={toggleModalHandler} className="pointer">Clear all</span>
                          </div>
                        </>
                      )
                    }
                  </div>

                  {supplierWiseCarts.length > 0 &&
                    supplierWiseCarts.map((item, index) => (
                      <div key={index}>
                        <div className="cart_items_by_shop" key={index}>
                          <div className="cart_item_box_top_1 py-3 px-1">
                            <div className="row justify-content-between">
                              <div className="col-lg-6">
                                <div className="cart_shop_name d-flex">
                                  <input type="checkbox" checked={item.isChecked} onChange={() => selectShopHandler(item)} />
                                  <div className="ml-2">
                                    <div className="cart_details_body">
                                      <p>
                                        {item.sellerName}
                                      </p>
                                      <div className="cart_trash">
                                        <i className="fas fa-chevron-right"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <p className="estimate text-right">Estimate time - {item.approxDeliveryDate} </p>
                              </div>
                            </div>

                          </div>
                          {/* <p className="Spend">
                            Spend ৳ 990 enjoy free shipping for Standard delivery option
                          </p> */}
                        </div>

                        <div className="py-3 px-1">
                          {item.data.length > 0 &&
                            item.data.map((cart, keyValue) => (
                              <div
                                className="cart_items_details py-2"
                                key={keyValue + 1}
                              >
                                <CartProduct cart={cart} />
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}

                  <div className="p-2 mb-4">
                    <div className="text-center">
                      {
                        carts.length <= 0 && (
                          <div>
                            <img width={240} height={160} src="/images/db-empty-cart.png" alt="empty cart" />
                            <div>
                              <p>Oop!!! Your cart is empty! Start shopping</p>
                            </div>
                          </div>
                        )
                      }
                      <Link href="/">
                        <a style={{ display: "inline-block" }}>
                          <SimpleBtn variant="success">
                            <i className="fas fa-shopping-bag"></i>
                            {' '}
                            CONTINUE SHOPPING
                          </SimpleBtn>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-5 px-0 px-sm-2 cart_checkout_margin">
              <OrderSummery
                handleClick={placeOrder}
                buttonText="PROCEED TO CHECKOUT"
              />
            </div>
          </div>
        </div>

      <Modal
        visible={isModalActive}
        closeModalHandler={() => console.log("modal close handler")}
      >
        <div style={{ width: "27rem" }}>
          <RemoveCartItem>
            Remove from cart item will be removed from order
          </RemoveCartItem>
        </div>
      </Modal>
    </>
  );
}
