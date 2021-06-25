import React, { useState, useEffect } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialMedia from "../Footer/SocialMedia";
import ReactImageZoom from "react-image-zoom";
import Link from "next/link";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  // const [previewImg, setPreviewImg] = useState(product.featured_image);
  const [previewImg, setPreviewImg] = useState(null);
  const previewImage = {
    zoomWidth: 400,
    // vertical: 1,
    // horizontal: 2,
    scale: 0.5,
    zoomLensStyle: "opacity: 0.7;background-color: #ff3e2081;",
    img: previewImg,
  };

  useEffect(() => {
    if (product) {
      setPreviewImg(product.featured_image);
    }
  }, [product]);

  return (
    <>
      {product ? (
        <div className="row p-3">
          <div className="col-md-1">
            <div className="product_details_img_gallery">
              <img
                src={product.featured_url}
                // onClick={() => setPreviewImg(product.productImg)}
                alt={product.name}
              />
              {product.images &&
                product.images.length > 0 &&
                product.images.map((img, index) => (
                  <img
                    src={img.image_url}
                    className={
                      previewImage.img == img.image ? "select_img" : ""
                    }
                    alt={img.image_title}
                    key={index}
                    onClick={() => setPreviewImg(img.image)}
                  />
                ))}
            </div>
          </div>
          <div className="col-md-5">
            <div className="product_img">
              <img src={product.featured_url} alt={product.name} />
              {/* <ReactImageZoom
                {...previewImage}
                className="product-details-img"
              /> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="product_details_section">
              <Link href={"/products/" + product.sku}>
                <h3 className="product_title">
                  {product.name && product.name}
                </h3>
              </Link>
              <div className="h3 product_price">
                ৳ {product.default_selling_price && product.default_selling_price}
                <span className="product_offerPrice">
                  ৳{product.offer_selling_price && product.offer_selling_price}
                </span>
              </div>
              <p className="product_description">
                {product.description && product.description}
              </p>
              <div className="product_details_quantity_section">
                <div>
                  <h6>Quantity</h6>
                  <div className="quantity">
                    <button
                      disabled={quantity <= 1 ? true : false}
                      onClick={() => setQuantity(quantity - 1)}
                      className={quantity <= 1 ? `not-allowed` : `pointer`}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input type="text" value={quantity} />
                    <button
                      className="pointer"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <div className="mr-3">
                  <h6>Pick your colo</h6>
                  <div className="color_picker">
                    <p
                      className="colorBox"
                      style={{ backgroundColor: "#2df" }}
                    ></p>
                    <p
                      className="colorBox"
                      style={{ backgroundColor: "#4c3" }}
                    ></p>
                    <p
                      className="colorBox"
                      style={{ backgroundColor: "#7d8" }}
                    ></p>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <div className="button addToCartBtn">Add to cart</div>
                  <div className="button buyBtn">buy now</div>
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
                  <SocialMedia />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
