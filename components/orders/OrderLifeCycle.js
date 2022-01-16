import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import LoadingSpinner from '../master/loading/LoadingSpinner';
import WarningMessage from '../master/warningMessage/WarningMessage';
import { getOrderLifeCycleData } from './_redux/action/OrderAction';
import dayjs from "dayjs";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreIcon from '@material-ui/icons/Store';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const OrderLifeCycle = ({ orderID }) => {

    const dispatch              = useDispatch();
    const OrderLifeCycleDetails = useSelector((state) => state.order.OrderLifeCycleDetails)
    const lifeCycleLoading      = useSelector((state) => state.order.lifeCycleLoading)
    useEffect(() => {
        dispatch(getOrderLifeCycleData(orderID))
    }, []);

    return (
        <div className="card shadow-sm mt-3 p-2" style={{ backgroundColor: "#f6f6f6" }}>
            {
                lifeCycleLoading && (
                    <LoadingSpinner text="Loading order tracking....." />
                )
            }
            {
                !lifeCycleLoading && OrderLifeCycleDetails === null && OrderLifeCycleDetails === "" && (
                    <WarningMessage text="Order life cycle data not found..." />
                )
            }
            {
                !lifeCycleLoading && OrderLifeCycleDetails !== null && OrderLifeCycleDetails !== "" && (
                    <>
                        <VerticalTimeline VerticalTimeline >
                            <VerticalTimelineElement
                                className="topTimeLines"
                                iconStyle={{ background: '#172337', color: '#fff' }}
                                icon={OrderLifeCycleDetails && OrderLifeCycleDetails.transaction_id !== null ? (
                                    <>
                                        <div className="order_lifecycle_order_ID">
                                            <p>#{OrderLifeCycleDetails.transaction_id}</p>
                                        </div>
                                    </>
                                ) : "N/A"}
                            />
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                date={<span style={{color: "#172337"}}>{OrderLifeCycleDetails && OrderLifeCycleDetails.order_create_date !== null && OrderLifeCycleDetails.order_create_date !== "" ? dayjs(OrderLifeCycleDetails.order_create_date).format("MMMM - YYYY") : "vendor do not confirmed yet!"}</span>}
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                iconStyle={OrderLifeCycleDetails.order_create_date === null || OrderLifeCycleDetails.order_create_date === "" ? { background: '#ccc', color: '#fff' } : { background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<ShoppingCartIcon />} >
                                <h5 className="vertical-timeline-element-title">Order Created</h5>
                                <small> {OrderLifeCycleDetails && OrderLifeCycleDetails.order_create_date !== null && OrderLifeCycleDetails.order_create_date !== "" ? `Order created date - ${dayjs(OrderLifeCycleDetails.order_create_date).format("DD-MM-YYYY")}` : "order do not create yet!"} </small>
                            </VerticalTimelineElement>


                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date={OrderLifeCycleDetails && OrderLifeCycleDetails.confirmed_by_vendor_date !== null && OrderLifeCycleDetails.confirmed_by_vendor_date !== "" ? dayjs(OrderLifeCycleDetails.confirmed_by_vendor_date).format("MMMM - YYYY") : "vendor do not confirmed yet!"}
                                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                iconStyle={OrderLifeCycleDetails.confirmed_by_vendor_date === null || OrderLifeCycleDetails.confirmed_by_vendor_date === "" ? { background: '#ccc', color: '#fff' } : { background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<ReceiptIcon />}>
                                <h5 className="vertical-timeline-element-title">Confirmed By Vendor</h5>
                                <p> {OrderLifeCycleDetails && OrderLifeCycleDetails.confirmed_by_vendor_date !== null && OrderLifeCycleDetails.confirmed_by_vendor_date !== "" ? `Confirmed Date : ${dayjs(OrderLifeCycleDetails.confirmed_by_vendor_date).format("DD-MM-YYYY")}` : "vendor do not confirmed yet!"} </p>
                            </VerticalTimelineElement>


                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date={OrderLifeCycleDetails && OrderLifeCycleDetails.shipped_by_vendor_date !== null && OrderLifeCycleDetails.shipped_by_vendor_date !== "" ? dayjs(OrderLifeCycleDetails.shipped_by_vendor_date).format("MMMM - YYYY") : "N / A"}
                                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                iconStyle={OrderLifeCycleDetails.shipped_by_vendor_date === null || OrderLifeCycleDetails.shipped_by_vendor_date === "" ? { background: '#ccc', color: '#fff' } : { background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<LocalShippingIcon />} >
                                <h5 className="vertical-timeline-element-title">Shipped By Vendor</h5>
                                <p> {OrderLifeCycleDetails && OrderLifeCycleDetails.shipped_by_vendor_date !== null && OrderLifeCycleDetails.shipped_by_vendor_date !== "" ? dayjs(OrderLifeCycleDetails.shipped_by_vendor_date).format("DD-MM-YYYY") : "N / A"} </p>
                            </VerticalTimelineElement>


                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date={OrderLifeCycleDetails && OrderLifeCycleDetails.delivery_by_vendor_date !== null && OrderLifeCycleDetails.delivery_by_vendor_date !== "" ? dayjs(OrderLifeCycleDetails.delivery_by_vendor_date).format("MMMM - YYYY") : "N / A"}
                                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                iconStyle={OrderLifeCycleDetails.delivery_by_vendor_date === null || OrderLifeCycleDetails.delivery_by_vendor_date === "" ? { background: '#ccc', color: '#fff' } : { background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<StoreIcon />}  >
                                <h5 className="vertical-timeline-element-title">Delivery By Vendor</h5>
                                <p> {OrderLifeCycleDetails && OrderLifeCycleDetails.delivery_by_vendor_date !== null && OrderLifeCycleDetails.delivery_by_vendor_date !== "" ? `Delivery Date : ${dayjs(OrderLifeCycleDetails.delivery_by_vendor_date).format("DD-MM-YYYY")}` : "N / A"} </p>
                            </VerticalTimelineElement>


                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                date={OrderLifeCycleDetails && OrderLifeCycleDetails.received_by_customer_date !== null && OrderLifeCycleDetails.received_by_customer_date !== "" ? dayjs(OrderLifeCycleDetails.received_by_customer_date).format("MMMM - YYYY") : "N / A"}
                                // iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                iconStyle={OrderLifeCycleDetails.received_by_customer_date === null || OrderLifeCycleDetails.received_by_customer_date === "" ? { background: '#ccc', color: '#fff' } : { background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<SportsKabaddiIcon />} >
                                <h5 className="vertical-timeline-element-title">Received By Customer</h5>
                                <p> {OrderLifeCycleDetails && OrderLifeCycleDetails.received_by_customer_date !== null && OrderLifeCycleDetails.received_by_customer_date !== "" ? `Customer Received Date : ${dayjs(OrderLifeCycleDetails.received_by_customer_date).format("DD-MM-YYYY")}` : "N / A"} </p>
                            </VerticalTimelineElement>


                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                date={OrderLifeCycleDetails && OrderLifeCycleDetails.feedback_by_customer_date !== null && OrderLifeCycleDetails.feedback_by_customer_date !== "" ? dayjs(OrderLifeCycleDetails.feedback_by_customer_date).format("MMMM - YYYY") : "N / A"}
                                // iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                iconStyle={OrderLifeCycleDetails.feedback_by_customer_date === null || OrderLifeCycleDetails.feedback_by_customer_date === "" ? { background: '#ccc', color: '#fff' } : { background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<FeedbackIcon />}>
                                <h5 className="vertical-timeline-element-title">Feedback From Customer</h5>
                                <p> {OrderLifeCycleDetails && OrderLifeCycleDetails.feedback_by_customer_date !== null && OrderLifeCycleDetails.feedback_by_customer_date !== "" ? `Date : ${dayjs(OrderLifeCycleDetails.feedback_by_customer_date).format("DD-MM-YYYY")}` : "N / A"} </p>
                            </VerticalTimelineElement>


                            <VerticalTimelineElement
                                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                                icon={<CheckCircleOutlineIcon />}
                            />
                        </VerticalTimeline>
                    </>
                )
            }

        </div>
    );
};

export default OrderLifeCycle;