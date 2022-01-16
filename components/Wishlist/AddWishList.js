import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addOrRemoveWishItem} from './_redux/Action/WishlistAction'

const AddWishList = ({ productId }) => {
    const { wishListItemsId }         = useSelector(state => state.wishlist);
    const {isSignedIn} = useSelector(state => state.global);
    const dispatch                    = useDispatch();

    const isWishItemFound = wishListItemsId[productId.toString()] == productId.toString();

    const handleAddedWishList = (productId) => {
        dispatch(addOrRemoveWishItem(productId, isWishItemFound, isSignedIn))
    }

    return (
        <span className={`pointer ${isWishItemFound ? 'text-danger' : "text-secondary"}`} onClick={() => handleAddedWishList(productId)}>
            <i className="fas fa-heart"></i>
        </span>
    );
};

export default AddWishList;