import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileSideBar from "./ProfileSideBar";
import { getDefaultAddress } from "../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction";
import LoadingSpinner from '../master/loading/LoadingSpinner';
import SimpleModal from '../master/modal/SimpleModal';
import Link from 'next/link';
import WarningMessage from "../master/warningMessage/WarningMessage";
import Translate from "../translation/Translate";
import DeliveryInfo from "../Delivery/DeliveryInfo";

const ProductProfile = () => {

  const dispatch = useDispatch()
  const { userData, access_token } = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.userProfile.isLoading);
  const defaultShippingAddress = useSelector((state) => state.userProfile.defaultShippingAddress);
  const defaultBillingAddress = useSelector((state) => state.userProfile.defaultBillingAddress);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(userData) {
      dispatch(getDefaultAddress('shipping_address', userData.id))
      dispatch(getDefaultAddress('billing_address', userData.id))
    }
  }, [access_token])

  const toggleShowHandler = () => {
    setShow(preState => !preState);
  }

  return (
    <>
      <div className="wishbanner pb">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5 d-none d-md-block">
              <ProfileSideBar />
            </div>

            {/** user profile data */}
            <div className="col-lg-9 col-md-7">
              <div className="row mt-4">
                <div className="col-lg-6 card default_height shadow-sm p-3 m-1 bg-white rounded">
                  <h6> <Translate>Personal Profile</Translate> <span className="edit_profile_link">
                    <Link href="/account-setting#personal-info-edit">
                      <a className="text-decoration-none">
                        <span className="edit_profile_link ml-2"><Translate>EDIT</Translate></span>
                      </a>
                    </Link>
                  </span></h6>
                  <div className="border-top">
                    <div className="text-center mt-2">

                      <img className="border rounded-circle p-1 mb-2" style={{ height: "100px" }} src="https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png" alt="user image" />
                    </div>
                    <p className="user_name text-capitalize"> {`${userData !== null && userData.first_name} ${(userData !== null && userData.last_name !== null) ? userData.last_name : ''}`}</p>
                    <p>
                      <span className="user_icon">
                        <i className="fas fa-mail-bulk"></i>
                      </span>
                      <span className="user_email">
                        {userData !== null && userData.email}
                      </span>
                    </p>
                    <p>
                      <span className="user_icon">
                        <i className="fas fa-phone"></i>
                      </span>
                      <span className="user_phone">
                        {userData !== null && userData.phone_no}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-lg-5 card m-1 p-3 default_height">
                  <div className="card-title">
                    <h6> <Translate>Address Book</Translate>

                      {
                        ((defaultBillingAddress.length > 0) || (defaultShippingAddress.length > 0)) && (
                          <Link href="/account-setting#address-book">
                            <a className="text-decoration-none">
                              <span className="edit_profile_link ml-2"><Translate>EDIT</Translate></span>
                            </a>
                          </Link>
                        )
                      }

                      {
                        !isLoading && defaultBillingAddress && defaultBillingAddress.length === 0 && defaultShippingAddress.length === 0 && (
                          <span className="edit_profile_link ml-2" onClick={toggleShowHandler}>ADD NEW</span>
                        )
                      }

                    </h6>
                    <div className="border-top">
                      <p className="address_sub_title mt-2">
                        Delivery Info:
                      </p>
                      {
                        isLoading && (
                          <LoadingSpinner text="Loading Shipping Address..." />
                        )
                      }
                      {
                        defaultShippingAddress && defaultShippingAddress.length > 0 && (
                          <>
                            <p>
                              <span className="user_icon">
                                <i className="fas fa-map-marked-alt"></i>
                              </span>
                              <span className="user_address">
                                {defaultShippingAddress[0].area}, {defaultShippingAddress[0].street1}, {defaultShippingAddress[0].city} <br />
                                {defaultShippingAddress[0].country}
                              </span>
                            </p>
                          </>
                        )
                      }
                      {
                        !isLoading && defaultShippingAddress && defaultShippingAddress.length === 0 && (
                          <WarningMessage text="Default shipping address not found" />
                        )
                      }
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <SimpleModal
        size="xl"
        show={show}
        handleClose={toggleShowHandler}
      >
        <DeliveryInfo fromAddressBook={true} closeModal={toggleShowHandler} />
      </SimpleModal>
    </>
  );
};

export default ProductProfile;
