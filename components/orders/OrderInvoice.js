import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import Translate from '../translation/Translate';
import { formatCurrency } from '../../services/currency';
import { getOrderDetails } from './_redux/action/OrderAction';
import { productImageUrl } from '../../services/ProductService';

/**
 * Order Invoice component.
 *
 * Responsible for Order Invoice Format & Status
 *
 * @param {int} order ID
 *
 * @return
 */
const OrderInvoice = ({ title = translate('Invoice'), id, is_invoice = false }) => {

    const dispatch = useDispatch();
    const { orderDetails, isLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, []);

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    return (
        <div>
            {
                typeof orderDetails !== 'undefined' && orderDetails !== null &&
                <div className="row" id="printable-invoice-area">
                    <div className="col-12 p-0 p-md-2" >
                        <div className="bg-white text-center py-4 mb-3">
                            <div style={{color: 'var(--color-green-light)'}}>
                                <p style={{fontSize: '20px', fontWeight: '600'}} >Thank you</p>
                                <i style={{fontSize: '4rem'}} className="far fa-check-circle mb-3"></i>
                            </div>
                            <p style={{fontSize: '20px', fontWeight: '600'}}>Your order successfully placed</p>
                        </div>
                    </div>
                    <div className="col-12 mb-3 col-lg-8 p-0 p-md-2">
                        <div className="card card-body order-success-left">
                            <div className="row order-invoice-header">
                                <div className="col-12 col-lg-3">
                                    <img src={'/images/logos/logo-en.svg'} alt="" className="invoice-logo" width={100} />
                                </div>
                                <div className="col-12 mt-2">
                                    <h3>{title} {is_invoice ? `#${id}` : ``} </h3>
                                    <h4><Translate>Order No </Translate>: <span className="small">{id}</span></h4>
                                    <p><Translate>Order Placed at </Translate> : {' '}
                                    <span className="small">
                                        {dayjs(orderDetails.transaction_date).format("dddd, MMMM Do YYYY")}
                                    </span></p>
                                </div>
                            </div>
                            <div className="order-details">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-4 single-order-row-item">
                                        <h5><Translate>Your Information</Translate></h5>
                                        <p>{`${orderDetails.customer_first_name} ${orderDetails.customer_last_name}`}</p>
                                        <p><a href={`mailto:${orderDetails.customer_email}`}>{orderDetails.customer_email}</a></p>
                                        <p><a href={`tel:${orderDetails.customer_phone_no}`}>{orderDetails.customer_phone_no}</a></p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 single-order-row-item">
                                        <h5><Translate>Payment Information</Translate></h5>
                                        {/* <p>VISA *******************35</p>
                                        <p>Exp: 05/25</p> */}
                                        {/* <p>Cash In Delivery</p> */}

                                        {
                                            orderDetails.payment_status === 'due' &&
                                            <p>
                                                <span className="bg-warning border-radius-5 p-1">
                                                    <i className="fas fa-times"></i>
                                                    {' '}
                                                    <Translate>Not Paid</Translate>
                                                </span>
                                            </p>
                                        }
                                        {
                                            orderDetails.payment_status === 'paid' &&
                                            <p>
                                                <span className="bg-success border-radius-5 p-1">
                                                    <i className="fas fa-check"></i>
                                                    {' '}
                                                    <Translate>Paid</Translate>
                                                </span>
                                                <br /><br />
                                                <span className="bg-warning border-radius-5 p-1">
                                                    <i className="fas fa-check"></i>
                                                    {' '}
                                                    Paid via: {orderDetails.payment_method}
                                                </span>
                                            </p>
                                        }
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 single-order-row-item">
                                        <h5><Translate>Shipping Method</Translate></h5>
                                        <p>Standard Delivery</p>
                                        <p>3-7 Business Days</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 single-order-row-item">
                                        <h5><Translate>Shipping Address</Translate></h5>
                                        <p>
                                            {orderDetails.shipping_street1}, {orderDetails.shipping_street2}
                                        </p>
                                        <p>
                                            {orderDetails.shipping_area}
                                        </p>
                                        <p>
                                            {orderDetails.shipping_city}
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 single-order-row-item">
                                        <h5><Translate>Billing Address</Translate></h5>
                                        <p>
                                            {orderDetails.billing_street1}, {orderDetails.billing_street2}
                                        </p>
                                        <p>
                                            {orderDetails.billing_area}
                                        </p>
                                        <p>
                                            {orderDetails.billing_city}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 p-0 p-md-2">
                        <div className="card card-body order-success-right">
                            {/* <button className="btn btn-success btn-sm btn-print non-printable" onClick={() => printDiv('printable-invoice-area')}> 
                                <span>
                                    <i className="fas fa-print"></i>
                                </span>
                                {' '} <Translate>Print</Translate>
                            </button> */}

                            <h3><Translate>Order Summary</Translate></h3>
                            {orderDetails.items && orderDetails.items.length > 0 && orderDetails.items.map((product, indexProduct) => (
                                <div className="order-product-item" key={indexProduct}>
                                    <div className="row">
                                        <div className="col-2">
                                            <img src={productImageUrl(product.featured_image)} width={50} />
                                        </div>
                                        <div className="col-6">
                                            <h4>{product.name}</h4>
                                        </div>
                                        <div className="col-4">
                                            <p>
                                                <b>{formatCurrency(product.quantity, ',', '')} </b>
                                                X
                                                <b>{formatCurrency(product.unit_price_inc_tax)} </b>
                                            </p>
                                            <p className="product-subtotal">
                                                {formatCurrency(product.unit_price_inc_tax * product.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-2">
                                <table className="table table-borderless order-calculation-table">
                                    <tbody>
                                        <tr>
                                            <td><Translate>Sub Total</Translate></td>
                                            <td>{formatCurrency((orderDetails.final_total) - (orderDetails.shipping_charges) - (orderDetails.discount_amount))}</td>
                                        </tr>
                                        <tr>
                                            <td><Translate>Shipping Cost</Translate></td>
                                            <td>{formatCurrency((orderDetails.shipping_charges))}</td>
                                        </tr>
                                        <tr>
                                            <td><Translate>Discount</Translate></td>
                                            <td>{formatCurrency((orderDetails.discount_amount))}</td>
                                        </tr>
                                        <tr>
                                            <td className="grand-total-text"><Translate>Grand Total</Translate></td>
                                            <td className="grand-total-amount">{formatCurrency(orderDetails.final_total)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                 typeof orderDetails === 'undefined' || orderDetails === null &&
                 <div className="row">
                    <div className="col-12" >
                        <div className="bg-white text-center py-4 mb-3">
                            <div style={{color: 'var(--color-green-light)'}}>
                                <p style={{fontSize: '20px', fontWeight: '600'}} >Thank you</p>
                                <i style={{fontSize: '4rem'}} className="far fa-check-circle mb-3"></i>
                            </div>
                            <p style={{fontSize: '20px', fontWeight: '600'}}>Your order successfully placed</p>
                        </div>
                    </div>
                 </div>
            }
        </div>
    );
}

export default OrderInvoice;