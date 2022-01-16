import * as Types from "./../Type/Types";

const initialState = {
    isLoading             : false,
    isSubmitting          : false,
    bestSellerList        : [],
    shippingAddress       : [],
    billingAddress        : [],
    defaultShippingAddress: [],
    defaultBillingAddress : [],
    userInputData         : {
        first_name        : "",
        surname           : "",
        last_name         : "",
        email             : "",
        username          : "",
        phone_no          : "",
        password          : '123456',
        language          : "en",
        avatar            : "",
        banner            : "",
        address           : "",
        id                : null,
        is_default        : true,
    },
    billingAddressInput : {
        type          : "billing_address",
        user_id       : null,
        name          : "",
        phone_no      : "",
        transaction_id: "",
        country_id    : 19, //integer
        country       : "Bangladesh (বাংলাদেশ)",
        city_id       : "",  //integer
        city          : "",
        area_id       : "",   //integer
        area          : "",
        street1       : "",
        street2       : "",
        is_default    : true,
        location      : ""
    },
    selectedAddress: {
        type          : "",
        user_id       : "",
        name          : "",
        phone_no      : "",
        transaction_id: "",
        country_id    : 19, //integer
        country       : "Bangladesh (বাংলাদেশ)",
        division      : "",
        division_id   : "",
        city_id       : "",  //integer
        city          : "",
        area_id       : "",   //integer
        area          : "",
        street1       : "",
        street2       : "",
        is_default    : true,
        location      : ""
    },
    shippingAddressInput: {
        type          : "shipping_address",
        user_id       : "",
        name          : "",
        phone_no      : "",
        transaction_id: "",
        country_id    : 19, //integer
        country       : "Bangladesh (বাংলাদেশ)",
        division      : "",
        division_id   : "",
        city_id       : "",  //integer
        city          : "",
        area_id       : "",   //integer
        area          : "",
        street1       : "",
        street2       : "",
        is_default    : 1,
        location      : ""
    },
    countryList         : [],
    divisionList        : [],
    cityList            : [],
    areaList            : [],
    userDetails         : null,
}

function ProfileAccountSettingReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SHIPPING_ADDRESS:
            return {
                ...state,
                isLoading      : action.payload.isLoading,
                shippingAddress: action.payload.data,
            }
        case Types.GET_BILLING_ADDRESS:
            return {
                ...state,
                isLoading     : action.payload.isLoading,
                billingAddress: action.payload.data,
            }
        case Types.GET_DEFAULT_SHIPPING_ADDRESS:
            return {
                ...state,
                isLoading      : action.payload.isLoading,
                defaultShippingAddress: action.payload.data,
                // shippingAddressInput: initialState.shippingAddressInput,
            }
        case Types.GET_DEFAULT_BILLING_ADDRESS:
            return {
                ...state,
                isLoading     : action.payload.isLoading,
                defaultBillingAddress: action.payload.data,
                // selectedAddress: action.payload.data[0],
            }
        case Types.DELETE_ADDRESS:
            return {
                ...state,
                isLoading : action.payload.isLoading,
            }
        case Types.GET_USER_UPDATED_DATA:
            let getUserInput = { ...state.userInputData };
            getUserInput = action.payload;
            return {
                ...state,
                userInputData: action.payload,
                userDetails  : action.payload,
            }
        case Types.CHANGE_ADDRESS_INPUT:
            const selectedAddressClone = { ...state.selectedAddress };
            selectedAddressClone[action.payload.name] = action.payload.value;

            return {
                ...state,
                selectedAddress: selectedAddressClone
            };
        case Types.CHANGE_USER_PROFILE_INPUT_DATA:
            const userProfileInput = { ...state.userInputData };
            userProfileInput[action.payload.name] = action.payload.value;

            return {
                ...state,
                userInputData: userProfileInput
            };
        case Types.UPDATED_USER_DATA:
            return {
                ...state,
                isSubmitting: action.payload.isLoading
                // userInputData: userProfileInput
            };
        case Types.CHANGE_SHIPPING_ADDRESS_INPUT:
            const shippingAddressInput = { ...state.shippingAddressInput };
            shippingAddressInput[action.payload.name] = action.payload.value
            return {
                ...state,
                shippingAddressInput
            };
        case Types.GET_COUNTRIES_LIST:
            return {
                ...state,
                countryList: getCountries(action.payload),
            };
        case Types.GET_DIVISIONS_LIST:
            return {
                ...state,
                divisionList: action.payload,
            };
        case Types.GET_CITIES_LIST:
            return {
                ...state,
                cityList: action.payload,
            };
        case Types.GET_AREA_LIST:
            return {
                ...state,
                areaList: action.payload,
            };
        case Types.STORE_SHIPPING_ADDRESS:
            if (action.payload.status == true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    billingAddressInput: initialState.billingAddressInput

                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }
        case Types.STORE_BILLING_ADDRESS:
            if (action.payload.status == true) {
                return {
                    ...state,
                    isSubmitting       : action.payload.isLoading,
                    billingAddressInput: initialState.billingAddressInput,
                    selectedAddress: initialState.selectedAddress

                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

            case Types.EMPTY_DISPATCH: 
            return{
                ...state,
                selectedAddress: initialState.selectedAddress
            }

            case Types.GET_SINGLE_ADDRESS:
                let cloneAddress;
                if(action.payload.type === "billing_address") {
                    cloneAddress = state.billingAddress.filter(item => item.id === action.payload.id);
                } else {
                    cloneAddress = state.shippingAddress.filter(item => item.id === action.payload.id);
                }

                let cloneSelectedAddress;

                if (cloneAddress.length > 0) {
                     cloneSelectedAddress = {
                        ...state.selectedAddress,
                        id                 : +cloneAddress[0].id,
                        is_default         : +cloneAddress[0].is_default,
                        type               : action.payload.type,
                        user_id            : state.userInputData.id && state.userInputData.id,
                        name               : cloneAddress[0].name,
                        phone_no           : cloneAddress[0].phone_no,
                        is_default_selected: +cloneAddress[0].is_default === 1 ? {label : "Yes",  value: +cloneAddress[0].is_default}: {label: "No", value: +cloneAddress[0].is_default},
                        selectedCountry    : { label : cloneAddress[0].country,  value: +cloneAddress[0].country_id },
                        selectedDivision    : { label : cloneAddress[0].division,  value: +cloneAddress[0].division_id },
                        selectedCity       : { label : cloneAddress[0].city,     value: +cloneAddress[0].city_id },
                        selectedArea       : { label : cloneAddress[0].area,     value: +cloneAddress[0].area_id },
                        country_id         : +cloneAddress[0].country_id,
                        country            : cloneAddress[0].country,
                        city_id            : +cloneAddress[0].city_id,
                        city               : cloneAddress[0].city,
                        area_id            : +cloneAddress[0].area_id,
                        area               : cloneAddress[0].area,
                        street1            : cloneAddress[0].street1,
                        street2            : cloneAddress[0].street2,
                        location           : cloneAddress[0].location
                    }
                }

                return {
                    ...state,
                    selectedAddress: cloneSelectedAddress
                }
            case Types.GET_SINGLE_SHIPPING_ADDRESS:
                if (action.payload.status === true) {
                    return {
                        ...state,
                        shippingAddressInput: action.payload.singleShippingAddressObject,
                    }
                }else{
                    return {
                        ...state,
                        shippingAddressInput: initialState.shippingAddressInput
                    }
                }

            case Types.RESET_PROFILE_ACCOUNT_CITY_AREA:
                return {
                    ...state,
                    cityList: [],
                    areaList: []
                }

        default:
            break;
    }
    return state;
}

// cargo list
const getCountries = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.id,
                label: item.name,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default ProfileAccountSettingReducer;