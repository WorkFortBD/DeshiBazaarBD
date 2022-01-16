import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSideBar from '../myprofile/ProfileSideBar'
import PersonalInfoForm from './PersonalInfoForm'
import { getAddress, getLocationData } from './_redux/Action/ProfileAccountSettingAction';
// import SimpleModal from '../master/modal/SimpleModal';
// import AddressUpdate from './AddressUpdate';
// import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
// import Translate from '../translation/Translate';
import AddressBook from './AddressBook';

const ProfileAccountSetting = () => {
    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.user)
    const { billingAddress, shippingAddress, userInputData, isLoading } = useSelector(state => state.userProfile);

    useEffect(() => {
        dispatch(getAddress('billing_address', userData.id));
        dispatch(getAddress('shipping_address', userData.id));
        dispatch(getLocationData('countries'))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 d-none d-md-block">
                        <ProfileSideBar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="user_profile_setting_body">
                            <PersonalInfoForm />
                            <AddressBook
                                billingAddress={billingAddress}
                                shippingAddress={shippingAddress}
                                userInputData={userInputData}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileAccountSetting;