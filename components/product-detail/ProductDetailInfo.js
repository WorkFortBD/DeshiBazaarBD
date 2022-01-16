import React, { useEffect, useState } from "react";
import Rater from "react-rater";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from 'next/router';
import {
  addToCartAction,
  getCartsAction,
  updateCartQtyAction,
} from "../carts/_redux/action/CartAction";
import ProductDetailsDescription from "./ProductDetailsDescription";
import AddWishList from "../Wishlist/AddWishList";
import ProductRatings from "./ProductRatings";
import DeliveryFeatures from "./DeliveryFeatures";
import PriceCalculation from "../products/partials/PriceCalculation";
import { showToast } from "../master/Helper/ToastHelper";
import ProductMainList from "../products/ProductMainList";
import { formatCurrency } from "../../services/currency";
import LazyLoad from "react-lazyload";
import InnerImageZoom from 'react-inner-image-zoom';
import Overlay from '../master/Modal/Overlay';
import content from '../../content.json';

const ProductDetailInfo = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product } = props;
  const { id: productId } = product;
  const [quantity, setQuantity] = useState(1);
  const { carts } = useSelector((state) => state.cart);
  const { isSignedIn } = useSelector(state => state.global)
  const [filterCarts, setFilterCarts] = useState(null);
  const [updatedID, setUpdatedID] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  const default_price =
    product.is_offer_enable && product.offer_selling_price !== 0
      ? product.offer_selling_price
      : product.default_selling_price;
  const [subTotal, setSubTotal] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  const handleChangePreviewImg = (image_url) => {
    setPreviewImg(image_url);
  };

  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    draggable: true,
    focusOnSelect: false,
    slidesToShow: 4,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };

  useEffect(() => {
    if (product) {
      const featured_image = `${process.env.NEXT_PUBLIC_URL}images/products/${product.featured_image}`;
      setPreviewImg(featured_image);

      const newFilterCarts = carts.find((item) => item.productID == product.id);

      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.quantity);
        setUpdatedID(newFilterCarts.productID);
        setSubTotal(newFilterCarts.quantity * default_price);
      } else {
        // @todo - Manage this counting using MRP while completed in API end
        setQuantity(1);
        setSubTotal(1 * default_price);
      }

      if(Array.isArray(product.images)) {
        product.images.unshift({image_url: product.featured_url || ''})
      }

      setFilterCarts(newFilterCarts);
    }
  }, [productId]);

  const updateQuantity = (quantity) => {
    if (
      typeof filterCarts !== "undefined" &&
      filterCarts !== null &&
      updatedID !== null
    ) {
      setQuantity(filterCarts.quantity);
      dispatch(updateCartQtyAction(updatedID, quantity));
    } else {
      setQuantity(quantity);
      setSubTotal(quantity * default_price);
    }
  };

  const addToCart = () => {
    if (parseInt(product.current_stock) === 0) {
      showToast("error", "This product is out of stock!");
    } else if (typeof filterCarts !== "undefined" && filterCarts !== null) {
      dispatch(updateCartQtyAction(updatedID, quantity));
    } else {
      dispatch(addToCartAction(product, { quantity }));
    }
  };

  const redirectToCheckoutPage = () => {
    if (process.browser) {
      if (!isSignedIn) {
        showToast("error", "Please Login to checkout");
        router.push("/login").then((_) => window.scrollTo(0, 0));
        return;
      }

      if (parseInt(product.current_stock) === 0) {
        showToast("error", "Product is out of stock!");
      } else {
        dispatch(addToCartAction(product));
        router.push("/checkout").then((_) => window.scrollTo(0, 0));
      }
    }
  };

  return (
    <>
      {product !== "undefined" && product !== null && (
        <div className="product-info-page">
          <Breadcrumb>
            {typeof product.category !== "undefined" &&
              product.category !== null && (
                <Link href={`/products?category=${encodeURIComponent(product.category.slug)}&name=${encodeURIComponent(product.category.name)}&filter=paginate_no__40`}>
                  <Breadcrumb.Item
                    href={`/products?category=${encodeURIComponent(product.category.slug)}&name=${encodeURIComponent(product.category.name)}&filter=paginate_no__40`}
                  >
                    {product.category.name}
                  </Breadcrumb.Item>
                </Link>
              )}

            {typeof product.sub_category !== "undefined" &&
              product.sub_category !== null && (
                <Link href={`/products?category=${encodeURIComponent(product.sub_category.slug)}&name=${encodeURIComponent(product.sub_category.name)}&filter=paginate_no__40`}>
                  <Breadcrumb.Item
                    href={`/products?category=${encodeURIComponent(product.sub_category.slug)}&name=${encodeURIComponent(product.sub_category.name)}&filter=paginate_no__40`}
                  >
                    {product.sub_category.name}
                  </Breadcrumb.Item>
                </Link>
              )}

            {typeof product.sub_category2 !== "undefined" &&
              product.sub_category2 !== null && (
                <Link href={`/products?category=${encodeURIComponent(product.sub_category2.slug)}&name=${encodeURIComponent(product.sub_category2.name)}&paginate_no__40`}>
                  <Breadcrumb.Item
                    href={`/products?category=${encodeURIComponent(product.sub_category2.slug)}&name=${encodeURIComponent(product.sub_category2.name)}&paginate_no__40`}
                  >
                    {product.sub_category2.name}
                  </Breadcrumb.Item>
                </Link>
              )}
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>

          {/**Product Details area****/}
          {previewImg && (
            <div className="product_details_section">
              <div className="">
                <div className="card shadow-md">
                  <div className="row ">
                    <div className="col-lg-9 bg-white">
                      <div className="">
                        <div className="row">
                          <div className="col-lg-6 mt-2 text-center">
                              <InnerImageZoom 
                                src={previewImg} 
                                zoomSrc={previewImg}
                                zoomType="hover"
                                width={500}
                                height={500}
                                zoomScale={1.7}
                                alt={previewImg}
                                hasSpacer
                              />
                            <div className="product_preview_gallery justify-content-center justify-content-lg-start mt-2">
                              {/* <Slider {...settings}> */}
                                {product.images && product.images.length > 0 && product.images.map((item, index) => (
                                  <div key={index}>
                                    <div className="pointer" onClick={() => handleChangePreviewImg(item.image_url) } style={{padding: '5px', width: '100%', height: '100px'}}>
                                      <img width={90} height={90} style={{maxWidth: '100%', objectFit: 'contain', height: '100%', border: '1px solid #ddd', padding: '5px'}} src={item.image_url} alt={product.name} />
                                    </div>
                                  </div>
                                ))}
                              {/* </Slider> */}
                            </div>
                          </div>
                          <div className="col-lg-6 px-0">
                            <div className="product_details_information py-2">
                              <h2 className="product_title pt-3 text-uppercase">{product.name && product.name.toLowerCase()}</h2>

                              <div className="d-flex justify-content-between align-items-end">
                                <div>
                                  <div className="review_rating">
                                    <Rater
                                      total={5}
                                      interactive={false}
                                      rating={parseInt(product.average_rating)}
                                    />{" "}
                                    <span className="rating_value_text">
                                      {" "}
                                      {product.total_rating} Ratings{" "}
                                    </span>
                                  </div>
                                  <div className="product__details__brand py-2">
                                    {typeof product.brand != "undefined" &&
                                      product.brand != null && (
                                        <Link
                                          href={`/products?brand=${encodeURIComponent(product.brand.slug)}&name=${encodeURIComponent(product.brand.name)}&filter=paginate_no__40`}
                                          className="LinkToBrandPage pointer"
                                        >
                                          <span>
                                            {" "}
                                            Brand Name:{" "}
                                            <span className="brand_name_in_details">
                                              {product.brand.name}
                                            </span>
                                          </span>
                                        </Link>
                                      )}
                                  </div>
                                  {
                                    product.sku_manual && (
                                      <div className="py-2">
                                        <span>SKU: </span>
                                        <span>
                                          {
                                            product.sku_manual
                                          }
                                        </span>
                                      </div>
                                    )
                                  }

                                  <div>
                                    {product.current_stock > 0 &&
                                      product.enable_stock ? (
                                      <div className="stock-area in-stock">
                                        <span>
                                          In Stock - {product.current_stock}{" "}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="stock-area out-stock">
                                        <span>Out of Stock</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="d-flex" >
                                  <div>
                                    <span className="mr-3">
                                      <AddWishList productId={product.id} />
                                    </span>
                                  </div>
                                  <div className="position-relative">
                                    <span className={`pointer ${overlayVisible ? 'color-main' : 'text-secondary'}`} onClick={() => setOverlayVisible(true)} >
                                      <i className="fas fa-share"></i>
                                    </span>
                                    <Overlay visible={overlayVisible} closeModalHandler={() => setOverlayVisible(false)} offset={20}>
                                      <div className="d-flex justify-content-center align-items-center p-3">
                                        <div>Share: </div>
                                        <div>
                                          <ul className="social-media m-0">
                                              <li className="social-facebook m-0 ml-2" >
                                                <Link  href={`https://www.facebook.com/sharer/sharer.php?u=${content.main_url}${router.asPath}`}>
                                                  <a target="_blank">
                                                    <i className="fab fa-facebook-f"></i>
                                                  </a>
                                                </Link>
                                              </li>
                                              <li className="social-whatsApp m-0 ml-2" >
                                                <i className="fab fa-whatsapp"></i>
                                              </li>
                                              <li className="social-instagram m-0 ml-2" >
                                                <i className="fab fa-instagram"></i>
                                              </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </Overlay>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                              <span className="product-unit font-weight-500">{product.per_unit_value} {' '} {product.unit && product.unit.actual_name && product.unit.actual_name}</span>
                                <PriceCalculation item={product} />
                              </div>
                              <hr />

                              <div className="product_details_price">
                                {/* <PriceCalculation item={product} /> */}

                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="quantity">
                                    <button
                                      disabled={quantity <= 1 ? true : false}
                                      onClick={() => updateQuantity(quantity - 1)}
                                      className={
                                        quantity <= 1 ? `not-allowed` : `pointer`
                                      }
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                      type="text"
                                      value={quantity}
                                      onChange={(e) =>
                                        updateQuantity(e.target.value)
                                      }
                                    />
                                    <button
                                      className="pointer"
                                      onClick={() => updateQuantity(quantity + 1)}
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div className="badge mt-3">
                                    <p className="floating-cart__product-price">
                                      {quantity} <span>X</span>&nbsp;
                                      {formatCurrency(default_price)} ={" "}
                                      {formatCurrency(subTotal)}&nbsp;
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex mt-3 product-details-section">
                                  <div className="mr-2">
                                    <button
                                      disabled={(product.default_selling_price !== null || undefined) && product.default_selling_price <= 0 ? true : false}
                                      className="btn buy_now_btn"
                                      onClick={() => redirectToCheckoutPage()}
                                    >
                                      Buy Now
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      disabled={(product.default_selling_price !== null || undefined) && product.default_selling_price <= 0 ? true : false}
                                      className="btn add_to_cart_btn"
                                      onClick={() => addToCart()}
                                    >
                                      Add To Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 mt-lg-4">
                                <span className="product_details_section__exceed-amount-message">
                                  Pay 10&#37; advance if purchase amount above 2000 BDT
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*Product Details Information*/}
                      <div className="my-4">
                        {typeof product.description != "undefined" &&
                          product.description !== null && (
                            <ProductDetailsDescription product={product} />
                          )}
                      </div>

                      
                    </div>
                    {/*Location Section*/}
                    <div className="col-lg-3 pt-3 pt-md-0" style={{background: '#f7ae9d26'}}>
                      {
                        product.business && product.business.location && (
                          <DeliveryFeatures product={product} />
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <LazyLoad height={200} once>
                <ProductRatings product={product} />
              </LazyLoad>
              <div className="mb-5 mt-5">
                <p className="font-weight-bold product_details_people_viewed_title">
                  People who viewed this item also viewed
                </p>
                <LazyLoad height={400} once>
                  <ProductMainList
                    type=""
                    limit={6}
                    category={product.category_id}
                  />
                </LazyLoad>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetailInfo;