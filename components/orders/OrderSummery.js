import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { handleApplyCouponCode, handleChangeCouponInput, handleShippingCost } from './_redux/action/OrderAction';
import { getCartsAction } from '../carts/_redux/action/CartAction';
import ErrorMessage from '../master/message/ErrorMessage'
import { activeCurrency, formatCurrency } from '../../services/currency';
import SimpleBtn from '../master/SimpleBtn/SimpleBtn';

const OrderSummery = ({ handleClick, buttonText }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const { carts, totalPrice } = useSelector((state) => state.cart);

    const { coupon, couponLoading, couponData, shippingCostLoading, isSubmitting } = useSelector((state) => state.order);
    const { shippingCost } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getCartsAction());
        dispatch(handleShippingCost(carts))
    }, []);


    const handleChangeCouponCode = (name, value) => {
        dispatch(handleChangeCouponInput(name, value))
    }

    const onSubmit = () => {
        dispatch(handleApplyCouponCode(coupon, carts))
    };

    let totalAmount = 0;

    if (couponData && couponData.discount_amount) {
        totalAmount = parseFloat( (totalPrice + parseFloat(shippingCost)) - couponData.discount_amount );
    } else {
        totalAmount = parseFloat( totalPrice + parseFloat(shippingCost) );
    }

    return (
        <>
            <Card className="mb-3">
                <div className="cart__right-container">
                    <div className="cart__right-header">
                        <p>Order Summary </p>
                    </div>
                    <div className="cart__right-order_details">
                        <div className="cart__right-order_details_inner">
                            <div className="cart__right-order_details_item">
                                <p className="font-weight-bold">Sub Total ({carts.length} items)</p>
                                <p className="font-weight-bold">{formatCurrency(totalPrice)} {activeCurrency('code')}</p>
                            </div>
                            <div className="cart__right-order_details_item">
                                <p className="font-weight-bold">Delivery Fee</p>
                                {
                                    !shippingCostLoading && (
                                        <p className="font-weight-bold">{formatCurrency(shippingCost)} {activeCurrency('code')}</p>
                                    )
                                }
                                {
                                    shippingCostLoading && (
                                        <div>
                                            <p className="spinner-border" role="status"> <span className="sr-only">Loading...</span></p>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="cart__right-order_details_item">
                                <p className="font-weight-bold">Discount</p>
                                <p className="font-weight-bold">{formatCurrency(couponData && couponData.discount_amount ? couponData.discount_amount : 0)} {activeCurrency('code')} </p>
                            </div>

                            <hr />

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="d-flex flex-column justify-content-between align-items-center ">
                                    <input
                                        className="form-control coupon-input"
                                        name="code"
                                        autoComplete="off"
                                        placeholder="Discount Code"
                                        value={coupon.code && coupon.code}
                                        onChange={(e) => handleChangeCouponCode("code", e.target.value)}
                                        ref={register({ required: true })}
                                    />
                                    <br />
                                    <SimpleBtn
                                        variant="success"
                                        type="submit"
                                        onClick={() => {}} 
                                        disabled={couponLoading ? true : false}
                                     >
                                        { couponLoading ? 'Checking...' : 'APPLY' }
                                    </SimpleBtn>
                                    {/* <button disabled={couponLoading ? true : false} className="btn btn-success ml-2 btn-coupon-apply" type="submit">
                                        { couponLoading ? 'Checking...' : 'APPLY' }
                                    </button> */}
                                </div>
                                <div> {errors.code ?
                                    <ErrorMessage message="Please add your discount code." />
                                    :
                                    (couponData && !couponData.errors && couponData.message ? (
                                        <p className="text-success font-weight-bold mt-2">{couponData.message}</p>
                                    ) : couponData && couponData.errors && (
                                        <ErrorMessage message={couponData.errors.message} />
                                    )
                                    )}
                                </div>
                            </form> <hr />

                            <div className="cart__right-order_details_item">
                                <p className="font-weight-bold">Total</p>
                                <p className="font-weight-bold">{formatCurrency(totalAmount)} {activeCurrency('code')}</p>
                            </div>
                            <div style={{background: 'rgba(230, 46, 4, 0.15)', color: '#e62e04'}} className="p-2 custom_delivery_charge mb-3">
                                {/* <span className="checkout_delivery_free_message_title d-block">Delivery Charge : </span> */}
                                {/* <span className="mt-1 mb-2 d-block">Inside Dhaka Metro-60/= (+Delivery charge will increase if product is heavier)</span> */}
                                <span>The minimum order amount is 300Taka</span>
                                <span className='d-block'>
                                    Inside Dhaka delivery charge 60tk and outside 120tk. Delivery charges may vary with product size, weight and delivery location!
                                </span>
                            </div>
                            <p className="text-right border-top text-secondary pt-3 mb-1">
                                <b>VAT</b> included, where applicable
                            </p>
                            {
                                !isSubmitting && (
                                    <SimpleBtn 
                                        className="mt-2"
                                        variant="danger" 
                                        onClick={handleClick} 
                                        disabled={carts.length === 0 ? true : false}
                                    >
                                        {buttonText}
                                    </SimpleBtn>
                                )
                            }
                            {
                                isSubmitting &&
                                (
                                    <SimpleBtn
                                        className="mt-2"
                                        variant="danger"
                                        onClick={handleClick} 
                                        disabled={carts.length === 0 ? true : false}
                                    >
                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>  {buttonText}
                                </SimpleBtn>
                                )
                            }
                        </div>
                    </div>

                    {/* <div className="cart__right-footer">
                        <div className="cart__proceed-btn">
                        </div>
                    </div> */}
                </div>
            </Card>
        </>
    );
};

export default OrderSummery;