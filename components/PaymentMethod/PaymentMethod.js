import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastTransactionData } from '../Delivery/_redux/Action/DeliveryInfoAction';
import { getPaymentMethodList } from './_redux/Action/PaymentMethodAction';
import Bkash from './PayMethod/Bkash/Bkash';
import MasterCard from './PayMethod/MasterCard/MasterCard';
import CashOnDelivery from './PayMethod/CashOnDelivery/CashOnDelivery';
import Rocket from './PayMethod/Rocket/Rocket';
import PageTitle from '../master/page-title/PageTitle.jsx'
import LoadingSkelleton from '../master/skelleton/LoadingSkelleton.jsx'
import { Nav } from 'react-bootstrap';
import PaymentAmount from './PaymentAmount'
import { showToast } from '../master/Helper/ToastHelper';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState(-1);
    const [payMethod, setPayMethod] = useState('bkash');

    const paymentMethod = useSelector((state) => state.paymentMethod.paymentMethod);
    const isLoading = useSelector((state) => state.paymentMethod.isLoading);

    useEffect(() => {
        dispatch(getPaymentMethodList());
        setTransactionInformation();
    }, []);

    useEffect(() => {
        if (transaction === null) {
            showToast('error', 'No Order found. Please buy some product first !');

            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }, [transaction]);

    const setTransactionInformation = async () => {
        const transaction = await getLastTransactionData();
        setTransaction(transaction);
    }

    return (
        <div>
            <div className="checkoutPayment">
                <div className="container">
                    <PageTitle title='Payment' description='Select Payment Method' />
                    <div className="row">
                        <div className="col-md-8">
                            {isLoading && (
                                <div className="p-3">
                                    <LoadingSkelleton
                                        alignment="vertical"
                                        count={1}
                                        width={700}
                                        height={120}
                                    />
                                </div>
                            )}
                            <Nav defaultActiveKey={''}>
                                {paymentMethod.length > 0 && (
                                    paymentMethod.map((item) => (
                                        <Nav.Item className={`payment-method ${payMethod === item.code ? 'active' : ''}`} onClick={() => setPayMethod(item.code)} key={item.id}>
                                            <h6 className="text-center">{item.name}</h6>
                                            <img className="img-fluid text-center" src={item.image_url} alt={item.name} />
                                        </Nav.Item>
                                    ))
                                )}
                            </Nav>

                            {payMethod === "bkash" && <Bkash transaction={transaction} />}
                            {payMethod === "rocket" && <Rocket transaction={transaction} />}
                            {payMethod === "card" && <MasterCard transaction={transaction} />}
                            {payMethod === "cash_in" && <CashOnDelivery transaction={transaction} />}

                        </div>
                        <div className="col-md-4">
                            <div className="card m-2">
                                <PaymentAmount />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;