import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, handleChangeUserProfileInputData, handleUpdateUserData } from './_redux/Action/ProfileAccountSettingAction';
import ErrorMessage from './../master/message/ErrorMessage'
import Translate from '../translation/Translate';
import { Spinner } from 'react-bootstrap';

const PersonalInfoForm = () => {
    const dispatch = useDispatch();
    const userInputData = useSelector((state) => state.userProfile.userInputData);
    const { userData } = useSelector(state => state.user)
    const { register, handleSubmit, errors, setValue, watch } = useForm();
    const isSubmitting = useSelector((state) => state.userProfile.isSubmitting);

    useEffect(() => {
        dispatch(getUserData(userData))
    }, []);

    //handle change input 
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeUserProfileInputData(name, value))
    }


    const handleUpdatedProfile = () => {
        dispatch(handleUpdateUserData(userInputData, userData))
    }

    return (
        <div className="profile_account shadow-sm bg-white" id="personal-info-edit">
            <h6 className="border-bottom pb-2"><Translate>Personal Information</Translate></h6>

            <form
                onSubmit={handleSubmit(handleUpdatedProfile)}
                method="post"
                autoComplete="off"
                encType="multipart/form-data"
                autoSave="off"
            >
                <div className="row">

                    <div className="col-md-6">
                        <div className="custome_form_group">
                            <label htmlFor="firstName">First Name</label>
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
                            {
                                errors.first_name && errors.first_name.type === 'required' && (
                                    <ErrorMessage message="Please give your first name !" />
                                )
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="custome_form_group">
                            <label htmlFor="lastName">Last Name</label>
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
                    <div className="col-md-6">
                        <div className="custome_form_group">
                            <label htmlFor="email">Email</label>
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
                                    <ErrorMessage message="Please give a valid email address !" />
                                )
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="custome_form_group">
                            <label htmlFor="phone">Phone</label>
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
                            {
                                errors.phone_no && errors.phone_no.type === 'required' && (
                                    <ErrorMessage message="Please give your phone number !" />
                                )
                            }
                        </div>
                    </div>

                </div>
                <div className="row justify-content-end">
                    {
                        !isSubmitting && (
                            <button type="submit" className="btn btn-success mr-3">Save</button>
                        )
                    }
                    {
                        isSubmitting && (
                            <button type="submit" disabled={true} className="btn btn-success mr-3 d-flex align-items-center">
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                <span className="ml-2">Saving...</span>
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;