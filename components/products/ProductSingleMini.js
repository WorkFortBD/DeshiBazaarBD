import React from "react";
import PropTypes from "prop-types";

import PriceCalculation from "./partials/PriceCalculation";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../carts/_redux/action/CartAction";
import { showToast } from "../master/Helper/ToastHelper";
import Translate from "../translation/Translate";
import router from 'next/router'
// import Image from 'next/image';
import Link from 'next/link';
import Image from "../master/Image/Image";

/**
 * ProductSingleMini Component
 *
 * @since 1.0.0
 *
 * @param object item
 * @param string columnClassName
 * @param string cardClassName
 *
 * @return view
 */
const ProductSingleMini = ({
  item = {},
  columnClassName = "col-md-2",
  productKey = 0,
  length = 0,
  cardClassName = "product-card",
  isSliding
}) => {
  const dispatch = useDispatch();
  const cardClass = productKey !== length ? "" : "border-right-0";

  const addToCart = (item) => {
    if (parseInt(item.current_stock) === 0) {
      showToast("error", "This product is out of stock!");
    } else {
      dispatch(addToCartAction(item));
    }
  };

  // const imageLoader = ({ src, width, quality }) => {
  //     return `https://icon-library.com/images/img-icon/img-icon-0.jpg`
  // }

  const imageURL = `${process.env.NEXT_PUBLIC_URL}images/products/${item.featured_image}`;

  // const modalHandler = () => {
  //   dispatch(toggleProductModalAction(item.sku));
  // };

  const redirectToProductDetailsPage = (product) => {
    router
      .push("/products/" + product.sku)
      .then((_) => {
        window.scrollTo(0, 0);
      });
  };

  const productSku = encodeURIComponent(item.sku)

  const uri = (`/products/${productSku}`);

  let singleProduct = (
    <div
      className={`
                ${
                  columnClassName === "col-md-2" &&
                  "col-xl-2 col-lg-3 col-md-4 col-6 px-2"
                } 
                ${
                  columnClassName === "col-md-3" &&
                  "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"
                }
                ${columnClassName === "col-md-12" && "col-12"}
        `}
    >
      <div className="">
      {/* // <div className={`${(columnClassName === "col-md-2" || columnClassName === "col-md-3") ? columnClassName + ' col-6 col-sm-6' : "col-12"}`}> */}
      <div
        className={`${cardClassName} ${cardClass} ${
          columnClassName === "col-md-2" || columnClassName === "col-md-3"
            ? "filter_column_3"
            : "filter_column_10"
        } `}
      >

        <div className={`product-card-body`} >
          {columnClassName === "col-md-2" && (
            <>
              <Link href={uri}>
                <a className="product-card-link">
                  <div style={{overflow: 'hidden'}}>
                    <div>
                      {/* <Image src={imageURL} alt={item.name} width={200} height={200} /> */}
                      {/* <img src={imageURL} alt={item.name} className="test" /> */}
                      <Image src={imageURL} alt={item.name} className="test" />
                    </div>
                    <div className="product-card-body-inner" style={{minHeight: '110px', maxHeight: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <span className="product-title pb-1 text-capitalize text-center">
                      <span className="font-14">
                        {item.name && item.name.toLowerCase()}
                      </span>
                    </span>
                      <span className="product-unit font-weight-500">{item.per_unit_value} {' '} {item.unit_name && item.unit_name}</span>
                      <p
                        className={`stock-status ${
                          parseInt(item.current_stock) > 0
                            ? "stock-status-in"
                            : "stock-status-out"
                        }`}
                      >
                        <span>
                          {parseInt(item.current_stock) > 0
                            ? "In stock"
                            : "Out of stock"}
                        </span>
                      </p>
                      <PriceCalculation item={item} />
                      <div
                        className={
                          columnClassName === "col-md-3" || "col-md-2"
                            ? ""
                            : "d-flex justify-content-start"
                        }
                      >
                        {/* <ProductRating rating={item.average_rating} /> */}
                        {/* {
                                                  item.average_rating != 0 && (
                                                      <ProductRating rating={item.average_rating} />
                                                  )
                                              } */}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
              <div className="product-single-mini-cart">
                <button type='button' onClick={() => addToCart(item)} className='simple-btn homepage-product-btn'>
                  <div className="simple-btn__inner">
                    <div className="simple-btn__icon">
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    <span className="simple-btn__txt">Add to cart</span>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* active box */}

          {(columnClassName === "col-md-3" ||
            columnClassName === "col-md-12") && (
            <>
              <div>
                  <Link href={uri}>
                    <a className="product-card-link">
                  <div className="mb-2" style={{overflow: 'hidden', marginTop: '1rem'}}>
                    {/* <img src={imageURL} alt={item.name} className="img-fluid" /> */}
                    <Image src={imageURL} alt={item.name} className="img-fluid" />
                    {/* <Image src={imageURL} alt={item.name} width={220} height={220} /> */}
                  </div>
                  <div style={{minHeight: '110px', maxHeight: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <span className="product-title px-2 pb-1 text-capitalize text-center">
                      <span className="font-14">
                        {item.name && item.name.toLowerCase()}
                      </span>
                    </span>
                    {/* <h2 className="product-title px-3 text-capitalize">{item.name && item.name.toLowerCase()}</h2> */}
                    <span className="product-unit font-weight-500">{item.per_unit_value} {' '} {item.unit_name && item.unit_name}</span>
                    <p
                      className={`stock-status ${
                        parseInt(item.current_stock) > 0
                        ? "stock-status-in"
                        : "stock-status-out"
                      }`}
                      >
                      <span>
                        {parseInt(item.current_stock) > 0
                          ? "In stock"
                          : "Out of stock"}
                      </span>
                    </p>
                    <PriceCalculation item={item} />
                    {/* <div
                      className={
                        columnClassName === "col-md-3"
                        ? ""
                        : "d-flex justify-content-start"
                      }
                    > */}
                      {/* {
                        item.average_rating != 0 && (
                          <ProductRating rating={item.average_rating} />
                          )
                        } */}
                    {/* </div> */}
                  </div>
                      </a>
                  </Link>
              </div>
              <div className="product-single-mini-cart">
              <button type='button' onClick={() => addToCart(item)} className='simple-btn product-btn'>
                <div className="simple-btn__inner">
                  <div className="simple-btn__icon">
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                  <span className="simple-btn__txt">Add to cart</span>
                </div>
              </button>
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  )

  if(isSliding) {
    singleProduct = (
      <div className="product-card filter_column_3">
      <div className="product-card-body">
        <Link href={uri}>
          <a className="product-card-link">
            <div style={{overflow: 'hidden'}}>
              <div>
                {/* <Image src={imageURL} alt={item.name} width={200} height={200} /> */}
                {/* <img src={imageURL} alt={item.name} /> */}
                <Image src={imageURL} alt={item.name} />
                
              </div>
            
              <div className="product-card-body-inner" style={{minHeight: '110px', maxHeight: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className="product-title pb-1 text-capitalize text-center">
                  <span className="font-14">
                    {item.name && item.name.toLowerCase()}
                  </span>
                </span>
                <span className="product-unit font-weight-500">{item.per_unit_value} {' '} {item.unit_name && item.unit_name}</span>
                <p
                  className={`stock-status ${
                    parseInt(item.current_stock) > 0
                      ? "stock-status-in"
                      : "stock-status-out"
                  }`}
                >
                  <span>
                    {parseInt(item.current_stock) > 0
                      ? "In stock"
                      : "Out of stock"}
                  </span>
                </p>
                <PriceCalculation item={item} />
                <div
                  className={
                    columnClassName === "col-md-3" || "col-md-2"
                      ? ""
                      : "d-flex justify-content-start"
                  }
                >
                </div>
              </div>
            </div>
          </a>
        </Link>
        <div className="product-single-mini-cart">
          <button type='button' onClick={() => addToCart(item)} className='simple-btn homepage-product-btn'>
            <div className="simple-btn__inner">
              <div className="simple-btn__icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <span className="simple-btn__txt">Add to cart</span>
            </div>
          </button>
        </div>
      </div>
      </div>
    )
  }

  return singleProduct;
};

ProductSingleMini.propTypes = {
  item: PropTypes.object,
  columnClassName: PropTypes.string,
  cardClassName: PropTypes.string,
};

export default ProductSingleMini;