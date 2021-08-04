import Axios from 'axios';
import { showToast } from '../../../master/Helper/ToastHelper';
import * as Types from '../types/types';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

/**
 * this function will check if the user email exists on the database or not
 * 
 * @since 1.0.0
 * 
 * @returns void Dispatch event `CHECK_EMAIL_STATUS`
 */

 export const checkIsValidEmail = (email) => async (dispatch) => {
     let response = {
         loading: true,
         email: email,
         isValidEmail: false
     }
     
     const url = `${baseUrl}auth/forget-password/step1`
     const data = {
        username: email
     };

     try {
         dispatch({type: Types.CHECK_EMAIL_STATUS, payload: response});
         
         const res = await Axios.post(url, data);
         
         if(!res.data.errors) {
             response.loading = false;
             response.isValidEmail = res.data.data;
             dispatch({type: Types.CHECK_EMAIL_STATUS, payload: response});
             showToast('success', res.data.message);
        }
    } catch (err) {
        response.loading = false;
        dispatch({type: Types.CHECK_EMAIL_STATUS, payload: response});
        showToast('error', 'Please input a verified email or phone number');
     }
 };

/**
 * validate OTP
 * 
 * @since 1.0.0
 * 
 * @returns void Dispatch event `VALIDATE_OTP`
 */

 export const validateOtp = (otp) => async (dispatch) => {
     let response = {
         loading: false,
         otpVerified: true,
         otp: otp
     }

     dispatch({type: Types.VALIDATE_OTP, payload: response});

    //  try {
    //      // call api to validate OTP
    //  } catch (err) {
    //     // caught unexpected error
    //  }
 };

/**
 * reset new password 
 * 
 * @since 1.0.0
 * 
 * @returns void Dispatch event `POST_RESET_PASSWORD`
 */

 export const resetPassword = (otp, username, password) => async (dispatch) => {
     let response = {
         loading: true,
     }

     const url = `${baseUrl}auth/forget-password/step2`;
     const data = {
        username: username,
        otp: otp,
        password : password,
        password_confirmation: password
     }
     try {
         dispatch({type: Types.POST_RESET_PASSWORD, payload: response});
         const res = await Axios.post(url, data);
         console.log('reset res => ', res)

         response.loading = false;
         dispatch({type: Types.SUCCESSFULLY_RESET_PASSWORD, payload: response});

     } catch (err) {
        response.loading = false;
        dispatch({type: Types.RESET_PASSWORD_FAILED, payload: response});
        showToast('error', 'OTP mismatch');
     }
 };