import React from 'react';
import ShippingAddressUpdate from './ShippingAddressUpdate'
const AddressUpdate = () => {
    return (
        <>
            <h6>Address Book</h6> <hr />
            <div className="address_book_updated">
                <div className="profile_account">
                    <ShippingAddressUpdate />
                </div>
            </div>

        </>
    );
};

export default AddressUpdate;