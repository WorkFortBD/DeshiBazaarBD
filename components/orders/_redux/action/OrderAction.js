import Axios from "axios";
import * as Types from "../types/Types";
import { showToast } from "../../../master/Helper/ToastHelper";
import dayjs from "dayjs";
import { getCartsAction } from "../../../carts/_redux/action/CartAction";
import { encrypt } from "../../../master/utils/EncryptHelper";

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
    status       : false,
    message      : "",
    errorMessage : "",
    couponData   : {},
    couponLoading: true,
    returnData   : "",
  };
  dispatch({ type: Types.APPLY_COUPON_CODE, payload: responseData });

  const newCoupon = {
    code: coupon.code,
    carts: carts,
  };
  Axios.post(
    `coupons/check-by/code`,
    newCoupon
  )
    .then((res) => {
      if (res.data.status) {
        let data                   = res.data;
        responseData.message       = data.message;
        responseData.status        = data.status;
        responseData.couponData    = data.data;
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

/**
 * Handle Get Shipping Cost.
 *
 * It will calculate the shipping cost based on cart and authenticated default shipping address.
 *
 * @param array carts
 *
 * @return void
 */
export const handleShippingCost = (carts = []) => (dispatch) => {
  let responseData = {
    status             : false,
    message            : "",
    errorMessage       : "",
    shipping           : 0,
    shippingCostLoading: true,
    returnData         : "",
  };
  dispatch({ type: Types.APPLY_SHIPPING_COST, payload: responseData });

  const cartsData = localStorage.getItem('carts');
  const cart      = typeof cartsData !== 'undefined' && cartsData !== null ? JSON.parse(cartsData) : [];

  const filteredCart = cart.filter(item => item.isChecked)

  const shippingCost = {
    carts: filteredCart,
  };

  Axios.post(`shipping/shipping-cost-by-cart`, shippingCost)
    .then((res) => {
      if (res.data.status) {
        let data                         = res.data;
        responseData.message             = data.message;
        responseData.status              = data.status;
        responseData.shipping            = data.data;
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



/**
 * Get orderList by specific user 
 * 
 * @since 1.0.0
 *  
 * @params int value
 * @return array oderList based on user_id
 */
export const getUserOrderList = (value = 5) => (dispatch) => {
  const responseData = {
    orderList: [],
    status   : false,
    isLoading: true,
  }
  dispatch({ type: Types.GET_USER_ORDER_LIST, payload: responseData });

  const end_date  = dayjs().format('YYYY-MM-DD');
  let start_date = end_date;
  let orderListURL = `sales/orders/customer?paginate_no=5`;

  if (value == 15) {
    start_date = dayjs().subtract(15, 'day').format('YYYY-MM-DD');
  } else if (value == 30) {
    start_date = dayjs().subtract(30, 'day').format('YYYY-MM-DD');;
  } else if (value == 60) {
    start_date = dayjs().subtract(60, 'day').format('YYYY-MM-DD');
  }

  if (typeof value === 'undefined' || value == 5) {
    orderListURL = `sales/orders/customer?paginate_no=5`
  } else {
    orderListURL = `sales/orders/customer?start_date=${start_date}&end_date=${end_date}`
  }

  Axios.get(orderListURL)
  .then((res) => {
    responseData.orderList = res.data.data.data;
    responseData.status    = true;
    responseData.isLoading = false;
    dispatch({ type: Types.GET_USER_ORDER_LIST, payload: responseData });
  }).catch((error) => {
    const responseLog      = error.response;
    responseData.isLoading = false;
    if (typeof responseLog !== 'undefined') {
      showToast('error', responseLog.data.message);
      dispatch({ type: Types.GET_USER_ORDER_LIST, payload: responseData });
    }
  })
}

/**
 * Get orderList filter value
 * 
 * @since 1.0.0
 * 
 * @return array filter value of order list
 */
export const getFilterOptionDataForOrderList = () => async (dispatch) => {
  const filterOptionList = [
    { value: '5',  label: 'Last 5 Orders' },
    { value: '15', label: 'Last 15 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '60', label: 'Last 2 Months' },
  ]

  dispatch({ type: Types.GET_ORDER_FILTER_OPTION_DATA, payload: filterOptionList });
}


/**
 * Get tracking process data
 * 
 * @since 1.0.0
 * 
 * @return array for tracking step timeline
 */
export const getTrackingTimelineDate = () => async (dispatch) => {
  const responseData = {
    trackingTimelineList: [],
    status              : false,
    isLoading           : true,
  }

  dispatch({ type: Types.GET_TRACKING_TIMELINE_DATA, payload: responseData });

  await Axios.get(`sales?business_id=${1}`)
    .then((res) => {
      responseData.trackingTimelineList = [  // @todo this data will be change, when use real api
        {
          date: "28 July, 2021",
          name: "Your order has been received!",
          //   s   : "lorem imp ",
          //   t   : "maor k"
        },
        {
          date: "30 July, 2021",
          name: "Your order has been on processing..!",
        },
        {
          date: "01 July, 2021",
          name: "Your order has been packing..!",
        },
        {
          date: "03 July, 2021",
          name: "We handover your order on Sundar Ban courier service!",
        },
        {
          date: "04 July, 2021",
          name: "We pick up your parcel!",
        },
        {
          date: "06 July, 2021",
          name: "Your parcel is move to chittagong!",
        },
        {
          date: "08 July, 2021",
          name: "Chittagong branch receive your parcel!",
        },
        {
          date: "10 July, 2021",
          name: "Order delivered successfully!",
        },
      ]
      responseData.status    = true;
      responseData.isLoading = false;
      dispatch({ type: Types.GET_TRACKING_TIMELINE_DATA, payload: responseData });
    }).catch((error) => {
      const responseLog      = error.response;
      responseData.isLoading = false;

      if (typeof responseLog !== 'undefined') {
        showToast('error', responseLog.data.message);
        dispatch({ type: Types.GET_TRACKING_TIMELINE_DATA, payload: responseData });

      }
    })
}
/**
 * Cancel order
 * 
 * @since 1.0.0
 * 
 * @param id //order id
 * 
 * @return array for tracking step timeline
 */
export const handleCancelOrder = (order_id, closeModal, user_id) => (dispatch) => {
  const responseData = {
    status   : false,
    isLoading: true
  }
  dispatch({ type: Types.CANCEL_ORDER, payload: responseData });

  Axios.put(`sales/orders/suspend/${order_id}`)
    .then((res) => {
      if (res.data.status) {
        responseData.status    = true;
        responseData.isLoading = false;
        showToast("success", res.data.message);
        dispatch({ type: Types.CANCEL_ORDER, payload: responseData });
        closeModal()
        dispatch(getFilterOptionDataForOrderList(user_id))
      }
    }).catch((err) => {
      const { response }     = err;
      responseData.isLoading = false;
      const { request, ...errorObject } = response;
      dispatch({ type: Types.CANCEL_ORDER, payload: responseData });

    })
}

/**
 * Order details
 * 
 * @since 1.0.0
 * 
 * @param   int     order_id Order ID
 * 
 * @return  object   orders details
 */
 export const getOrderDetails = (order_id) => (dispatch) => {
  const responseData = {
    data     : null,
    status   : false,
    isLoading: true
  }
  dispatch({ type: Types.GET_ORDER_DETAILS, payload: responseData });

  Axios.get(`sales/orders/customer?id=${order_id}`)
    .then((res) => {
      if (res.data.status) {
        if (res.data.data.data.length > 0) {
          responseData.status                = true;
          responseData.isLoading             = false;
          responseData.data                  = res.data.data.data[0];
          responseData.data.final_total      = getValidDecimalValue(responseData.data.final_total);
          responseData.data.shipping_charges = getValidDecimalValue(responseData.data.shipping_charges);
          responseData.data.discount_amount  = getValidDecimalValue(responseData.data.discount_amount);

          dispatch({ type: Types.GET_ORDER_DETAILS, payload: responseData });
        }
      }
    }).catch((err) => {
      const { response }                = err;
      responseData.isLoading            = false;
      const { request, ...errorObject } = response;
      dispatch({ type: Types.GET_ORDER_DETAILS, payload: responseData });
    });
}

/**
 * Create Ecommerce Order.
 *
 * It will create an order and follow the following steps:
 * 1. Process data for order
 * 2. Create an order
 * 3. If Cash-in delivery, then create and redirect to order details invoice page
 * 4. If Online-payment, then create and get checkout url from payment gateway
 *    and redirect to that url.
 * 5. After completing the payment, then redirect to order details page.
 *
 * @return void
 */
export const createOrder = (customerInfo, carts, totalQuantity, shippingCost, totalPrice, couponData, userData) => (dispatch) => {

  let discountAmount = 0, discountType = 1;

  if ( typeof couponData !== 'undefined' && couponData !== null ) {
      discountAmount = couponData.discount_amount;
      discountType   = 2; // 2 = Coupon Discount
  }

  shippingCost = isNaN(shippingCost) ? 0 : parseFloat(shippingCost);

  const payment_method = localStorage.getItem('payment_method') || 'cash';
  let sale_lines       = [];

  carts.forEach((item) => {
      const singleItem = {
          item_id           : item.productID,
          quantity          : parseInt(item.quantity),
          unit_price        : (item.offerPrice > 0 && item.isOffer) ? item.offerPrice : item.price,
          unit_price_inc_tax: (item.offerPrice > 0 && item.isOffer) ? item.offerPrice : item.price,
          discount_amount   : 0,
          item_tax          : 0
      }

      if(item.isChecked) {
          sale_lines.push(singleItem)
      }
  });

  const totalPayableAmount = parseFloat(shippingCost + totalPrice - discountAmount);
  const orderPostedData = {
      business_id     : userData.business_id,
      created_by      : 1,
      type            : "sell",
      status          : 'pending',
      delivery_status : 'not_delivered',
      payment_status  : 'due', // @todo No needs
      title           : 'Ecommerce Sale', // @todo No needs
      invoice_no      : null, // @todo No needs
      ref_no          : null, // @todo No needs
      transaction_date: dayjs().format("YYYY-MM-DD"),
      total_before_tax: totalPrice,
      tax_amount      : 0,
      discount_type_id: discountType,
      tax_id          : 1,
      discount_amount : discountAmount,
      shipping_details: '', // @todo No needs, remove when fixed api
      order_quantity  : totalQuantity,
      shipping_charges: shippingCost,
      additional_notes: '',
      staff_note      : '',
      paid_total      : 0,
      due_total       : totalPayableAmount,
      final_total     : totalPayableAmount,
      sale_lines      : sale_lines,
      payment_method  : payment_method,
      coupon          : couponData !== null ? couponData.code : null
  }

  let response = {
      status   : false,
      isLoading: true,
      orderData: {}
  }

  dispatch({ type: Types.ORDER_SUBMIT, payload: response });
  const invoiceURL = `${window.location.protocol}//${window.location.host}/order/invoice/`;

  if(typeof payment_method === 'undefined' && payment_method === null || payment_method === '') {
      showToast('error', 'Please select a payment method');
      return false;
  }

  Axios.post('sales', orderPostedData)
      .then((res) => {
          if (res.data.status) {
              response.status    = res.data.status;
              response.orderData = res.data.data;
              response.isLoading = false;
              dispatch(getCartsAction());
              localStorage.setItem('tr', encrypt(res.data.data.id));
              
              showToast('success', res.data.message);
              dispatch({ type : Types.ORDER_SUBMIT, payload: response });
              
              setTimeout(() => {
                if(payment_method === 'cash') {
                  window.location.href = `${invoiceURL}${res.data.data.id}`;
                  localStorage.removeItem("carts");
                } else {
                    localStorage.removeItem("carts");
                      if(res.data.data.payment !== null) {
                          window.location.href = res.data.data.payment.forwarding_url
                      } else {
                          showToast('error', 'Payment Error. please try again.');
                      }
                  }
              }, 1000);
          }
      }).catch((err) => {
        // console.log('err', err);
          const responseLog = err.response;
          response.isLoading = false;

          if (typeof responseLog !== 'undefined') {
              const { request, ...errorObject } = responseLog;
              showToast('error', responseLog.data.message);
              dispatch({ type: Types.ORDER_SUBMIT, payload: response })
          }
      })
}

/**
 * Get Valid Decimal Value from amount
 *
 * @param {int} value
 *
 * @returns
 */
const getValidDecimalValue = (value) => {
  if(typeof value === 'undefined' || value === null || value === '' ) {
    return 0;
  }

  return parseFloat( value );
}

//get order life cycle details data
export const getOrderLifeCycleData = (id) => (dispatch) => {
  let responseList = {
      isLoading    : true,
      data         : {},
      status       : false,
  };
  dispatch({ type: Types.GET_ORDER_LIFECYCLE_DETAILS, payload: responseList });
  Axios.get(`sales/order-lifecycle/${id}`)
      .then((res) => {
          if (res.data.status) {
              const { data, message, status } = res.data;
              responseList.status             = status;
              responseList.data               = data;
              responseList.message            = message;
              responseList.isLoading          = false;
              dispatch({ type: Types.GET_ORDER_LIFECYCLE_DETAILS, payload: responseList });
          }
      }).catch((err) => {
          responseList.isLoading = false;
          dispatch({ type: Types.GET_ORDER_LIFECYCLE_DETAILS, payload: responseList });
      })
}