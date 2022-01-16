import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ErrorMessage from "../master/message/ErrorMessage";
import SimpleBtn from "../master/SimpleBtn/SimpleBtn";
import { useDispatch, useSelector } from "react-redux";
import { checkIsValidUser } from "./_redux/action/forget-password-action";

function ForgetPassword() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { isLoading, isValidUser } = useSelector(
    (state) => state.authForgetPassword
  );
  const router = useRouter();

  if (isValidUser) {
    router.push("/user/verification").then((_) => window.scrollTo(0, 0));
  }

  const onSubmit = (data) => {
    dispatch(checkIsValidUser(data.email));
  };

  return (
    <div className="forget-password my-5">
      <div className="container">
        <h4 className="pb-3">Forgot your password?</h4>
        <div className="row">
          <div className="col-md-12">
            <div className="bg-white p-4">
              <p className="forget-password-des">
                Enter your phone number or email below and we’ll send you a OTP
                to reset your password
              </p>

              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="col-md-6 px-0">
                  <div className="mb-3">
                    {/* <label htmlFor="lastName" className="form-label">Email</label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter your email or phone number"
                      name="email"
                      ref={register({
                        required: true,
                        maxLength: 50,
                      })}
                    />
                    {errors.email && (
                      <ErrorMessage message="Phone number or email is required" />
                    )}
                  </div>
                  <div>
                    <SimpleBtn
                      type="submit"
                      variant="success"
                      style={{ width: "fit-content" }}
                    >
                      Submit &#8203;
                      {isLoading && (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                    </SimpleBtn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
