import * as Types from "../types/Types";

const initialState = {
  carts: [],
  combineCartList: [],
  products: [],
  loading: false,
  loading_add: false,
  loading_update: false,
  add_message: "",
  delete_message: "",
  error: null,
  cartProduct: {
    productID: null,
    productName: '',
    quantity: '',
    price: '',
    offerPrice: '',
    productImage: ''
  },
  // Place Order Part
  totalQuantity: 0,
  totalPrice: 0,
  shippingCost: 0,
  shippingCostLoading: false,
  coupon: {
    code: "",
    carts: [
      {
        productID: "",
        quantity: ""
      }
    ]
  },
  couponLoading: false,
  couponData: {}
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CARTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case Types.POST_CARTS_LOADING:
      return {
        ...state,
        cartProduct: {
          productID: null,
          productName: '',
          quantity: '',
          price: '',
          offerPrice: '',
          productImage: ''
        }
      };
    case Types.EMPTY_CART_MESSAGE:
      return {
        ...state,
        add_message: "",
      };

    case Types.EMPTY_CART_DELETE_MESSAGE:
      return {
        ...state,
        delete_message: "",
      };

    case Types.GET_CARTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case Types.GET_CARTS:
      return {
        ...state,
        combineCartList: action.payload.combineCartList,
        carts: action.payload.carts,
        totalQuantity: calculateTotalQtyAndPrices(action.payload.combineCartList).totalQuantity,
        totalPrice: calculateTotalQtyAndPrices(action.payload.combineCartList).totalPrice,
        // shippingCost: calculateTotalQtyAndPrices(action.payload.carts).shippingCost,
        products: action.payload.products,
        loading: false,
        errors: null,
      };
    case Types.APPLY_SHIPPING_COST:
      return {
        ...state,
        shippingCost: action.payload.shipping,
        shippingCostLoading: action.payload.shippingCostLoading
      };

    case Types.POST_CARTS_DATA:
      return {
        ...state,
        carts: action.payload.carts,
        products: action.payload.products,
        loading_add: false,
        errors: null,
      };
    case Types.APPLY_COUPON_CODE:
      return {
        ...state,
        couponLoading: action.payload.couponLoading,
        couponData: action.payload.couponData,
        // coupon: initialState.coupon,
      };
    case Types.CHANGE_COUPON_INPUT_DATA:
      const coupon = { ...state.coupon };
      coupon[action.payload.name] = action.payload.value;

      return {
        ...state,
        coupon,
      };

    default:
      return {
        ...state,
      };
      break;
  }
};

const calculateTotalQtyAndPrices = (carts) => {

  const response = {
    totalQuantity: 0,
    totalPrice: 0,
  }

  for (let i = 0; i < carts.length; i++) {
    response.totalQuantity += carts[i].quantity;

    if (carts[i].isOffer !== '0' && carts[i].isOffer !== false) {
      response.totalPrice += parseFloat(carts[i].offerPrice);
    } else {
      response.totalPrice += parseFloat(carts[i].price);
    }

    response.totalPrice = response.totalPrice * parseFloat(carts[i].quantity);

    // response.shippingCost = (response.totalPrice / 100) * 5;
  }

  return response;
};

export default CartReducer;