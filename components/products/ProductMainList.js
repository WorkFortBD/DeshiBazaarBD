import React, { useEffect, useState, memo } from "react";
import PropTypes from 'prop-types';

import LoadingSkelleton from "./../master/skelleton/LoadingSkelleton";
import { useDispatch, useSelector } from "react-redux";

import { getProductListAction, getProductsData } from "./_redux/Action/ProductAction";
import ProductSingleMini from "./ProductSingleMini";
import Slider from "react-slick";
import LoadingPlaceHolder from "../master/skelleton/LoadingPlaceholder";

const ProductMainList = (props) => {
    const slickSettings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        autoPlaySpeed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: false
              }
            }
          ]
    };

    const { type, limit, page, category = "", isSliding } = props;

    const dispatch                = useDispatch();
    const [loading, setLoading]   = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const args = {
            'type' : type,
            'limit': limit,
            'page' : page,
            category: category
        };

        /**
         * Get Products for Home Pages
         * No dispatch, direct axios call and get data and set to state
         * 
         * @since 1.0.0
         * 
         * @param object args 
         * 
         * @return void set data to local state
         */
        const getProducts = async (args) => {
            setLoading( true );
            const data = await getProductsData(args);
            if (typeof data !== 'undefined' && data !== null) {
                setProducts(data);
            }
            setLoading( false );
        }
        
        if ( page !== 'home' ) { // for home page only return product, no need to dispatch
            dispatch(getProductListAction(args));
        } else {
            getProducts(args)
        }
    }, []);


    const { isProductListloading } = useSelector(state => state.product);

    useEffect(() => {
    }, [isProductListloading])

    let productList = (
        <div className="row no-gutters">
            {
                loading && (
                    <LoadingPlaceHolder className="px-2 mb-2 mb-md-0 col-xl-2 col-lg-3 col-md-4 col-6" count={6} height={300}  />
                )
            }

            {products.length > 0 && products.map((item, index) => (
                <ProductSingleMini item={item} key={index} productKey={index+1} length={products.length} isSliding={isSliding} />
            ))}
        </div>
    )

    if(isSliding && !loading) {
        productList = (
            <Slider {...slickSettings}>
                {products.length > 0 && products.map((item, index) => (
                    <ProductSingleMini item={item} key={index} productKey={index+1} length={products.length} isSliding={isSliding} /> 
                ))}
            </Slider>
        )
    }
    if(isSliding && loading) {
        productList = (
            <div className="row no-gutters">
                <LoadingPlaceHolder className="px-2 mb-2 mb-md-0 col-xl-2 col-lg-3 col-md-4 col-6" count={6} height={300}  />
            </div>
        )
    }

    return (
        <div className="productList-body">
            {
                productList
            }
        </div>
    );
};

// Default props
ProductMainList.defaultProps = {
    type: '',
    page: 'home',
    category: ''
};

// All props
ProductMainList.propTypes = {
    type        : PropTypes.string,
    limit       : PropTypes.number,
    page        : PropTypes.string,
    category    : PropTypes.string,
    isSliding   : PropTypes.bool
};

export default memo( ProductMainList );
