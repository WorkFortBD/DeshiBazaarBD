import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "../master/message/ErrorMessage";
import SimpleBtn from "../master/SimpleBtn/SimpleBtn";
import { resetPassword } from "./_redux/action/forget-password-action";

export default function App() {
  const { register, errors, handleSubmit, watch } = useForm({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { otp, isLoading, passwordUpdated, email } = useSelector(
    (state) => state.authForgetPassword
  );
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    dispatch(resetPassword(otp, email, data.password));
  };

  useEffect(() => {
    if (passwordUpdated) {
      router.push("/login").then((_) => window.scrollTo(0, 0));
    }
  }, [passwordUpdated]);

  return (
    <>
      <div className="forget-password my-5">
        <div className="container">
          <h4 className="pb-3">Reset password</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="bg-white p-4">
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="forget-password-input" >
                    <div className="mb-3">
                      <label className="d-block" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder="Minimum 8 characters with a number and a letter"
                        ref={register({
                          required: "You must specify a password",
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                      />

                      {errors.password && (
                        <ErrorMessage message={errors.password.message} />
                      )}
                    </div>
                  </div>

                  <div className="forget-password-input" >
                    <div className="mb-3">
                      <label className="d-block" htmlFor="password_repeat">
                        Retype password
                      </label>
                      <input
                        className="form-control"
                        name="password_repeat"
                        type="password"
                        placeholder="Please retype your password"
                        ref={register({
                          validate: (value) =>
                            value === password.current ||
                            "passwords do not match",
                        })}
                      />

                      {errors.password_repeat && (
                        <ErrorMessage
                          errorText={errors.password_repeat.message}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <SimpleBtn
                      type="submit"
                      variant="success"
                      style={{ width: "fit-content" }}
                    >
                      Reset password &#8203;
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
    </>
  );
}
