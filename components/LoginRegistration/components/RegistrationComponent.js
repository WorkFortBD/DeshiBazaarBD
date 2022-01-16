import Link from 'next/link';
import React, { useState } from 'react';
import { customerRegister } from '../_redux/Action/RegisterAction';
import axios from 'axios';

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { showToast } from '../../master/Helper/ToastHelper';
import Timer from '../../master/timer/Timer';
import content from '../../../content.json';

const LOWERCASEREGEX = /(?=.*[a-z])/;
const UPPERCASEREGEX = /(?=.*[A-Z])/;
const NUMERICREGEX   = /(?=.*[0-9])/;

let IS_VALID_OTP     = false;

const RegistrationComponent = () => {
    const [showPassword, setShowPassword]               = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationStep, setValidationStep]           = useState(0);
    const [isLoading, setIsLoading]                     = useState(false);
    const [resendOtp, setResendOtp]                     = useState(false);
    const [stepOneFormData, setStepOneFormData]         = useState(null);
    const [otpExpireTime, setOtpExpireTime]             = useState(0);

    const initialFormVal = {
        first_name            : "",
        last_name             : "",
        phone_no              : "",
        email                 : "",
        password              : "",
        password_confirmation : "",
        otp                   : "",
        offer                 : false,
        policy                : true
    }

    const validationSchema = [
        yup.object().shape({
            first_name: yup.string().required('Required').min(2, "Name should be at least 2 characters").max(40, "Up to 40 characters"),
            last_name: yup.string().required('Required').min(2, "Name should be at least 2 characters").max(40, "Up to 40 characters"),
            phone_no:  yup.string().required('Required').test('phone_no', "Please input a valid phone number", (value) => {
                const phoneRegex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

                let isValidPhone = phoneRegex.test(value);

                if(!isValidPhone) return false
                return true
            }),
            email: yup.string().email('Please Input a valid email'),
            policy: yup.boolean().oneOf([true], "You must accept the terms and condition.")
        }),
        yup.object().shape({
            otp: yup.string()
            .required('Required')
            .min(6, 'Input 6 digit OTP')
            .max(6, 'Input 6 digit OTP')
            .test('otp-code', 'Please input a valid OTP', async (value, context) => {
                if(value && !IS_VALID_OTP && value.length === 6) {
                    try {
                        const otpBody = {
                            otp: context.parent.otp,
                            phone_no: context.parent.phone_no 
                        }

                        const res = await axios.post('auth/check-otp', otpBody);

                        if(res.data.status) {
                            IS_VALID_OTP = true;
                            return Promise.resolve(true);
                        }else {
                            return Promise.resolve(false);
                        }

                    } catch (error) {
                        return Promise.resolve(false);
                    }
                }

                if(value && value.length < 6) {
                    IS_VALID_OTP = false;
                }

                return Promise.resolve(true);
            }),
            password: yup.string()
                .required('Required')
                // .matches(LOWERCASEREGEX, 'At least one lowercase character required')
                // .matches(UPPERCASEREGEX, 'At least one uppercase character required')
                // .matches(NUMERICREGEX, 'At least one numeric value required')
                // .matches(NUMERICREGEX, 'At least one numeric value required')
                .min(8, 'Minimum 8 characters required')
                .test('password', 'space not allowed', (value) => {
                    if(value === undefined || value === null) return false;

                    if(/\s/g.test(value)) return false;

                    return true;
                }),
            password_confirmation: yup.string()
                .oneOf([yup.ref('password'), null], 'Password confirmation does not match password!')
                .required('Required')
        })
    ];

    const resendOtpApi = () => {
        setResendOtp(false);
        axios.post('auth/register', stepOneFormData)
        .then(data => {
            if (data.data.status) {
                showToast('success', 'OTP is sent to your phone number')
                setOtpExpireTime(data.data.data)
            }
        })
        .catch(err => {
            const { response } = err;
            if(!response.data.errors) {
                showToast('success', response.data.message);
                setOtpExpireTime(response.data.data);
                return;
            }

            showToast('error', 'Something went wrong. Please refresh browser')
        })
    }


    const onSubmit = async (values, actions) => {
        setIsLoading(true);

        try {
            if(validationStep === 0) {
                const formData = {
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    phone_no: values.phone_no
                }

                setStepOneFormData(formData)

                const data = await axios.post('auth/register', formData);

                if (data.data.status) {
                    showToast('success', 'OTP is sent to your phone number')
                    setOtpExpireTime(data.data.data)
                    setIsLoading(false);
                    setValidationStep(1);
                    actions.setTouched({});
                    actions.setSubmitting(false);
                }
            }

            if(validationStep === 1) {
                const formData = {
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    phone_no: values.phone_no,
                    otp: values.otp,
                    password: values.password,
                    password_confirmation: values.password_confirmation
                }

                customerRegister(formData)
                    .then(data => {
                        if(data.data.status) {
                            showToast('success', 'Your account created successfully, Please Login.');
                            window.location.replace('/login');
                        };
                    })
                    .catch(_ => {
                        setIsLoading(false);
                        actions.setTouched({});
                        actions.setSubmitting(false);

                        setIsLoading(false);
                    })

            }

        } catch (error) {
            const { response } = error;
            setIsLoading(false);

            if(!response.data.errors) {
                showToast('success', response.data.message);
                setValidationStep(1);
                setOtpExpireTime(response.data.data);
                actions.setTouched({});
                actions.setSubmitting(false);
                return;
            }

            const errors = Object.keys(response.data.errors);

            if(errors.length > 1) {
                showToast('error', "Email and phone number already used.")
            } else {
                showToast('error', `${errors[0] === "email" ? "email" : "Phone number"} is already used.`)
            }
        }
    }

    return (
        <Formik
        initialValues={ initialFormVal }
        onSubmit={ onSubmit }
        validationSchema={ validationSchema[validationStep] }
        // validateOnChange={false}
        validateOnMount >
            {() => {
                return (
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <h5 className="account_title">Register Account</h5>
                                <p className="account_sub_tite">Creating an account has many benefits. Check out faster, keep more than one address, track orders and many more.</p>
                            </div>
                        </div>
                        <div className="account_info_body">
                            <Form autoComplete="off">
                                <div className="row">
                                    {
                                        validationStep === 0 ? (
                                            <>
                                                <div className="col-12 col-md-6">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="first_name" className="form-label required">First Name</label>
                                                        <Field className="form-control form-input" type="text" id="first_name" name="first_name" placeholder="John" />
                                                        <ErrorMessage name="first_name" component={ ValidationError } />
                                                    </div>
                                                </div>


                                                <div className="col-12 col-md-6">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="lastName" className="form-label required">Last Name</label>
                                                        <Field className="form-control form-input" type="text" id="last_name" name="last_name" placeholder="Doe" />
                                                        <ErrorMessage name="last_name" component={ ValidationError } />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="phone_no" className="form-label required">Phone</label>
                                                        <Field className="form-control form-input" type="text" id="phone_no" name="phone_no" placeholder="01234567899" />
                                                        <ErrorMessage name="phone_no" component={ ValidationError } />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="email" className="form-label">Email</label>
                                                        <Field className="form-control form-input" type="text" id="email" name="email" placeholder="e-mail" />
                                                        <ErrorMessage name="email" component={ ValidationError } />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="pb-3 position-relative">
                                                        <div className="d-flex">
                                                            <div className="mr-2" style={{marginTop: '2px'}}>
                                                                <Field type="checkbox" id="offer" name="offer" className="pointer" />
                                                            </div>
                                                            <label className="account_info_label pointer" htmlFor="offer">
                                                                I want to receive exclusive offers and promotions from &nbsp;
                                                                <Link href="/">
                                                                    <a>{content.name}</a>
                                                                </Link>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="pb-3 position-relative">
                                                        <div className="d-flex">
                                                            <div className="mr-2" style={{marginTop: '2px'}}>
                                                                <Field type="checkbox" id="policy" name="policy" className="pointer" />
                                                            </div>
                                                            <div>
                                                                <label className="account_info_label pointer" htmlFor="policy">
                                                                        By clicking Create Account, you acknowledge you have read and agreed to our
                                                                        <Link href="/p/terms-&-condition"><a> Terms of Use </a></Link> and
                                                                        <Link href="/p/privacy-policy"><a> Privacy Policy </a></Link>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="policy" component={ ValidationError } />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="col-8">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="otp" className="form-label required">Otp</label>
                                                        <Field className="form-control form-input" type="text" id="otp" name="otp" placeholder="123456" />
                                                        <ErrorMessage name="otp" component={ ValidationError } />
                                                    </div>
                                                </div>

                                                <div className="col-4">
                                                    <div className="pb-3 text-right">
                                                        <label htmlFor="" style={{opacity: 0}} className="form-label d-block">Resend</label>
                                                        <button type="button" onClick={resendOtpApi} disabled={resendOtp ? false : true} className="btn pointer" style={{backgroundColor: 'var(--color-primary)', color: '#fff'}} >
                                                            Resend
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="my-2">
                                                        <Timer endDate={otpExpireTime} cb={() => setResendOtp(true)} />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="password" className="form-label required m-0">Password</label>
                                                        <small className="mb-1 d-block" style={{fontWeight: '500'}}>Password should have at least one numeric, lowercase and uppercase value</small>
                                                        <div className="account_input_group">
                                                            <Field className="form-control form-input" type={showPassword ? "text" : "password"} id="password" name="password" placeholder="" />
                                                            <div className="account_input_group_prepend" onClick={() => setShowPassword(!showPassword)}>
                                                                {
                                                                    showPassword === true ? (
                                                                        <span>
                                                                            <i className="far fa-eye"></i>
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            <i className="far fa-eye-slash"></i>
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="password" component={ ValidationError } />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="pb-3 position-relative">
                                                        <label htmlFor="password_confirmation" className="form-label required">Confirm password</label>
                                                        <div className="account_input_group">
                                                            <Field className="form-control form-input" type={showConfirmPassword ? "text" : "password" } id="password_confirmation" name="password_confirmation" placeholder="" />
                                                            <div className="account_input_group_prepend" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                                {
                                                                    showConfirmPassword === true ? (
                                                                        <span>
                                                                            <i className="far fa-eye"></i>
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            <i className="far fa-eye-slash"></i>
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="password_confirmation" component={ ValidationError } />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    <div className="col-md-12">
                                        <div className="account_btn_group">
                                            {
                                                validationStep === 1 && (
                                                    <button onClick={() => setValidationStep(0)} type="button" style={{backgroundColor: 'var(--color-border-dark)'}} disabled={validationStep === 0 ? true : false} className="btn account_btn mt-2 mr-2">
                                                        Back
                                                    </button>
                                                )
                                            }
                                            <button type="submit" disabled={isLoading ? true : false} className="btn account_btn mt-2">
                                                {
                                                    validationStep === 0 ? 'Continue ' : 'Sign Up'
                                                }
                                                {
                                                    isLoading && (
                                                        <div className="spinner-border" style={{color: '#fff', fontSize: '10px', width: '20px', height: '20px'}} role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </Form>
                            <div>
                                <p className="already_account m-0 pt-3 pt-lg-5">
                                    Already have an account ?
                                    <Link href="/login">
                                        <a> Sign In </a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }}
      </Formik>
    );
};

function ValidationError(props) {
    return <small className="err-mss color-main" >{props.children}</small>;
}

export default RegistrationComponent;