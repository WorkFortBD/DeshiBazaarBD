import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishListData,
} from "../Wishlist/_redux/Action/WishlistAction";

const HeaderWishlist = () => {
  const dispatch = useDispatch();

  const formatQtyDisplay = (totalQuantity) => {
    if (totalQuantity <= 9) {
      return <span style={{ paddingLeft: 2 }}> {totalQuantity} </span>;
    } else if (totalQuantity > 9 && totalQuantity <= 99) {
      return totalQuantity;
    } else {
      return <span style={{ fontSize: 8 }}> {totalQuantity} </span>;
    }
  };

  const { wishList } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishListData());
  }, []);

  return (
    <div className="cart-nav-link">
        <i className="fas fa-heart"></i>
        {" "}
        <span className="cart-qty">
          {wishList.length}
          {/* {formatQtyDisplay(wishList.length)} */}
        </span>
    </div>
  );
};

export default memo(HeaderWishlist);
