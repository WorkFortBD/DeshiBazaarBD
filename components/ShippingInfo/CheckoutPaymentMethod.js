import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckoutPaymentMethods } from './_redux/Action/ShippingInfoAction';

const CheckoutPaymentMethod = () => {

    const dispatch                  = useDispatch();
    const { paymentMethods }        = useSelector((state) => state.OrderShipping);
    const [payMethod, setPayMethod] = useState('cash');

    useEffect(() => {
        dispatch(getCheckoutPaymentMethods());
        const payment_method = localStorage.getItem('payment_method') || 'cash';
        localStorage.setItem('payment_method', payment_method);
        setPayMethod(payment_method);
    }, []);

    return (
        <div className="card shadow-md mb-2">
            <p className="checkout_payment_method_title p-3">Select Payment Method</p>
            <div className="checkout_payment">
                {
                    paymentMethods.length > 0 && paymentMethods.map((item, index) => {
                        return (
                            <div className="shipping_payment_method_section" key={index + 1}>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        onChange={() => {
                                            setPayMethod(item.id);
                                            localStorage.setItem('payment_method', item.id);
                                        }}
                                        type="radio"
                                        name={item.name}
                                        id={item.id}
                                        checked={item.id === payMethod ? true : false}
                                    />
                                    <label class="form-check-label" htmlFor={item.id}>
                                        {item.name}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default CheckoutPaymentMethod;