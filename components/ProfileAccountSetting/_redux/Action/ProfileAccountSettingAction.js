import Axios from 'axios';
import * as Types from "../Type/Types";
import { showToast } from '../../../master/Helper/ToastHelper';
import { printErrorMessages } from '../../../../services/ServerErrorMessages';


//get shipping address
export const getShippingAddress = (addressType, id) => (dispatch) => {
    const responseData = {
        data: null,
        status: false,
        isLoading: true
    }
    dispatch({ type: Types.GET_SHIPPING_ADDRESS, payload: responseData });

    Axios.get(`address?user_id=${id}&type=${addressType}`)
        .then((res) => {
            responseData.data = res.data.data[0];
            responseData.isLoading = false;
            responseData.status = true;
            dispatch({ type: Types.GET_SHIPPING_ADDRESS, payload: responseData });
        })
}
//get billing address
export const getBillingAddress = (addressType, id) => (dispatch) => {
    const responseData = {
        data: null,
        status: false,
        isLoading: true
    }
    dispatch({ type: Types.GET_BILLING_ADDRESS, payload: responseData });

    Axios.get(`address?user_id=${id}&type=${addressType}`)
        .then((res) => {
            responseData.data = res.data.data[0];
            responseData.isLoading = false;
            responseData.status = true;
            dispatch({ type: Types.GET_BILLING_ADDRESS, payload: responseData });
        })
}


//get billing address
export const getAddress = (addressType, id) => (dispatch) => {
    const responseData = {
        data: null,
        status: false,
        isLoading: true
    }
    dispatch({ type: Types.GET_BILLING_ADDRESS, payload: responseData });

    Axios.get(`address?user_id=${id}&type=${addressType}`)

    .then((res) => {
        responseData.data = res.data.data;
        responseData.isLoading = false;
        responseData.status = true;
        if (addressType === 'billing_address') {
            dispatch({ type: Types.GET_BILLING_ADDRESS, payload: responseData });
        }

        if (addressType === 'shipping_address') {
            dispatch({ type: Types.GET_SHIPPING_ADDRESS, payload: responseData });
        }
    })
}

// get user data for set input field 
export const getUserData = (userData) => (dispatch) => {
    dispatch({ type: Types.GET_USER_UPDATED_DATA, payload: userData })

}

//handle change user input field 
export const handleChangeUserInput = (name, value) => (dispatch) => {
    const data = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_USER_INPUT_DATA, payload: data })
}

//handle change input field 
export const handleChangeShippingAddressInput = (name, value) => (dispatch) => {
    const addressData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_SHIPPING_ADDRESS_INPUT, payload: addressData })
}

export const resetCityAndArea = () => ({
    type: Types.RESET_PROFILE_ACCOUNT_CITY_AREA
})

/**
 * get countries, divisions, cities, areas
 * 
 * Ex. getLocationData('cities', 'division', 2)
 * This func will return cities list under selected division(which has id 2)
 * 
 * since v1.0.0
 * 
 * @param {string} locationType - location name Ex. 'divisions', 'cities'
 * @param {string} onDependentLocation - EX. 'division', 'city', 'country'
 * @param {string | number} val - location id
 * @returns {void}
 */

export const getLocationData = (locationType, onDependentLocation, val) => async (dispatch) => {
    let url = `${locationType}`;
    if(onDependentLocation) {
        let query = "?" + onDependentLocation + "=" + val;
        url += query;
    }

    try {
        const res = await Axios.get(url)
        let type = "";

        switch (locationType) {
            case 'countries':
                type = Types.GET_COUNTRIES_LIST
                break;

            case 'divisions':
                type = Types.GET_DIVISIONS_LIST
                break;

            case 'cities':
                type = Types.GET_CITIES_LIST
                break;

            case 'areas':
                type = Types.GET_AREA_LIST
                break;
        }

        dispatch({ type: type, payload: res.data.data });
    } catch (error) {
        // console.log('err => ', error)
    }
}

//handle store shipping address
export const handleStoreShippingAddress = (shippingAddressInput, userId) => (dispatch) => {
    const responseData = {
        status: false,
        isLoading: true,
    }
    dispatch({ type: Types.STORE_SHIPPING_ADDRESS, payload: responseData });

    const submittedData = shippingAddressInput;
    submittedData.user_id = userId;
    Axios.post(`address`, shippingAddressInput)
        .then((res) => {
            responseData.status = true;
            responseData.isLoading = false;
            showToast('success', res.data.message);
            dispatch({ type: Types.STORE_SHIPPING_ADDRESS, payload: responseData });
        })

}

