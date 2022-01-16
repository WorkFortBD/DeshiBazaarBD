import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBillingAddressForInput, handleSetDataIntoInputField, handleChangeBillingAddressInput, handleUpdateBillingAddress } from './_redux/Action/ProfileUpdateAction';
import ErrorMessage from '../master/message/ErrorMessage'
import { RHFInput } from 'react-hook-form-input';
import Select from 'react-select';
import { Spinner } from 'react-bootstrap'
import { getLocationData } from '../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction';
const BillingAddressUpdate = () => {
    const dispatch = useDispatch();
    const countryList = useSelector((state) => state.userProfile.countryList);
    const cityList = useSelector((state) => state.userProfile.cityList);
    const areaList = useSelector((state) => state.userProfile.areaList);
    const isSubmitting = useSelector((state) => state.userProfile.isSubmitting);
    const billingAddressInput = useSelector((state) => state.userAddress.billingAddressInput);
    const {userData} = useSelector(state => state.user)
    const { register, handleSubmit, errors, setValue } = useForm();

    //handle change input 
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeBillingAddressInput(name, value))
    }

    useEffect(() => {
        dispatch(handleSetDataIntoInputField(userData))
        dispatch(getLocationData('countries'))
        dispatch(getBillingAddressForInput('billing_address', userData.id))
    }, [])

    const StoreBillingAddress = () => {
        dispatch(handleUpdateBillingAddress(billingAddressInput, userData.id))
    }

    return (
        <div className="profile_account shadow-sm bg-white">
            <h6>Billing Address</h6>

            <form
                onSubmit={handleSubmit(StoreBillingAddress)}
                method="post"
                autoComplete="off"
                encType="multipart/form-data"
                autoSave="off"
            >
                <div className="row">

                    <div className="col-md-4">
                        <div className="custome_form_group row">
                            <label className="col-sm-3" for="firstName">Country</label>
                            <div className="col-sm-9">
                                <RHFInput
                                    as={<Select options={countryList} />}
                                    placeholder="Select country"
                                    rules={{ required: true }}
                                    name="country_id"
                                    register={register}
                                    value={billingAddressInput.selectedCountry}
                                    onChange={(option) => {
                                        handleChangeTextInput("country", option.label);
                                        handleChangeTextInput("country_id", option.value);
                                        dispatch(getLocationData('cities', 'division', option.value));
                                    }}
                                    setValue={setValue}
                                />
                                {
                                    errors.country_id && errors.country_id.type === 'required' && (
                                        <ErrorMessage message="Country can't be blank!" />
                                    )
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custome_form_group row">
                            <label className="col-sm-3" for="firstName">City</label>
                            <div className="col-sm-9">
                                <RHFInput
                                    as={<Select options={cityList} />}
                                    placeholder="Select city"
                                    rules={{ required: true }}
                                    name="city_id"
                                    register={register}
                                    value={billingAddressInput.selectedCity}
                                    onChange={(option) => {
                                        handleChangeTextInput("city", option.label);
                                        handleChangeTextInput("city_id", option.value);
                                        dispatch(getLocationData('areas', 'city', option.value));
                                    }}
                                    setValue={setValue}
                                />
                                {
                                    errors.city_id && errors.city_id.type === 'required' && (
                                        <ErrorMessage message="City can't be blank!" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custome_form_group row">
                            <label className="col-sm-3" for="firstName">Area</label>
                            <div className="col-sm-9">
                                <RHFInput
                                    as={<Select options={areaList} />}
                                    placeholder="Select area"
                                    rules={{ required: true }}
                                    name="area_id"
                                    register={register}
                                    value={billingAddressInput.selectedArea}
                                    onChange={(option) => {
                                        handleChangeTextInput("area", option.label);
                                        handleChangeTextInput("area_id", option.value);
                                    }}
                                    setValue={setValue}
                                />
                                {
                                    errors.area_id && errors.area_id.type === 'required' && (
                                        <ErrorMessage message="Area can't be blank!" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custome_form_group row">
                            <label className="col-sm-3" for="firstName">Street-1</label>
                            <div className="col-sm-9">
                                <textarea
                                    cols="30"
                                    rows="2"
                                    className="custom_form_input"
                                    placeholder="Street-1"
                                    name="street1"
                                    value={billingAddressInput.street1}
                                    onChange={(e) => handleChangeTextInput('street1', e.target.value)}
                                    ref={register({
                                        required: true,
                                        maxLength: 100,
                                    })}
                                >
                                </textarea>
                                {
                                    errors.street1 && errors.street1.type === 'required' && (
                                        <ErrorMessage message="Street-1 can't be blank!" />
                                    )
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custome_form_group row">
                            <label className="col-sm-3" for="firstName">Street-2</label>
                            <div className="col-sm-9">
                                <textarea
                                    cols="30"
                                    rows="2"
                                    className="custom_form_input"
                                    placeholder="Street-2"
                                    name="street2"
                                    value={billingAddressInput.street2}
                                    onChange={(e) => handleChangeTextInput('street2', e.target.value)}
                                    ref={register({
                                        required: true,
                                        maxLength: 100,
                                    })}
                                >
                                </textarea>
                                {
                                    errors.street2 && errors.street2.type === 'required' && (
                                        <ErrorMessage message="Street-2 can't be blank!" />
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row justify-content-end">
                    {
                        !isSubmitting && (
                            <button type="submit" className="btn btn-primary mr-3">submit</button>
                        )
                    }
                    {
                        isSubmitting && (
                            <button type="submit" disabled={true} className="btn btn-primary mr-3 d-flex align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                <span className="ml-2">submitting...</span>
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default BillingAddressUpdate;