import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn, getSession } from 'next-auth/client'
import { isSignedIn } from "../../../_redux/store/action/globalAction";
import { useRouter } from 'next/router';
import { getUserDataAction } from "../../_redux/getUserData/Action/UserDataAction";
import { showToast } from "../../master/Helper/ToastHelper";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SimpleBtn from "../../master/SimpleBtn/SimpleBtn";

const LoginComponent = () => {
  const router                             = useRouter();
  const dispatch                           = useDispatch();
  const [showPassword, setShowPassword]    = useState(false);
  const [isLoading, setIsLoading]          = useState(false);

  const initialValues = {
    email: "",
    password: "",
    remember: false
  };

  const loginPost = async (values) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
        email: values.email.trim(),
        password: values.password,
        redirect: false,
    })

    if(res.error) {
      showToast('error', res.error)
    }
    
    if(res) {
      setIsLoading(false);
    }
    
    if(!res.error) {
      const session = await getSession();
      if(session && session.accessToken) {
        localStorage.setItem('access-token', session.accessToken);
        setIsLoading(false);
        dispatch(isSignedIn());
        dispatch(getUserDataAction());
        router.replace('/');
      }
    }
  }

  const onSubmit = (values) => {
    loginPost(values)
  };

  const validationSchema = yup.object().shape({
    email: yup.string()
    .required("Required")
    .test('email&pass', 'Enter a valid phone number or email address', value => {
      if(value === undefined || value === null) return false;

      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const phoneRegex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

      let isValidEmail = emailRegex.test(value.trim());
      let isValidPhone = phoneRegex.test(value.trim());
      
      if(!isValidEmail && !isValidPhone) return false
      return true
    }),
    password: yup.string()
    .min(8, 'Minimum 8 characters required')
    .required('Required')
    .test('password', 'space not allowed', (value) => {
      if(value === undefined || value === null) return false;

      if(/\s/g.test(value)) return false;

      return true;
    })
  });

  return (
    <div className="account_info_body mt-3 mt-md-5">
      <Formik
        initialValues={ initialValues }
        onSubmit={ onSubmit }
        validationSchema={ validationSchema }
        validateOnMount >
      {() => {
        return (
          <Form>
            <div className="row">
              <div className="col-12 px-0 px-lg-5">
                <div className="pb-3 position-relative">
                  <div className="input-box">
                    <label htmlFor="email" className="form-label required">Email / Phone</label>
                    <Field className="form-control" type="text" id="email" name="email" />
                    <ErrorMessage name="email" component={ ValidationError } />
                  </div>
                </div>
              </div>

              <div className="col-12 px-0 px-lg-5">
                <div className="pb-3 position-relative">
                  <label htmlFor="password" className="form-label required">password</label>
                  <div className="account_input_group">
                      <Field className="form-control" type={showPassword ? 'text' : 'password'} id="password" name="password" />
                      <div
                        className="account_input_group_prepend"
                        onClick={() => setShowPassword(!showPassword)} >
                        {showPassword === false ? (
                          <span>
                            <i className="far fa-eye-slash"></i>
                          </span>
                        ) : (
                          <span>
                            <i className="far fa-eye"></i>
                          </span>
                        )}
                      </div>
                  </div>
                  <ErrorMessage name="password" component={ ValidationError } />
                </div>
              </div>

              <div className="col-6 mt-lg-0 mt-3 px-0 px-lg-5">
                  <div className="d-flex align-items-center">
                    <Field type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember" className="form-label pl-2 m-0">Remember me</label>
                  </div>
              </div>

              <div className="col-6 mt-lg-0 mt-3 px-0 px-lg-5">
                <p className="forget_password_link text-right m-0">
                  <Link href="/user/forget-password">
                    <a>Forgot password?</a>
                  </Link>
                </p>
              </div>
              <div className="col-12 justify-content-center px-0 px-lg-5">
                {/* <div className="account_btn_group justify-content-end justify-content-sm-start">
                  <button type="submit" className="btn account_btn mt-2" disabled={isLoading}>
                    Login
                  </button>
                </div> */}
                <div className="mt-3" style={{width: '50%'}}>
                  <SimpleBtn disabled={isLoading} variant="success" type="submit" style={{backgroundColor: 'var(--color-green)'}}>
                    Sign In &nbsp;
                    {
                      isLoading && (
                          <div className="spinner-border" style={{color: '#fff', fontSize: '10px', width: '20px', height: '20px'}} role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                      )
                    }
                  </SimpleBtn>
                </div>
              </div>

            </div>

          </Form>
        );
      } }
      </Formik>
      <div>
        <p className="already_account m-0 pt-3 pt-lg-5">
          Don't have an account?
          <Link href="/register">
            <a> Sign up </a>
          </Link>
        </p>
      </div>
    </div>
  )
};

function ValidationError(props) {
  return <small className="err-mss color-main" >{props.children}</small>;
}


export default LoginComponent;