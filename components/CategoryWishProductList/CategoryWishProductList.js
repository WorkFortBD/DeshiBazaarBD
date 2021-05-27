import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faList } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import CategoryWiseMiniProduct from './CategoryWiseMiniProduct';

const CategoryWishProductList = () => {
    const [columns, setColumns] = useState("col-md-3");

    return (
        <section className="category_wise_product_list">
            <div className="row justify-content-between">
                <div className="col-md-5">
                    <h5>We've got 50 products for you..</h5>
                </div>
                <div className="col-md-5">
                    <div className="d-flex justify-content-end">
                        <div className="filter_view">
                            <span>view :</span>
                            <FontAwesomeIcon
                                className={columns == "col-md-3" ? "filter_columns column_active" : "filter_columns"}
                                icon={faColumns}

                                onClick={() => setColumns("col-md-3")}
                            />
                            <FontAwesomeIcon
                                className={columns == "col-md-10" ? "filter_columns column_active" : "filter_columns"}
                                icon={faList}
                                onClick={() => setColumns("col-md-10")}
                            />
                        </div>
                        <div className="filter_view d-flex ml-3">
                            <span>sort by :</span>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Control as="select" custom>
                                        <option>Price</option>
                                        <option>Rating</option>
                                        <option>Offer</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <CategoryWiseMiniProduct columns={columns} />
            </div>
        </section>
    );
};

export default CategoryWishProductList;