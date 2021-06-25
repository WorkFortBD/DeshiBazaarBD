import React from "react";
import Rater from "react-rater";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import AddIcon from "@material-ui/icons/Add";
import { Remove } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCartsAction,
  addToCartAction,
  updateCartQtyAction,
} from "../../components/_redux/CartProduct/Action/CartAction";

import SimpleBtn from "../master/SimpleBtn/SimpleBtn";
import ReactImageZoom from "react-image-zoom";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";

const ProductDetailInfo = (props) => {
  const { product } = props;

  //product quantity set
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.CartReducer.carts);

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  const cartProduct = {
    productID: product.id,
    productName: product.name,
    quantity: quantity,
    price: product.default_selling_price,
    offerPrice: product.offer_selling_price,
    productImage: `${process.env.NEXT_PUBLIC_URL}images/products/${product.featured_image}`,
    business: {
      businessID: product.business_id,
      businessName: product.business.name,
      businessLogo: `${process.env.NEXT_PUBLIC_URL}images/vendors/${product.business.logo_url}`,
    },
  };
  // increase quantity
  const increaseQuantity = (id, quantity) => {
    carts.find(
      (item) => item.productID === id && setQuantity((item.quantity += 1))
    );
    dispatch(updateCartQtyAction(id, (quantity += 1)));
    dispatch(addToCartAction(cartProduct, id));
  };

  //decrease quantity
  const decrementQunatity = (id, quantity) => {
    carts.find(
      (item) =>
        item.productID === id &&
        item.quantity > 1 &&
        setQuantity((item.quantity -= 1))
    );
    if (quantity > 1) {
      dispatch(updateCartQtyAction(id, (quantity -= 1)));
    }
  };

  const addToCart = (cartProduct, id) => {
    dispatch(addToCartAction(cartProduct, id));
  };

  const featured_image = `${process.env.NEXT_PUBLIC_URL}images/products/${product.featured_image}`;
  const [previewImg, setPreviewImg] = useState(featured_image);
  const handleChangePreviewImg = (image) => {
    setPreviewImg(image.image_url);
  };
  const zoomImage = { zoomWidth: 700, zoomWidth: 700, img: previewImg };
  // const zoomImage = {width: 400, height: 250, zoomWidth: 500, img: previewImg}
  const userData = useSelector((state) => state.UserDataReducer.userData);

  const handleBuyProduct = (cartProduct, id) => {
    dispatch(addToCartAction(cartProduct, id));
    if (userData !== null) {
      router.push("/placeorder");
    } else if (userData === null) {
      router.push("/login");
    }
  };

  let zoomImgProps;
  if (product) {
    zoomImgProps = {
      width: 400,
      zoomWidth: 500,
      zoomStyle: `opacity: 0.4;`,
      img: cartProduct.productImage,
    };
  }

  return (
    <>
      {product != null && (
        <div className="homebanner single-product-section bp">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="elegentchairmenu">
                  <Breadcrumb>
                    {typeof product.category != "undefined" &&
                      product.category != null && (
                        <Link href={`/categories/${product.category.slug}`}>
                          <Breadcrumb.Item
                            href={`/products?category=${product.category.slug}`}
                          >
                            {product.category.name}
                          </Breadcrumb.Item>
                        </Link>
                      )}

                    {typeof product.sub_category != "undefined" &&
                      product.sub_category != null && (
                        <Link href={`/categories/${product.sub_category.slug}`}>
                          <Breadcrumb.Item
                            href={`/products?category=${product.sub_category.slug}`}
                          >
                            {product.sub_category.name}
                          </Breadcrumb.Item>
                        </Link>
                      )}

                    {typeof product.sub_category2 != "undefined" &&
                      product.sub_category2 != null && (
                        <Link
                          href={`/categories/${product.sub_category2.slug}`}
                        >
                          <Breadcrumb.Item
                            href={`/products?category=${product.sub_category2.slug}`}
                          >
                            {product.sub_category2.name}
                          </Breadcrumb.Item>
                        </Link>
                      )}

                    <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </div>

            <div className="row product-details-info">
              <div className="col-md-4">
                <div className="product-details-info__image-container">
                  <div className="product-details-info__image-large">
                    {zoomImgProps.img && <ReactImageZoom {...zoomImgProps} />}
                    {/* <img
                      src={cartProduct.productImage}
                      alt={cartProduct.productName}
                    /> */}
                  </div>
                  <div className="product-details-info__small-images">
                    {product.images.map((img) => (
                      <div className="product-details-info__image-small">
                        <img src={img.image_url} alt={img.image} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-details-info__details">
                  <div className="product-details-info__heading">
                    <h3>{cartProduct.productName}</h3>
                    <div className="product-details-info__ratings">
                      8 ratings
                    </div>
                    <div className="product-details-info__brand">
                      <p>Brand: </p>
                    </div>
                  </div>
                  <div className="product-details-info__price-quantity">
                    <p>$ 640</p>
                    <div className="product-details-info__quantity">
                      <h2>
                        Quantity:
                        <div className="cart-quantity-area">
                          <button
                            className="btn btn-light quantity-btn decrement bg-light text-dark"
                            onClick={(id, quantity) =>
                              decrementQunatity(
                                cartProduct.productID,
                                cartProduct.quantity
                              )
                            }
                          >
                            {" "}
                            <Remove />
                          </button>
                          <span className="colorType rounded text-dark">
                            {quantity}
                          </span>
                          <button
                            className="btn btn-light quantity-btn  increment bg-light text-dark ml-2"
                            onClick={(id, quantity) =>
                              increaseQuantity(
                                cartProduct.productID,
                                cartProduct.quantity
                              )
                            }
                          >
                            <AddIcon />
                          </button>
                        </div>
                      </h2>
                    </div>
                  </div>
                  <div className="product-details-info__action">
                    <div className="product-details-info__buy-now">
                      <SimpleBtn
                        variant="danger"
                        onClick={() =>
                          handleBuyProduct(cartProduct, product.id)
                        }
                      >
                        Buy Now
                      </SimpleBtn>
                    </div>
                    <div className="product-details-info__add-to-cart">
                      <SimpleBtn
                        variant="success"
                        onClick={() => addToCart(cartProduct, product.id)}
                      >
                        Add to cart
                      </SimpleBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="single-product-section__long-description">
                  {ReactHtmlParser(product.description)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailInfo;
