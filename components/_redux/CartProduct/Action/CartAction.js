import { useState } from "react";
import * as Types from "../Types/Types";
import Axios from "axios";
import { showToast } from "../../../master/Helper/ToastHelper";

export const addToCartAction = (cartProduct, id) => async (dispatch) => {
  const previousCart = getCartData().carts;
  let carts = [...previousCart];
  let storeCarts = {
    sellerID: cartProduct.sellerID,
    sellerName: cartProduct.sellerName,
    data: [cartProduct]
  }
  const filterCarts = carts.filter((item) => item.sellerName == cartProduct.sellerName);

  if (carts.find((data) => data.productID === id)) {
    showToast('error', "Product has been already added in cart !")
  } else {
    if (filterCarts.length > 0) {
      for (let i = 0; i < filterCarts.length; i++) {
        const item = filterCarts[i];
        item.data.push(cartProduct);
      }
      localStorage.setItem("carts", JSON.stringify(carts));
      showToast('success', "Product added to cart successfully !");
    } else {
      carts.push(storeCarts)
      localStorage.setItem("carts", JSON.stringify(carts));
      showToast('success', "Product added to cart successfully !");
    }
  }
  dispatch({ type: Types.POST_CARTS_LOADING, payload: carts });
  dispatch(getCartsAction());
  dispatch(handleCombineCarts());
};

export const getCartsAction = () => async (dispatch) => {
  dispatch({ type: Types.GET_CARTS_LOADING, payload: true });
  const data = getCartData();
  dispatch({ type: Types.GET_CARTS, payload: data });
};

//update cart products quantity
export const updateCartQtyAction =
  (product_id, quantity) => async (dispatch) => {
    const cartStorageData = localStorage.getItem("carts");
    let data = {
      carts: [],
      products: [],
    };

    if (typeof cartStorageData !== "undefined" && cartStorageData !== null) {
      data.carts = JSON.parse(cartStorageData);
      data.products = data.carts.products;

      let findProducts = data.carts.filter(
        (item) => item.productID === product_id
      );
      if (findProducts.length) {
        const getProductIndex = data.carts.indexOf(findProducts[0]);
        findProducts[0].quantity = quantity;
        data.carts[getProductIndex] = findProducts[0];
        localStorage.setItem("carts", JSON.stringify(data.carts));
      }
    }
    dispatch({ type: Types.UPDATE_CARTS_DATA, payload: getCartData() });
    dispatch(getCartsAction());
  };

//delete cart product
export const deleteCartItemAction = (product_id) => async (dispatch) => {
  const cartStorageData = localStorage.getItem("carts");
  let data = {
    carts: [],
    products: [],
  };

  if (typeof cartStorageData !== "undefined" && cartStorageData !== null) {
    data.carts = JSON.parse(cartStorageData);
    data.products = data.carts.products;

    let findProducts = data.carts.filter(
      (item) => item.productID !== product_id
    );

    localStorage.setItem("carts", JSON.stringify(findProducts));
  }
  dispatch({ type: Types.DELETE_CARTS_DATA, payload: getCartData() });
  dispatch(getCartsAction());
};

export const postEmptyCartMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_CART_MESSAGE, payload: true });
};

export const postEmptyCartDeleteMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_CART_DELETE_MESSAGE, payload: true });
};


function getCartData() {
  const cartStorageData = localStorage.getItem("carts");
  let data = {
    carts: [],
    products: [],
  };

  if (typeof cartStorageData !== "undefined" && cartStorageData !== null) {
    data.carts = JSON.parse(cartStorageData);
    data.products = data.carts.products;
  }
  return data;
}

//  ===================================handle coupon action==================================
export const handleChangeCouponInput = (name, value) => (dispatch) => {
  const couponData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_COUPON_INPUT_DATA, payload: couponData });
};

export const handleApplyCouponCode = (coupon, carts) => (dispatch) => {
  let responseData = {
    status: false,
    message: "",
    errorMessage: "",
    couponData: {},
    couponLoading: true,
    returnData: "",
  };
  dispatch({ type: Types.APPLY_COUPON_CODE, payload: responseData });

  const newCoupon = {
    code: coupon.code,
    carts: carts,
  };
  Axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}coupons/check-by/code`,
    newCoupon
  )
    .then((res) => {
      if (res.data.status) {
        let data = res.data;
        responseData.message = data.message;
        responseData.status = data.status;
        responseData.couponData = data.data;
        responseData.couponLoading = false;
        dispatch({ type: Types.APPLY_COUPON_CODE, payload: responseData });
      }
    })
    .catch((err) => {
      const { response } = err;
      const { request, ...errorObject } = response;
      responseData.couponLoading = false;
      (responseData.couponData = response.data),
        dispatch({ type: Types.APPLY_COUPON_CODE, payload: responseData });
    });
};

//handle change shipping cost =================================
export const handleShippingCost = (carts) => (dispatch) => {
  let responseData = {
    status: false,
    message: "",
    errorMessage: "",
    shipping: 0,
    shippingCostLoading: true,
    returnData: "",
  };
  dispatch({ type: Types.APPLY_SHIPPING_COST, payload: responseData });

  const shippingCost = {
    carts: carts,
  };
  Axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}sales/shipping-cost/by-cart`,
    shippingCost
  )
    .then((res) => {
      if (res.data.status) {
        let data = res.data;
        responseData.message = data.message;
        responseData.status = data.status;
        responseData.shipping = data.data;
        responseData.shippingCostLoading = false;
        dispatch({ type: Types.APPLY_SHIPPING_COST, payload: responseData });
      }
    })
    .catch((err) => {
      const { response } = err;
      const { request, ...errorObject } = response;
      responseData.shippingCostLoading = false;
      (responseData.shipping = response.data),
        dispatch({ type: Types.APPLY_SHIPPING_COST, payload: responseData });
    });
};


export const handleCombineCarts = () => (dispatch) => {
  const data = getCartData();
  let combineCartList = [];
  data.carts.map((item) => {
    item.data.map((cartItem) => {
      combineCartList.push(cartItem);
    })
  })
  dispatch({type: Types.GET_COMBINE_CARTS, payload: combineCartList});
  return combineCartList;
};
