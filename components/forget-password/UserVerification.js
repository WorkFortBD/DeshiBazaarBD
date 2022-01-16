import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "../master/message/ErrorMessage";
import SimpleBtn from "../master/SimpleBtn/SimpleBtn";
import { validateOtp } from "./_redux/action/forget-password-action";

function UserVerification() {
  const { email, isLoading, isOtpVerified } = useSelector(
    (state) => state.authForgetPassword
  );
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  if (isOtpVerified) {
    router.push("/user/reset-password").then((_) => window.scrollTo(0, 0));
  }

  const onSubmit = (data) => {
    dispatch(validateOtp(data.otp));
  };

  return (
    <div className="forget-password my-5">
      <div className="container">
        <h4 className="pb-3">User verification</h4>
        <div className="row">
          <div className="col-md-12">
            <div className="bg-white p-4">
              <p>Please check your email or phone number for OTP</p>

              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="forget-password-input">
                  <div className="mb-3">
                    <input
                      disabled={true}
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      ref={register({
                        required: true,
                        maxLength: 50,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <ErrorMessage message="Valid phone number or email is required" />
                    )}
                  </div>
                </div>
                <div className="forget-password-input">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP Code"
                      name="otp"
                      ref={register({
                        required: "one time passcode (OTP) required",
                        maxLength: {
                          value: 6,
                          message: "6 digits OTP required",
                        },
                        minLength: {
                          value: 6,
                          message: "6 digits OTP required",
                        },
                      })}
                    />
                    {errors.otp && (
                      <ErrorMessage message={errors.otp.message} />
                    )}
                  </div>
                </div>
                <div>
                  <SimpleBtn
                    type="submit"
                    variant="success"
                    style={{ width: "fit-content" }}
                  >
                    Verify code &#8203;
                    {isLoading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                  </SimpleBtn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserVerification;