//handle store billing address
export const handleStoreBillingAddress = (billingAddressInput, userId) => (dispatch) => {
    const responseData = {
        status: false,
        isLoading: true,
    }

    if (typeof billingAddressInput.type === 'undefined' || billingAddressInput.type === "") {
        showToast('error', 'Please give address type !');
        return;
    }

    dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });

    const submittedData   = billingAddressInput;
    submittedData.user_id = userId;

    Axios.post(`address`, submittedData)
        .then((res) => {
            responseData.status = true;
            responseData.isLoading = false;
            showToast('success', res.data.message);
            dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });
        }).catch(error => {
            const { response } = error;

            if (response.data.errors) {
                const errorMessage = printErrorMessages(response.data.errors);
                showToast('error', errorMessage);
            } else {
                showToast('error', response.data.message);
                return;
            }
        })
}

// get single address
export const getSingleAddress = (id, type) => {
    return {
        type: Types.GET_SINGLE_ADDRESS,
        payload: {
            id: id,
            type: type
        }
    }
}
// get single shipping address
export const getSingleShippingAddress = (type, userId) => (dispatch) => {
    const responseData = {
        defaultSingleShippingAddress: [],
        status: false,
        isLoading: true,
        singleShippingAddressObject: {}
    }
    dispatch({ type: Types.GET_SINGLE_SHIPPING_ADDRESS, payload: responseData });

        Axios.get(`address?user_id=${userId}&type=${type}&is_default=1`)
        .then((res) => {
            if (res.data.status) {
                const data = res.data.data;
                const addressObject = {
                    id: +data[0].id,
                    is_default: +data[0].is_default,
                    type: data[0].type,
                    user_id: data[0].user_id,
                    name: data[0].name,
                    phone_no: data[0].phone_no,
                    is_default_selected: +data[0].is_default === 1 ? { label: "Yes", value: +data[0].is_default } : { label: "No", value: +data[0].is_default },
                    selectedCountry: { label: data[0].country, value: +data[0].country_id },
                    selectedDivision: { label: data[0].division, value: +data[0].division_id },
                    selectedCity: { label: data[0].city, value: +data[0].city_id },
                    selectedArea: { label: data[0].area, value: +data[0].area_id },
                    country_id: +data[0].country_id,
                    country: data[0].country,
                    division_id: +data[0].division_id,
                    division: data[0].division,
                    city_id: +data[0].city_id,
                    city: data[0].city,
                    area_id: +data[0].area_id,
                    area: data[0].area,
                    street1: data[0].street1,
                    street2: data[0].street2,
                    location: data[0].location
                }
                responseData.isLoading = false;
                responseData.status = true;
                responseData.defaultSingleShippingAddress = data;
                responseData.singleShippingAddressObject = addressObject;
                dispatch({ type: Types.GET_SINGLE_SHIPPING_ADDRESS, payload: responseData });
            }

        }).catch((err) => {
            responseData.isLoading = false;
            dispatch({ type: Types.GET_SINGLE_SHIPPING_ADDRESS, payload: responseData });
        })
}

//handle change input field 
export const handleChangeBillingAddressInput = (name, value) => (dispatch) => {
    const addressData = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_ADDRESS_INPUT, payload: addressData })
}


//handle store billing address
export const handleUpdateBillingAddress = (billingAddressInput, userId) => (dispatch) => {
    const responseData = {
        status: false,
        isLoading: true,
    }

    dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });

    Axios.put(`address`, billingAddressInput)
        .then((res) => {
            responseData.status = true;
            responseData.isLoading = false;
            showToast('success', res.data.message);
            dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });
        })
       .catch(error => {
            const { response } = error;

            if (response.data.errors) {
                const errorMessage = printErrorMessages(response.data.errors);
                showToast('error', errorMessage);
            } else {
                showToast('error', response.data.message);
                return;
            }
        })
}

//handle store billing address
/**
 * 
 * @param {Object} addressInput 
 * @param {String} type -> new_address | update_address
 * @param {Function} closeModal 
 * @param {string|number} userId 
 * @param {boolean} isToastDisable 
 * @returns {*}
 */
