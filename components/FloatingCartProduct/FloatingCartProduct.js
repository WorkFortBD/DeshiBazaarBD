import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiChevronRight, FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteCartItemAction, updateCartQtyAction } from "../_redux/CartProduct/Action/CartAction";

function FloatingCartProduct({ item }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleDeleteCartProduct = (productID) => {
    dispatch(deleteCartItemAction(productID))
  }

  // increase quantity 
  const increaseQuantity = (id, quantity) => {
    // carts.find((item) => item.productID === id && setQuantity((quantity += 1)));
    setQuantity((quantity + 1))
    dispatch(updateCartQtyAction(id, (quantity + 1)));
  };
  //decrease quantity
  const decrementQunatity = (id, quantity) => {
    // carts.find((item) => item.productID === id && quantity > 1 && setQuantity((quantity -= 1)))
    setQuantity((quantity - 1))
    if (quantity > 1) {
      dispatch(updateCartQtyAction(id, (quantity - 1)));
    }
  };
  return (
    <div className="floating-cart__product">
      <div className="floating-cart__product-left">
        <div className="floating-cart__product-photo-container">
          <img src={item.productImage} alt="" style={{ width: 80, height: 80 }} />
        </div>
      </div>
      <div className="floating-cart__product-right">
        <div className="floating-cart__product-details">
          <p className="floating-cart__product-name">{item.productName}</p>
          <p className="floating-cart__product-price">
            {item.quantity} <span>X</span> Tk {item.offerPrice !== null && item.offerPrice !== 0 ? item.offerPrice : item.price} BDT
          </p>

          {/* <div className="floating-cart__product-qty">
            <FiMinus />
            <span>{item.quantity}</span>
            <FiPlus />
          </div> */}
          <div className="quantity">
            <button
              disabled={quantity <= 1 ? true : false}
              // onClick={() => setQuantity(quantity - 1)}
              onClick={() => decrementQunatity(item.productID, quantity)}
              className={quantity <= 1 ? `not-allowed` : `pointer`}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="text" value={quantity} />
            <button
              className="pointer"
              // onClick={() => setQuantity(quantity + 1)}
              onClick={() => increaseQuantity(item.productID, quantity)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

        </div>
        <div className="floating-cart__product-dlt-action pointer" onClick={() => handleDeleteCartProduct(item.productID)}>
          <MdDelete />
        </div>
      </div>
    </div>
  );
}

export default FloatingCartProduct;
