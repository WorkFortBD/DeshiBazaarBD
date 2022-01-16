import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import Rater from "react-rater";
import { useDispatch, useSelector } from "react-redux";
import { getReviewListByUser } from "../product-review/_redux/action/reviewAction";
import LoadingSkelleton from "../master/skelleton/LoadingSkelleton";

const ProductRatings = ({ product }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewListByUser(product.id));
  }, []);

  const { reviewList, isLoading } = useSelector((state) => state.productReview);

  return (
    <div className="row mt-3 mb-3 no-gutters">
      <div className="col-lg-9">
        <div className="card p-3">
          <div className="card-title">Ratings & Reviews of {product.name}</div>
          <h2>{product.average_rating}/5</h2>
          <div className="review two">
            <Rater total={5} rating={product.average_rating} interactive={false} />
          </div>
          <span>{product.total_rating} Ratings</span>
          <hr />
          {
            isLoading && (
              <LoadingSkelleton
                alignment = "vertical"
                count     = {1}
                width     = "100%"
                height    = {120}
              />
            )
          }

          {
            reviewList.length > 0 && reviewList.map((item, index) => (
              <div className="rating_body" key={index}>
                <ReactStars
                  count       = {5}
                  size        = {30}
                  value       = {+item.rating_value}
                  edit        = {false}
                  activeColor = "#ffab00"
                />
                <p className="rating_by">
                  By {item.rating_by} 
                  <span className="text-success verify_review">
                    <i className="fas fa-shield-alt"></i>
                  </span>
                </p>
                <p> {item.comment ? item.comment : "----"}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProductRatings;
