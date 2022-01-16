import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addOrRemoveWishItem } from './_redux/Action/WishlistAction'

const RemoveWishlist = ({ productId }) => {
    const dispatch = useDispatch();
    const {isSignedIn} = useSelector(state => state.global);
    
    const addOrRemoveWishlist = (productId) => {
        dispatch(addOrRemoveWishItem(productId, true, isSignedIn));
    }

    return (
        <span onClick={() => addOrRemoveWishlist(productId)} className="text-danger pointer" >
            <i className="fas fa-trash"></i>
        </span>
    );
};

export default RemoveWishlist;