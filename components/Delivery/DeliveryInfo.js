import React, { useEffect, useState } from 'react';
import { addAddress, getLocationData } from '../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from "yup";
import { useFormik } from "formik";
import CustomSelect from '../master/custom-select/CustomSelect';
import { handleShippingCost } from '../orders/_redux/action/OrderAction';

const DeliveryInfo = ({closeModal = null, address, isUpdate = false}) => {
    const dispatch                                       = useDispatch();
    const [isLoadingAddress, setIsLoadingAddress]        = useState(false);
    const { userData }                                   = useSelector(state => state.user);
    const { areaList }                                   = useSelector((state) => state.userProfile);

    const {first_name = "", last_name = "", phone_no = ""} = userData;

    useEffect(() => {
        if(areaList.length === 0) {
            dispatch(getLocationData('areas', null, null));
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            name                    : isUpdate ? address.name : first_name + " " + last_name,
            phone_no                : isUpdate ? address.phone_no : phone_no,
            area                    : isUpdate ? address.area + "" : "",
            area_id                 : isUpdate ? address.area_id + "" : "",
            is_default              : isUpdate ? +address.is_default : 1, // integer
            street1                 : isUpdate ? address.street1 : "",
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Required'),
            phone_no:  yup.string().required('Required').test('phone_no', "required ex: 01712345678", (value) => {
                const phoneRegex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

                let isValidPhone = phoneRegex.test(value);

                if(!isValidPhone) return false
                return true
            }),
            area: yup.string().required('Required'),
            street1: yup.string().required('Required'),
        }),
        onSubmit: values => {
            setIsLoadingAddress(true);

            dispatch(addAddress(values, isUpdate ?  'update_address' : 'new_address' , () => {}, userData.id, false, address?.id));
            
            closeModal?.();
            // Dispatch to calculate shipping cost again.
            dispatch(handleShippingCost([]));
        }
    })

    return (
        <div className="card py-3 shadow-sm">
            <h4 className="delivery_info_title px-3">Delivery Information</h4>
            <>
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
                                    placeholder="e.g John Doe"
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
                                    placeholder="e.g 01712345678"
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
                                <label className="form-label required" htmlFor="area">Area</label>
                                    <CustomSelect
                                        id="area"
                                        name="area"
                                        onChange={option => {
                                            formik.setFieldValue('area', option.label);
                                            formik.setFieldValue('area_id', option.value);
                                        }}
                                        value={formik.values.area_id}
                                        options={areaList}
                                    />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="custome_form_group pb-3 mb-1 position-relative">
                                <label className="form-label required" htmlFor="street1">Street Address</label>
                                <textarea style={{resize: 'none'}} name="street1" id="street1" cols="30" rows="3" placeholder="Street address" className="custom_form_input" onChange={formik.handleChange}
                                onBlur={formik.handleBlur} value={formik.values.street1}  id="street_address">
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