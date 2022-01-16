import React, { useEffect } from 'react'
import { getProductsBySellerId } from '../CategoryWishProductList/_redux/Action/CategoryAction';
import { useDispatch } from 'react-redux';
import CategoryWishProductList from '../CategoryWishProductList/CategoryWishProductList';
import {useRouter} from 'next/router';

function StoreProductList() {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const storeId = router.query.seller_id;
        dispatch(getProductsBySellerId(storeId));
    }, [])

    return (
        <div className="row container store-product-list">
            <CategoryWishProductList />
        </div>
    )
}

export default StoreProductList
