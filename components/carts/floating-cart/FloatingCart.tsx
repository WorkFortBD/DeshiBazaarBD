import React, { useEffect, useState } from "react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { formatCurrency } from "../../../services/currency";
import Modal from "../../master/Modal/Modal";
import SimpleBtn from "../../master/SimpleBtn/SimpleBtn";
import FloatingCartProduct from "./FloatingCartProduct";

import { toggleFloatingCart } from "../../../_redux/store/action/globalAction";
import { getCartsAction, removeAllCartItem } from "../_redux/action/CartAction";
import { IRootReducer } from "../../../_redux/RootReducer";

function FloatingCart() {
  const dispatch = useDispatch();
  const { floatingCartVisible } = useSelector((state: IRootReducer) => state.global);
  const { carts, totalQuantity, totalPrice } = useSelector((state: IRootReducer) => state.cart); // TODO: suggestion will come after interfacing at reducer
  // const { shippingCost } = useSelector((state: IRootReducer) => state.order);

  const [show, setShow] = useState(false);

  const toggleCartHandler = () => {
    dispatch(toggleFloatingCart());
  };

  const handleClose = () => {
    setShow((preState) => !preState);
  };

  const clearAllItem = () => {
    dispatch(removeAllCartItem());
    setShow((preState) => !preState);
    toggleCartHandler();
  };

  useEffect(() => {
    const bodyDOM = window.document.body;

    // Remove scrollbar when Floating cart is open
    if (floatingCartVisible) {
      bodyDOM.style.height = "100vh";
      bodyDOM.style.overflowY = "hidden";
    } else {
      bodyDOM.style.height = "";
      bodyDOM.style.overflowY = "";
    }
  });

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  /**
   * Redirect to cart page
   * Toggle also the cart handler on sidebar
   *
   * @since 1.0.0
   *
   * return void
   */
  const redirectToCart = () => {
    toggleCartHandler();
    router.push("/carts").then((_) => window.scrollTo(0, 0));
  };

  /**
   * Redirect to checkout page
   * Toggle also the cart handler on sidebar
   *
   * @since 1.0.0
   *
   * return void
   */
  const redirectToCheckout = () => {
    toggleCartHandler();
    router.push("/checkout").then((_) => window.scrollTo(0, 0));
  };

  let floatingCart = null;

  if (floatingCartVisible) {
    floatingCart = (
      <>
        <Modal closeModalHandler={handleClose} visible={show}>
          <p className="remove_title">Cart item</p>
          <div className="mb-3">All products will be removed</div>
          <div className="d-flex justify-content-end">
            <button
              className="custom_secondary_btn custom-button-component"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="custom-button-component ml-3"
              style={{ padding: "5px 10px" }}
              onClick={clearAllItem}
            >
              Remove all
            </button>
          </div>
        </Modal>
        <div className="floating-cart modal-scrollbar">
          <div className="floating-cart__header">
            <p>There are {totalQuantity} Products</p>
            <div
              onClick={toggleCartHandler}
              className="floating-cart__close-icon"
            >
              <i className="fas fa-times"></i>
            </div>
          </div>

          {+totalQuantity <= 0 && (
            <div className="floating-cart__not-found">
              <div className="floating-cart__not-found-img-box d-flex justify-content-center">
                <img width={240} height={160} src="/images/db-empty-cart.png" alt="empty cart" />
              </div>
              <p>Oop!!! Your cart is empty ! Start shopping</p>
            </div>
          )}

          {+totalQuantity > 0 && (
            <>
              <div className="mb-2 d-flex justify-content-between" style={{ fontSize: '14px' }}>
                <span
                  className="d-inline-block"
                  onClick={handleClose}
                  style={{ padding: "0rem 1rem", cursor: "pointer" }}
                >
                  Clear all
                </span>
                <span className="d-inline-block" style={{ padding: "0 1rem", fontWeight: 500, color: 'var(--color-primary)' }}>
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <div className="floating-cart__products">
                {carts.length > 0 &&
                  carts.map((item, index) => (
                    <div key={index}>
                      <FloatingCartProduct item={item} />
                    </div>
                  ))}
              </div>

              {/* <div className="floating-cart__payment-info">
                <div className="floating-cart__payment-details">
                  <span>Sub Total</span>
                  <span>
                    {formatCurrency(totalPrice)} {activeCurrency("code")}
                  </span>
                </div>

                <div className="floating-cart__payment-details">
                  <span>Delivery Fee</span>
                  <span>
                    {formatCurrency(shippingCost)}{" "}
                    {activeCurrency("code")}
                  </span>
                </div>

                {totalPrice > 0 && (
                  <div className="floating-cart__payment-details">
                    <span>Total</span>
                    <span>
                      {formatCurrency(totalPrice + 60)} {activeCurrency("code")}
                    </span>
                  </div>
                )}
              </div> */}

              <div className="floating-cart__actions">
                <div onClick={() => redirectToCart()}>
                  <SimpleBtn variant="danger">View cart</SimpleBtn>
                </div>

                <div onClick={() => redirectToCheckout()}>
                  <SimpleBtn variant="success">Checkout</SimpleBtn>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
  return floatingCart;
}

export default FloatingCart;
