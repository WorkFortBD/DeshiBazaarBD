import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import TopProductSlickSetting from './TopProductSlickSetting';
import { getTopProductList } from './_redux/Action/ProductTopListAction';
import { toggleProductModalAction } from "../products/_redux/Action/ProductAction";
import { formatCurrency } from '../../services/currency';
import Translate from '../translation/Translate';
// import PriceCalculation from '../products/partials/PriceCalculation';
import LoadingSkelleton from '../master/skelleton/LoadingSkelleton';

const ProductTopList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopProductList());
    }, [])

    const { topProductList,isLoading } = useSelector((state) => state.productsTop);

    return (
        <div>
            {isLoading && (
                <div className="card shadow-sm mt-3 p-1">
                    <LoadingSkelleton
                        alignment="vertical"
                        count={2}
                        width="100%"
                        height={150}
                    />
                </div>
            )}
            <Slider {...TopProductSlickSetting}>
                {
                    topProductList.length > 0 && topProductList.map((item, index) => (
                        <div className="top-product-card" key={index}>
                            <div className="custom_bg card pointer"
                                onClick={() => dispatch(toggleProductModalAction(item.sku))}
                            >
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="top-product-details">
                                            <p className="hot_deal_title">
                                                <Translate>Hot Deal Products</Translate>
                                            </p>
                                            <h6 className="top-product-name">{item.name}</h6>
                                            <p>
                                                <Translate>Price</Translate>:
                                                {/* <PriceCalculation item={item} /> */}

                                                <span className="price ml-2">
                                                    {formatCurrency(item.offer_selling_price)}
                                                </span> <sup><del>{formatCurrency(item.default_selling_price)}</del></sup>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="top-product-banner text-center">
                                            <img src={`${process.env.NEXT_PUBLIC_URL}images/products/${item.featured_image}`} alt={item.name} className="img-fluid img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </Slider>
        </div>
    );
};

export default ProductTopList;