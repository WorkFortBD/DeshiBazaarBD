import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../master/message/ErrorMessage';
import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
import PriceCalculation from '../products/partials/PriceCalculation';
import { handleChangeReviewItemInput, storeReviewData } from './_redux/action/reviewAction';

const ProductReviewCreate = ({ ReviewItem, handleClose }) => {

    const dispatch                                  = useDispatch()
    const [ratingValue, setRatingValue]             = React.useState(4);
    const reviewSubmitting                          = useSelector((state) => state.productReviewAnother.reviewSubmitting);
    const reviewInput                               = useSelector((state) => state.productReviewAnother.reviewInput);
    const {userData}                                = useSelector(state => state.user);
    const { register, handleSubmit, watch, errors } = useForm();

    const reviewStoreInput = {
        item_id     : ReviewItem.item_id,
        rating_value: ratingValue,
        comment     : reviewInput.comment,
        images      : reviewInput.images
    }
    const handleChangeCouponCode = (name, value) => {
        dispatch(handleChangeReviewItemInput(name, value))
    }

    const onSubmit = () => {
        dispatch(storeReviewData(reviewStoreInput, handleClose, userData.id))
    };

    return (
        <div className="product-review-form-box">
            <h5 className="border-bottom"> Product Review</h5>
            <div className="card audienceContainer p-2">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <div className="pool-container m-1">
                        <h6>Delivered on 24 Feb 2021</h6>
                        {/* <p>Rate and review purchased product:</p> */}
                        <div className="row">
                            <div className="col-2">
                                <img width="120px" src={`${process.env.NEXT_PUBLIC_URL}images/products/${ReviewItem.featured_image}`} alt={ReviewItem.item_name} className="img-thumbnail" />
                            </div>
                            <div className="col-10">
                                <h3>{ReviewItem.item_name && ReviewItem.item_name}</h3>
                                <p>Seller : {ReviewItem.business_name && ReviewItem.business_name}</p>
                                <div className="">
                                    <PriceCalculation item={ReviewItem} />
                                    <p>Discount Amount : ৳ {ReviewItem.tax_amount && ReviewItem.tax_amount}</p>
                                </div>
                                <ReactStars
                                    count={5}
                                    value={ratingValue}
                                    onChange={(newValue) => setRatingValue(newValue)}
                                    size={30}
                                    activeColor="#ffd700"
                                />,
                                <label>Review detail</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Please share your feedback about the product: was the product as described? What is the quality like?"
                                    name="comment"
                                    onChange={(e) => handleChangeCouponCode("comment", e.target.value)}
                                    ref={register({ required: true })}
                                />
                                {errors.comment &&
                                    <ErrorMessage message="Your Comments can't be blank! " />
                                }
                                <br />

                                <div className="mb-3">
                                    <Form.File id="formcheck-api-custom" custom>
                                        <Form.File.Input
                                            name="images"
                                            onChange={(e) => handleChangeCouponCode("images", e)}
                                            isValid />
                                        <Form.File.Label data-browse="UPLOAD">
                                            Choose Your Review Image
                                        </Form.File.Label>
                                    </Form.File>
                                </div>
                                {/* <div className="input-group">
                                        <label className="input-group-text" for="inputGroupFile01">Upload</label>
                                        <input type="file" className="form-control" id="inputGroupFile01" />
                                    </div> */}
                            </div>
                        </div>
                    </div>
                    {
                        !reviewSubmitting && (
                            <SimpleBtn type="submit" variant="simple_btn_bg" style={{ width: 'fit-content', float: "right", marginTop: "10px" }}>
                                Submit
                            </SimpleBtn>
                        )
                    }

                    {reviewSubmitting && (
                        <SimpleBtn type="submit" variant="simple_btn_bg" style={{ width: 'fit-content', float: "right", marginTop: "10px", cursor: "not-allowed" }}>
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Submitting...
                        </SimpleBtn>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProductReviewCreate;