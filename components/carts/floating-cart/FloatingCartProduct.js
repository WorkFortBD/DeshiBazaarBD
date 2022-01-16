import React from "react";
import { useDispatch } from "react-redux";
import { deleteCartItemAction } from "../_redux/action/CartAction";
import { formatCurrency, activeCurrency } from '../../../services/currency';
import CartQuantity from "../partials/CartQuantity";

function FloatingCartProduct({ item }) {
  const dispatch = useDispatch();

  const handleDeleteCartProduct = (productID) => {
    dispatch(deleteCartItemAction(productID))
  }

  return (
    <div className="floating-cart__product">
      <div className="floating-cart__product-left">
        <div className="floating-cart__product-photo-container">
          <img src={item.productImage} alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} />
        </div>
      </div>
      <div className="floating-cart__product-right">
        <div className="floating-cart__product-details">
          <p className="floating-cart__product-name text-capitalize">
            {
              item.name && item.name.toLowerCase()
            }
          </p>
          <p className="floating-cart__product-price">
            {item.quantity} <span>X</span>&nbsp;
            {formatCurrency(item.offerPrice !== null && item.offerPrice !== 0 && item.offerPrice !== "0" ? item.offerPrice : item.price)} {activeCurrency('code')}
          </p>
          <CartQuantity cart={item} />
        </div>
        <div className="floating-cart__product-dlt-action pointer" onClick={() => handleDeleteCartProduct(item.productID)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default FloatingCartProduct;
