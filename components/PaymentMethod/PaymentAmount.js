import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartsAction, handleShippingCost } from '../_redux/CartProduct/Action/CartAction';
import { Card } from 'react-bootstrap'

const PaymentAmount = () => {
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.CartReducer.carts);
    const totalPrice = useSelector((state) => state.CartReducer.totalPrice);
    const couponData = useSelector((state) => state.CartReducer.couponData);
    const shippingCost = useSelector((state) => state.CartReducer.shippingCost);
    const shippingCostLoading = useSelector((state) => state.CartReducer.shippingCostLoading);

    useEffect(() => {
        dispatch(getCartsAction());
        dispatch(handleShippingCost(carts))
    }, []);

    const deliveryFee = 50;
    let totalAmount;
    if (couponData && couponData.discount_amount) {
        totalAmount = (totalPrice + deliveryFee + shippingCost) - discount_amount;
    } else {
        totalAmount = (totalPrice + deliveryFee + shippingCost);
    }

    return (
        <>
            <Card>
                <div className="cart__right-container">
                    <div className="cart__right-header">
                        <p>Price Detail</p>
                    </div>
                    <div className="cart__right-order_details">
                        <div className="cart__right-order_details_inner">
                            <div className="cart__right-order_details_item">
                                <p>Sub Total({carts.length} items)</p>
                                <p>TK {totalPrice} BDT</p>
                            </div>
                            <div className="cart__right-order_details_item">
                                <p>Delivery Fee</p>
                                <p>TK {deliveryFee} BDT</p>
                            </div>
                            <div className="cart__right-order_details_item">
                                <p>Shipping Cost</p>
                                {
                                    !shippingCostLoading && (
                                        <p>TK {shippingCost} BDT</p>
                                    )
                                }
                                {
                                    shippingCostLoading && (
                                        <p>
                                            <div class="spinner-border" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </p>
                                    )
                                }
                            </div>
                            <div className="cart__right-order_details_item">
                                <p> Discount</p>
                                <p>TK  {couponData && couponData.discount_amount ? couponData.discount_amount : 0} BDT</p>
                            </div>
                            <div className="cart__right-order_details_item">
                                <p>Total</p>
                                <p>TK {totalAmount} BDT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default PaymentAmount;