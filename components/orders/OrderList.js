import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FilterOrderList from './FilterOrderList';
import PageTitle from '../master/page-title/PageTitle.jsx'
import { getUserOrderList } from './_redux/action/OrderAction';
import Translate from "../translation/Translate.js";

const OrderList = () => {

    const dispatch = useDispatch();
    const { orderList, isLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getUserOrderList(5))
    }, [])

    return (
        <section className="order_section">
            <PageTitle title={<Translate>My Orders</Translate>} />
            <div className="order_filter_section">
                <FilterOrderList orderList={orderList} isLoading={isLoading} />
            </div>
        </section>
    );
};

export default OrderList;