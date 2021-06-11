import React, { useEffect } from "react";

// third party imports
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

// local imports
import SimpleBtn from "../master/SimpleBtn/SimpleBtn";
import FloatingCartProduct from "../FloatingCartProduct/FloatingCartProduct";
import { toggleFloatingCart } from "../../_redux/store/action/globalAction";

function FloatingCart() {
  const { floatingCartVisible } = useSelector((state) => state.GlobalReducer);

  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(toggleFloatingCart());
  };

  useEffect(() => {
    const bodyDOM = window.document.body;

    // Remove scrollbar when Floating cart is open
    if (floatingCartVisible) {
      bodyDOM.style.overflowY = "100vh";
      bodyDOM.style.overflowY = "hidden";
    } else {
      body.style.height = "";
      body.style.overflowY = "";
    }
  });

  return (
    <div className="floating-cart modal-scrollbar">
      <div className="floating-cart__header">
        <p>There are 6 Products</p>
        <div onClick={toggleCartHandler} className="floating-cart__close-icon">
          <IoMdCloseCircle />
        </div>
      </div>
      <div className="floating-cart__products">
        <div>
          <FloatingCartProduct />
        </div>
        <div>
          <FloatingCartProduct />
        </div>
        <div>
          <FloatingCartProduct />
        </div>
      </div>
      <div className="floating-cart__payment-info">
        <div className="floating-cart__payment-details">
          <span>Sub Total</span>
          <span>TK 1400.00 BDT</span>
        </div>
        <div className="floating-cart__payment-details">
          <span>Delivery Fee</span>
          <span>TK 50.00 BDT</span>
        </div>
        <div className="floating-cart__payment-details">
          <span>Total</span>
          <span>TK 1450.00 BDT</span>
        </div>
      </div>
      <div className="floating-cart__actions">
        <div>
          <SimpleBtn variant="danger">view cart</SimpleBtn>
        </div>
        <div>
          <SimpleBtn variant="success">checkout</SimpleBtn>
        </div>
      </div>
    </div>
  );
}

export default FloatingCart;
