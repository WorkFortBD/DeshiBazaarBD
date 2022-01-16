import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getDefaultAddress, getSingleAddress } from '../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction';
import LoadingSpinner from '../master/loading/LoadingSpinner';
import SimpleModal from '../master/modal/SimpleModal';
import AddressUpdate from '../ProfileAccountSetting/AddressUpdate';
import WarningMessage from '../master/warningMessage/WarningMessage';
import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
import content from '../../content.json';

const ShippingInfo = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);

    const { isLoading, defaultBillingAddress } = useSelector((state) => state.userProfile);

    const toggleShowHandler = () => {
        setShow(preState => !preState);
    }

    const editHandler = (id, type) => {
        dispatch(getSingleAddress(id, type));
        // dispatch(getSingleAddress(1, "shipping_address"));
        setShow(preState => !preState);
    }

    useEffect(() => {
        if(userData) {
            dispatch(getDefaultAddress('shipping_address'))
            dispatch(getDefaultAddress('billing_address'))
            dispatch(getAddress('billing_address', userData.id));
        }

    }, [])

    return (
        <>
            <div className="card shadow-md mb-2">
                <div className="shipping_info_title pt-3 px-2 d-flex justify-content-between align-items-center pb-2">
                    <div className="">
                        <p className="checkout_shipping_title m-0">Shipping & Billing</p>
                    </div>
                    {
                        !isLoading && defaultBillingAddress !== null && defaultBillingAddress.length === 0 && (
                            <div className="text-right">
                                <SimpleBtn variant="success" style={{ width: 'fit-content' }} onClick={toggleShowHandler}>
                                    Add new address
                                </SimpleBtn>
                            </div>

                        )
                    }

                </div>

                <div className="shipping_details p-3">
                    {
                        isLoading && (
                            <LoadingSpinner text="Loading Billing Info..." />
                        )
                    }
                    {
                        defaultBillingAddress !== null && defaultBillingAddress.length > 0 && (
                            <>
                                <div className="d-flex justify-content-between">
                                    <h6 className="customer_name text-capitalize"> 
                                        <i className="fas fa-map-marker-alt shipping_info_fontAwesome"></i>
                                        <span>
                                            {userData && userData.first_name + " "}
                                            {userData && ((userData.last_name !== null && userData.last_name !== 'null') ? userData.last_name : '')}
                                        </span>
                                    </h6>
                                    <p className="customer_info_edit" onClick={() => editHandler(defaultBillingAddress[0].id, defaultBillingAddress[0].type)}>
                                        <i className="fas fa-pencil-alt"></i>
                                        <span className="ml-1">
                                            {' '}
                                            Edit
                                        </span>
                                    </p>
                                </div>
                                <div className="d-flex align-items-start mt-2">
                                    <span className="delivery_area">{defaultBillingAddress[0].location}</span>
                                    <div className="shipping_address checkout_default_billing_address ml-1">
                                        <>
                                            {defaultBillingAddress[0].area}, {defaultBillingAddress[0].street1}, {defaultBillingAddress[0].city},
                                            {defaultBillingAddress[0].country}
                                        </>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        !isLoading && defaultBillingAddress !== null && defaultBillingAddress.length === 0 && (
                            <WarningMessage text="Please add your billing information..." />
                        )
                    }

                    <div className="delivery_collection">
                        <p className="delivery_collecting_message">{content.delivery_collecting_message}</p>
                        <div className="d-flex justify-content-between">
                            <p className="collecting_suggesting">14 Suggested collection points nearby</p>
                            <p>
                                <i className="fas fa-question-circle collection_suggesting_fontAwesome"></i>
                            </p>
                        </div>
                    </div>

                    {defaultBillingAddress !== null && defaultBillingAddress.length > 0 &&
                        <div className="mt-4">
                            <div className="d-flex justify-content-between">
                                <p className="shipping_billing_details_info">
                                    <i className="fas fa-home"></i>
                                    <span className="bill_to_same_address">Bill to the same address</span>
                                </p>
                                <p className="customer_info_edit" onClick={() => editHandler(defaultBillingAddress[0].id, defaultBillingAddress[0].type)} >
                                    <i className="fas fa-pencil-alt"></i>
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="shipping_billing_details_info">
                                    <i className="fas fa-mobile-alt"></i>
                                    {' '}
                                    <span> {userData && userData.phone_no} </span>
                                </p>
                                <p className="customer_info_edit" onClick={() => editHandler(defaultBillingAddress[0].id, defaultBillingAddress[0].type)} >
                                <i className="fas fa-pencil-alt"></i>
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="shipping_billing_details_info">
                                <i className="fas fa-envelope-open"></i>
                                {' '}
                                <span>{userData && userData.email}</span>
                                </p>
                                <p className="customer_info_edit" onClick={() => editHandler(defaultBillingAddress[0].id, defaultBillingAddress[0].type)}>
                                <i className="fas fa-pencil-alt"></i>
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <SimpleModal
                size="xl"
                show={show}
                handleClose={toggleShowHandler}
            >
                <AddressUpdate type="billing_address" closeModal={toggleShowHandler} />
            </SimpleModal>
        </>
    );
};

export default ShippingInfo;