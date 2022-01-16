import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSkeleton from '../master/skelleton/LoadingSkelleton';
import { getItemListByUser } from './_redux/action/reviewAction';
import ProductReviewCreate from './ProductReviewCreate';
import PriceCalculation from '../products/partials/PriceCalculation';
import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
import AddWishList from '../Wishlist/AddWishList';
import SimpleModal from '../master/modal/SimpleModal';
import WarningMessage from '../master/warningMessage/WarningMessage';
import Link from 'next/link';

const ProductListForReview = () => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [ReviewItem, setReviewItem] = useState(null);

    const { isLoading, itemList } = useSelector((state) => state.productReview);

    useEffect(() => {
        dispatch(getItemListByUser());
    }, []);

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (item) => {
        setShow(true)
        setReviewItem(item)
    };

    return (
        <>
            {isLoading && (
                <div className="p-3">
                    <LoadingSkeleton
                        alignment="vertical"
                        count={1}
                        width={800}
                        height={120}
                    />
                </div>
            )}
            {
                !isLoading && itemList.length === 0 && (
                    <div className="mt-1 p-2">
                        <WarningMessage text="Sorry! Product list not found....." />
                    </div>
                )
            }
            {
                itemList.length > 0 && (
                    <>
                        {itemList.map((item, index) => (
                            <div className="product_preview_inner_item" key={index + 1}>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="text-center">
                                            <img style={{ maxHeight: "150px" }} src={`${process.env.NEXT_PUBLIC_URL}images/products/${item.featured_image}`} alt={item.item_name} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="">
                                            <Link href={"/products/" + item.item_sku}>
                                                <a className="text-decoration-none">
                                                    <h4 className="product_preview_title pointer">{item.item_name && item.item_name}</h4>
                                                </a>
                                            </Link>
                                            <PriceCalculation item={item} />
                                            <h6>Tax Amount : {item.tax_amount && `৳ ${item.tax_amount}`}</h6>
                                            <h6 style={{ color: "#6c6c6c", fontWeight: 400, fontSize: '1rem' }}>Seller: {item.business_name && item.business_name}</h6>
                                            <SimpleBtn variant="btn-warning" style={{ width: 'fit-content' }} onClick={() => handleShow(item)}>
                                                REVIEW
                                            </SimpleBtn>
                                        </div>
                                        {/* <div className="product_preview_button_section float-bottom">
                                            <AddWishList product={item} />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }

            <SimpleModal
                size="lg"
                show={show}
                handleClose={handleClose}
            >
                <ProductReviewCreate ReviewItem={ReviewItem} handleClose={handleClose} />
            </SimpleModal>
        </>
    );
};

export default ProductListForReview;