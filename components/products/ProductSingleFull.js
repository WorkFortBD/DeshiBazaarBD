import React, { useState, useEffect } from "react";
import PriceCalculation from "./partials/PriceCalculation";
import ShareProduct from "./partials/ShareProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  getCartsAction,
  updateCartQtyAction,
} from "../carts/_redux/action/CartAction";
import { showToast } from "../master/Helper/ToastHelper";
import router from "next/router";
import { toggleProductModalAction } from "./_redux/Action/ProductAction";
import LoadingSpinner from "../master/loading/LoadingSpinner";
import { formatCurrency } from "../../services/currency";
import SimpleBtn from "../master/SimpleBtn/SimpleBtn";
import Translate from "../translation/Translate";

const ProductSingleFull = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState(null);
  const { carts } = useSelector((state) => state.cart);
  const {isSignedIn} = useSelector(state => state.global)
  const [filterCarts, setFilterCarts] = useState(null);
  const [updatedID, setUpdatedID] = useState(null);

  const getDefaultPrice = () => {
    if (product.is_offer_enable || product.is_offer_enable === "1") {
      return (typeof product.offer_selling_price != "undefined" && product.offer_selling_price != "0") ? product.offer_selling_price : product.default_selling_price;
    }

    return product.default_selling_price;
  }

  const [subTotal, setSubTotal] = useState(getDefaultPrice());

  useEffect(() => {
    if (product) {
      setPreviewImg(product.featured_url);
      const newFilterCarts = carts.find((item) => item.productID == product.id);
      setFilterCarts(newFilterCarts);
      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.quantity);
        setUpdatedID(newFilterCarts.productID);
        setSubTotal(newFilterCarts.quantity * getDefaultPrice());
      }
    }
  }, [product, carts]);

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  const addToCart = () => {
    if (parseInt(product.current_stock) === 0) {
      showToast("error", "Product is out of stock !");
    } else if (typeof filterCarts !== "undefined" && filterCarts !== null) {
      dispatch(updateCartQtyAction(updatedID, quantity));
    } else {
      dispatch(addToCartAction(product, { quantity }));
    }
  };

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
      setSubTotal(quantity * getDefaultPrice());
    }
  };

  const redirectToCheckoutPage = () => {
    if (process.browser) {
      if (!isSignedIn) {
        dispatch(toggleProductModalAction());
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

  const redirectToProductDetailsPage = (product) => {
    dispatch(toggleProductModalAction(""));
    router
      .push("/products/" + product.sku + "?category=" + product.category_id)
      .then((_) => {
        window.scrollTo(0, 0);
      });
  };

  return (
    <>
      {product ? (
        <div className="row p-3">
          <div className="col-md-1 col-4">
            <div className="product_details_img_gallery">
              <img
                src={product.featured_url}
                className={
                  previewImg == product.featured_url ? "select_img" : ""
                }
                onClick={() => setPreviewImg(product.featured_url)}
                alt={product.name}
              />
              {product.images &&
                product.images.length > 0 &&
                product.images.map((img, index) => (
                  <img
                    src={img.image_url}
                    className={previewImg == img.image_url ? "select_img" : ""}
                    alt={img.image_title}
                    key={index}
                    onClick={() => setPreviewImg(img.image_url)}
                  />
                ))}
            </div>
          </div>
          <div className="col-md-5">
            <div className="product_img">
              {/* <ReactImageZoom
                                {...zoomImg}
                            /> */}
              <img src={previewImg} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product_details_section">
              <div className="product_title_box">
                <h3 className="product_title">
                  {product.name && product.name}
                </h3>
                <SimpleBtn
                  variant="danger"
                  style={{
                    width: "fit-content",
                    padding: "5px 5px",
                    width: 100,
                    fontSize: 12,
                  }}
                  onClick={() => redirectToProductDetailsPage(product)}
                >
                  <Translate>View details</Translate>
                </SimpleBtn>
              </div>

              <div className="h3 product_price">
                <PriceCalculation item={product} />
              </div>

              <p className="product_description">
                {product.short_description && product.short_description}
              </p>

              <div className="product_details_quantity_section">
                <div className="d-flex">
                  <div>
                    {/* <h6>Quantity</h6> */}
                    <div className="quantity mt-0">
                      <button
                        disabled={quantity <= 1 ? true : false}
                        onClick={() => updateQuantity(quantity - 1)}
                        className={quantity <= 1 ? `not-allowed` : `pointer`}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => updateQuantity(e.target.value)}
                      />
                      <button
                        className="pointer"
                        onClick={() => updateQuantity(quantity + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <p className="floating-cart__product-price mt-3">
                      {quantity} <span>X</span>&nbsp;
                      {formatCurrency(getDefaultPrice())} ={" "}
                      {formatCurrency(subTotal)}&nbsp;
                    </p>
                  </div>
                  <div className="mr-3">
                  </div>
                </div>

                <div className="d-flex mt-3 product-details-section">
                  <div className="mr-2">
                    <button
                      className="btn buy_now_btn"
                      onClick={() => redirectToCheckoutPage()}
                    >
                      Buy Now
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn add_to_cart_btn"
                      onClick={() => addToCart()}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="product_details_bottom mt-2">
                <div>
                  <div className="category_tags d-flex">
                    Categories:
                    <p className="">
                      {product.category && product.category.name}
                    </p>
                  </div>
                  <div className="category_tags d-flex">
                    Tags:
                    <p className="category_tags">
                      {/* {product.tags && product.tags} */}
                    </p>
                  </div>
                </div>
                <div className="Product_bottom_socail_media">
                  <ShareProduct product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <p>Loading...</p> */}
          <LoadingSpinner text="Loading Product..." />
        </div>
      )}
    </>
  );
};

export default ProductSingleFull;
