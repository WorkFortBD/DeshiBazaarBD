import * as Types from "../Types/Types";
import moment from "moment";
const initialState = {
    isLoading: false,
    isSubmitting: false,
    wishList: [],
};

const WishlistReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Types.WISHLIST_ADDED:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
            }
        case Types.REMOVE_FROM_WISHLIST:
            return {
                ...state,
                isSubmitting: action.payload.isLoading,
            }
        case Types.GET_WISHLIST_DATA:
            return {
                ...state,
                wishList: action.payload.wishList,
                isLoading: action.payload.isLoading
            }
        default:
            break;
    }
    return newState;
};

export default WishlistReducer;
