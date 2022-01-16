import React, { useEffect } from 'react';
import PageTitle from '../master/page-title/PageTitle.jsx'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from './_redux/action/OrderAction.js';
import LoadingSkelleton from '../master/skelleton/LoadingSkelleton.jsx';
import SingleOrder from './SingleOrder.js';
import dayjs from 'dayjs';
import { formatCurrency } from '../../services/currency.js';
// import OrderLifeCycle from './OrderLifeCycle.js';

const OrderDetails = ({ orderID }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { manageOrder } = router.query;
    const { orderDetails, isLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderDetails(manageOrder))
    }, [])

    // const handleClick = (event) => {
    //     setShowTooltip(!showTooltip);
    //     setTarget(event.target);
    // };

    return (
        <>
            <PageTitle title="Order Details" />
            {
                isLoading && (
                    <div className="card shadow-sm">
                        <LoadingSkelleton
                            alignment="vertical"
                            count={1}
                            width="100%"
                            height={150}
                        />
                    </div>
                )
            }
            {
                orderDetails !== null && (
                    <>
                        <div className="card shadow-sm p-2">
                            <div className="d-flex justify-content-between">
                                <div className="details_heading">
                                    <div className="order_id">Order #{orderDetails.id}</div>
                                    <small className="text-secondary">Placed on {dayjs(orderDetails.transaction_date).format("dddd, MMMM Do YYYY")}</small>
                                </div>
                                <div className="">
                                    <small className="order_total_price"><span className="text-secondary">Due Total</span>&nbsp; &nbsp; :  {formatCurrency(orderDetails.due_total)}</small>
                                    <small className="order_total_price"><span className="text-secondary">Paid Total</span>&nbsp; &nbsp; :  {formatCurrency(orderDetails.paid_total)}</small>
                                    <small className="order_total_price"><span className="text-secondary">Grand Total </span> :  {formatCurrency(orderDetails.final_total)}</small>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 mb-3">
                            <SingleOrder item={orderDetails} isManageable={false} />
                            {/* <OrderLifeCycle orderID={manageOrder} /> */}
                        </div>
                    </>
                )
            }

        </>
    );
};

export default OrderDetails;