export const addAddress = (addressInput, type, closeModal, userId, isToastDisable = false, addressId = null) => (dispatch) => {
    const responseData = {
        status: false,
        isLoading: true,
    }

    let method;
    let url;

    if (type === 'new_address') {
        method = 'post';
        url = `address?user_id=${userId}`;
    } else {
        method = 'put';
        url = `address/${addressId}`;
    }

    dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });

    Axios({
        method: method,
        url: url,
        data: addressInput
    })
        .then((res) => {
            responseData.status = true;
            responseData.isLoading = false;

            if(!isToastDisable) {
                showToast('success', res.data.message);
            }

            dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });
            dispatch(getAddress('billing_address', userId));
            dispatch(getAddress('shipping_address', userId));
            dispatch(getDefaultAddress('billing_address'));
            dispatch(getSingleShippingAddress('shipping_address', userId));
            dispatch(getSingleShippingAddress('billing_address', userId));
            closeModal();
        })
        .catch(err => {
            responseData.isLoading = false;
            dispatch({ type: Types.STORE_BILLING_ADDRESS, payload: responseData });
            const { response } = err;
            
            if (response.data.errors) {
                const errorMessage = printErrorMessages(response.data.errors);
                showToast('error', errorMessage);
            } else {
                showToast('error', response.data.message);
                return;
            }

            responseData.isLoading = false;
            closeModal();
        })

        .catch(error => {
            const { response } = error;

            if (response.data.errors) {
                const errorMessage = printErrorMessages(response.data.errors);
                showToast('error', errorMessage);
            } else {
                showToast('error', response.data.message);
                return;
            }
        })

    // Axios.post(`address`, billingAddressInput)
}


//handle store billing address
export const deleteAddress = (id, toggleDeleteModal, userId) => (dispatch) => {
    const responseData = {
        status: false,
        isLoading: true,
    }
    dispatch({ type: Types.DELETE_ADDRESS, payload: responseData });

    Axios.delete(`address/${id}`)
        .then((res) => {
            if (res.data.status) {
                responseData.status = true;
                responseData.isLoading = false;
                showToast('success', res.data.message);
                dispatch(getAddress('billing_address', userId));
                dispatch(getAddress('shipping_address', userId));
                dispatch({ type: Types.DELETE_ADDRESS, payload: responseData });
                toggleDeleteModal();
            }
        })
        .catch(err => {
            responseData.isLoading = false;
            const { response } = err;
            showToast('error', response.data.message);
            dispatch({ type: Types.DELETE_ADDRESS, payload: responseData });
            toggleDeleteModal();
        })

}

export const handleEmptyDispatch = (type) => (dispatch) => {
    const data = {
        type: type
    }
    dispatch({ type: Types.EMPTY_DISPATCH, payload: data })
}


/**
 * get default shipping address
 * since 1.0.0
 * @param addressType billing_address or shipping_address
 * 
 * return default address
 */
export const getDefaultAddress = (addressType, id) => (dispatch) => {
    const responseData = {
        data: [],
        status: false,
        isLoading: true
    }
    dispatch({ type: Types.GET_DEFAULT_SHIPPING_ADDRESS, payload: responseData });
    dispatch({ type: Types.GET_DEFAULT_BILLING_ADDRESS, payload: responseData });

    Axios.get(`address?user_id=${id}&type=${addressType}&is_default=1`)

    .then((res) => {
        if (res.data.status) {
            responseData.data = res.data.data;
            responseData.isLoading = false;
            responseData.status = true;
            if (addressType === 'billing_address') {
                dispatch({ type: Types.GET_DEFAULT_BILLING_ADDRESS, payload: responseData });
            }

            if (addressType === 'shipping_address') {
                dispatch({ type: Types.GET_DEFAULT_SHIPPING_ADDRESS, payload: responseData });
            }
        }

    }).catch((err) => {

    })
}

//handleChange user profile input data
export const handleChangeUserProfileInputData = (name, value) => (dispatch) => {
    const addressData = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_USER_PROFILE_INPUT_DATA, payload: addressData })
}

/**
 * 
 * @param {object} userInputData 
 * @returns handleUpdateUserData
 */

export const handleUpdateUserData = (userInputData, userData) => (dispatch) => {
    const response = {
        isLoading  : true,
        status     : false,
        data       : null
    }
    dispatch({ type: Types.UPDATED_USER_DATA, payload: response });

    Axios.put(`auth/updateUserProfile`, userInputData)
        .then((response) => {
            if (response.data.status) {
                response.isLoading = false;
                showToast('success', response.data.message);
                dispatch({ type: Types.UPDATED_USER_DATA, payload: response });
                dispatch(getUserData(userData));
            }
        }).catch((error) => {
            const responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                if (responseLog.data.message !== "") {
                    showToast('error', responseLog.data.message);
                } else {
                    showToast('error', "Sorry! Something went wrong..");
                }
                dispatch({ type: Types.UPDATED_USER_DATA, payload: response })
            }
        })
}