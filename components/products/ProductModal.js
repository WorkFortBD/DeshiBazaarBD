import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from '../master/loading/LoadingSpinner';

import SimpleModal from "../master/modal/SimpleModal";
import ProductSingleFull from "./ProductSingleFull";
import { getSingleProductDetailsAction, toggleProductModalAction } from './_redux/Action/ProductAction';

const ProductModal = () => {

    const dispatch = useDispatch();
    const { isModalOpen, product, productSlug } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getSingleProductDetailsAction(productSlug));
    }, [productSlug, isModalOpen]);

    return (
        <SimpleModal
            size="xl"
            show={isModalOpen}
            handleClose={() => dispatch(toggleProductModalAction(''))}
        >
            {
                product ? <ProductSingleFull product={product} modal={true} /> :
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <LoadingSpinner text="Loading Product..." />
                    </div>

            }
        </SimpleModal>
    );
}

export default ProductModal;