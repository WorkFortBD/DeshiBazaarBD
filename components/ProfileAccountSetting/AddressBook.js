import React, { useState } from 'react'
import DeliveryInfo from '../Delivery/DeliveryInfo';
import LoadingSpinner from '../master/loading/LoadingSpinner';
import SimpleModal from '../master/modal/SimpleModal';
import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
import Translate from '../translation/Translate';
import SingleAddress from './SingleAddress';

function AddressBook({shippingAddress, isLoading}) {
    const [show, setShow] = useState(false);

    const toggleShowHandler = () => {
        setShow(preState => !preState);
    }

    if(!isLoading) {
        return (
            <>
                <div className="profile_account shadow-sm bg-white mb-4" id="address-book">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h6><Translate>Address Book</Translate></h6>
                        <SimpleBtn variant="success" style={{ width: 'fit-content' }} onClick={toggleShowHandler}>
                            <Translate>Add New Address</Translate>
                        </SimpleBtn>
                    </div>
                    <div className="address-list">
                        <div>

                            {/* {
                                !isLoading && billingAddress && billingAddress.length === 0 && shippingAddress && shippingAddress.length === 0 && (
                                    <div className="mt-2">
                                        <WarningMessage text="Address not found..." />
                                    </div>
                                )
                            } */}
                            {
                                shippingAddress && shippingAddress.map((item, i) => {
                                    return (
                                        <SingleAddress {...item} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <SimpleModal
                    size        = "xl"
                    show        = {show}
                    handleClose = {toggleShowHandler}
                >
                    <DeliveryInfo fromAddressBook={true} closeModal={toggleShowHandler} />
                </SimpleModal>
            </>
        )
    } else {
        return (
            <div className="d-flex justify-content-center">
                <LoadingSpinner text="Loading Address...." />
            </div>
        )
    }
}

export default AddressBook
