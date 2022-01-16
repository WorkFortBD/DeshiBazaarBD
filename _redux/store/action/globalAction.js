// import { getSession } from 'next-auth/client'
import { getUserDataAction } from '../../../components/_redux/getUserData/Action/UserDataAction';
import * as types from "../types/types";

export const isSignedIn = (isSignedIn, userData) => async (dispatch) => {
  // const session = await getSession();
  const userDataFound = localStorage.getItem('user-info');

  if(!userDataFound || !userData) {
    dispatch(getUserDataAction());
  }


  const accessToken = localStorage.getItem('access-token');

  if(accessToken) {
    dispatch({type: types.IS_SIGNED_IN, payload: true})
  } else {
    dispatch({type: types.IS_SIGNED_IN, payload: false})
  }
};

export const toggleFloatingCart = (status = null) => {
  if (typeof status === "undefined" || status === null) {
    return { type: types.TOGGLE_FLOATING_CART };
  }

  return {
    type: types.TOGGLE_FLOATING_CART,
    payload: status,
  };
};

export const toggleModal = () => {
  return {
    type: types.TOGGLE_MODAL,
  };
};

export const toggleBackdrop = () => {
  return {
    type: types.TOGGLE_BACKDROP,
  };
};

export const checkIsMobileDevice = (isMobile) => {
  return {
    type: types.GET_DEVICE_INFO,
    payload: isMobile,
  };
};

export const setWelcomePopup = (isVisible) => {
  return {
    type: types.SET_WELCOME_POPUP,
    payload: isVisible,
  };
};
