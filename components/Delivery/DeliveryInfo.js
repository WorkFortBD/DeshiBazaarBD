import React, { useEffect, useState } from 'react';
import { addAddress, getLocationData } from '../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from "yup";
import { useFormik } from "formik";
import CustomSelect from '../master/custom-select/CustomSelect';
import { handleShippingCost } from '../orders/_redux/action/OrderAction';


const DeliveryInfo = ({fromAddressBook, closeModal = null}) => {
    const dispatch                                       = useDispatch();
    const [isLoadingAddress, setIsLoadingAddress]        = useState(false);
    const { userData }                                   = useSelector(state => state.UserDataReducer);
    const { divisionList, cityList,areaList }            = useSelector((state) => state.ProfileAccountSettingReducer);

    useEffect(() => {
        if (!divisionList.length) {
            dispatch(getLocationData('divisions'));
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            name           : "",
            phone_no       : "",
            street_address : "",
            user_id       : userData.id,
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('e.g John doe'),
            phone_no:  yup.string().required('ex: 01712345678').test('phone_no', "e.g 01712345678", (value) => {
                const phoneRegex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

                let isValidPhone = phoneRegex.test(value);

                if(!isValidPhone) return false
                return true
            }),
            street_address: yup.string().required('e.g House No 73, Road 14, Block F, Bashundhara R/A, Dhaka - 1216'),
        }),
        onSubmit: values => {
            const cloneVals = {...values};
            setIsLoadingAddress(true);

            if(cloneVals.same_address) {
                delete cloneVals.same_address;
                dispatch(addAddress(cloneVals, 'new_address', () => {}, userData.id));

                cloneVals.type = cloneVals.type === "shipping_address" ? "billing_address" : "shipping_address";

                dispatch(addAddress(cloneVals, 'new_address', () => {}, userData.id, true));
            } else {
                delete cloneVals.same_address;
                dispatch(addAddress(cloneVals, 'new_address', () => {}, userData.id));
            }

            closeModal?.();
            // Dispatch to calculate shipping cost again.
            dispatch(handleShippingCost([]));
        }
    })

    const options = [{ label: 'Shipping address', value: 'shipping_address' }, { label: 'Billing address', value: 'billing_address' }];

    return (
        <div className="card py-3 shadow-sm">
            <h4 className="delivery_info_title px-3">Delivery Information</h4>
            <>
                {/* <h6 className="address_book_updated_title px-3">
                    Shipping address
                </h6> */}
                <form onSubmit={formik.handleSubmit} className="mt-3">
                    <div className="row">

                        <div className="col-lg-6 ">
                            <div className="custome_form_group pb-3 mb-1 position-relative">
                                <label className="form-label required" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="custom_form_input"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {
                                    formik.errors.name && formik.touched.name && (
                                        <ValidationError>
                                            {formik.errors.name}
                                        </ValidationError>
                                    )
                                }
                            </div>
                        </div>

                        <div className="col-lg-6 ">
                            <div className="custome_form_group pb-3 mb-1 position-relative">
                                <label className="form-label required" htmlFor="phone_no">Phone No</label>
                                <input
                                    id="phone_no"
                                    name="phone_no"
                                    type="text"
                                    className="custom_form_input"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone_no}
                                />
                                {
                                    formik.errors.phone_no && formik.touched.phone_no && (
                                        <ValidationError>
                                            {formik.errors.phone_no}
                                        </ValidationError>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="custome_form_group pb-3 mb-1 position-relative">
                                <label className="form-label required" htmlFor="street_address">Street Address</label>
                                <textarea style={{resize: 'none'}} name="street_address" id="street_address" cols="30" rows="3" className="custom_form_input" onChange={formik.handleChange}
                                onBlur={formik.handleBlur} value={formik.values.street_address}>
                                </textarea>
                                <small className='street_address_warning'>
                                    e.g House No 73, Road 14, Block F, Bashundhara R/A, Dhaka - 1216
                                </small>
                            </div>
                        </div>

                        <div className="col-lg-12 text-right">
                            <button type="submit" disabled={isLoadingAddress ? true : false} className="btn btn-success checkout_address_save_btn">
                                Save
                                {
                                    isLoadingAddress && (
                                        <>
                                            {' '}
                                            <div className="spinner-border" style={{color: '#fff', fontSize: '10px', width: '20px', height: '20px'}} role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </>
        </div>
    )
}

function ValidationError(props) {
    return <small className="err-mss color-main" >{props.children}</small>;
}

export default DeliveryInfo;