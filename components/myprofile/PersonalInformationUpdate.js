import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, handleChangeUserInput, handleUpdateUserData } from '../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction';
import ErrorMessage from '../master/message/ErrorMessage';

const PersonalInformationUpdate = () => {
    const dispatch = useDispatch();
    const { userInputData, isSubmitting } = useSelector((state) => state.userProfile);
    const { userData } = useSelector(state => state.user)
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        dispatch(getUserData(userData))
    }, [])

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeUserInput(name, value))
    }

    const handleUpdatedProfile = () => {
        dispatch(handleUpdateUserData(userInputData, userData))
    }

    return (
        <div className="">
            <h6>Personal Information</h6> <hr />

            <form
                onSubmit={handleSubmit(handleUpdatedProfile)}
                method="post"
                autoComplete="off"
                encType="multipart/form-data"
                autoSave="off"
            >
                <div className="row">

                    <div className="col-md-6">
                        <div className="custome_form_group row">
                            <label className="col-sm-4" for="firstName">First Name</label>
                            <div className="col-sm-8">
                                <input type="text"
                                    className="custom_form_input"
                                    placeholder=""
                                    name="first_name"
                                    value={userInputData.first_name}
                                    onChange={(e) => handleChangeTextInput('first_name', e.target.value)}
                                    ref={register({
                                        required: true,
                                        maxLength: 100,
                                    })}
                                />
                            </div>
                            {
                                errors.first_name && errors.first_name.type === 'required' && (
                                    <ErrorMessage message="First name can't be blank!" />
                                )
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="custome_form_group row">
                            <label className="col-sm-4" for="firstName">Last Name</label>
                            <div className="col-sm-8">
                                <input type="text"
                                    className="custom_form_input"
                                    placeholder=""
                                    name="last_name"
                                    value={userInputData.last_name}
                                    onChange={(e) => handleChangeTextInput('last_name', e.target.value)}
                                    ref={register({
                                        required: false,
                                        maxLength: 100,
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="custome_form_group row">
                            <label className="col-sm-4" for="firstName">Email</label>
                            <div className="col-sm-8">
                                <input type="text"
                                    className="custom_form_input"
                                    placeholder=""
                                    name="email"
                                    value={userInputData.email}
                                    onChange={(e) => handleChangeTextInput('email', e.target.value)}
                                    ref={register({
                                        required: true,
                                        maxLength: 100,
                                    })}
                                />
                                {
                                    errors.email && errors.email.type === 'required' && (
                                        <ErrorMessage message="Email can't be blank!" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="custome_form_group row">
                            <label className="col-sm-4" for="firstName">Phone</label>
                            <div className="col-sm-8">
                                <input type="text"
                                    className="custom_form_input"
                                    placeholder=""
                                    name="phone_no"
                                    value={userInputData.phone_no}
                                    onChange={(e) => handleChangeTextInput('phone_no', e.target.value)}
                                    ref={register({
                                        required: true,
                                        maxLength: 100,
                                    })}
                                />
                            </div>
                            {
                                errors.phone_no && errors.phone_no.type === 'required' && (
                                    <ErrorMessage message="Phone number can't be blank!" />
                                )
                            }
                        </div>
                    </div>

                </div>
                {
                    isSubmitting && (
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                                <div className="d-flex align-items-center">
                                    <div className="spinner-border mr-3" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <span>Updating...</span>
                                </div>
                            </button>
                        </div>
                    )
                }
                {
                    !isSubmitting && (
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default PersonalInformationUpdate;