import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faList } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import CategoryWiseMiniProduct from "./CategoryWiseMiniProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterParams,
} from "./_redux/Action/CategoryWiseProductAction";

const CategoryWishProductList = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state.CategoryWiseProductReducer
  );

  const { filterParams } = useSelector(
    (state) => state.CategoryWiseProductReducer
  );

  const [columns, setColumns] = useState("col-md-3");

  const selectHandler = (e) => {
    let filterParamClone = { ...filterParams };

    switch (e.target.value) {
      case "best_match":
        filterParamClone.order_by = ""
        filterParamClone.order = ""
        break;
      case "price_low_high":
        filterParamClone.order_by = "price"
        filterParamClone.order = "asc"
        break;
      case "price_high_low":
        filterParamClone.order_by = "price"
        filterParamClone.order = "desc"
        break;
      case "rating_high":
        filterParamClone.order_by = "rating"
        filterParamClone.order = "desc"
        break;
      case "stock_high":
        filterParamClone.order_by = "stock"
        filterParamClone.order = "desc"
        break;
    }
    dispatch(setFilterParams(filterParamClone));
  }

  return (
    <section className="category_wise_product_list">
      <div className="row justify-content-between">
        <div className="col-md-5">
          {/* <h5>We've got 0 products for you..</h5> */}
        </div>
        <div className="col-md-5">
          <div className="d-flex justify-content-end">
            <div className="filter_view">
              <span>View :</span>
              <FontAwesomeIcon
                className={
                  columns == "col-md-3"
                    ? "filter_columns column_active"
                    : "filter_columns"
                }
                icon={faColumns}
                onClick={() => setColumns("col-md-3")}
              />
              <FontAwesomeIcon
                className={
                  columns == "col-md-12"
                    ? "filter_columns column_active"
                    : "filter_columns"
                }
                icon={faList}
                onClick={() => setColumns("col-md-12")}
              />
            </div>
            <div className="filter_view d-flex ml-3">
              <span>Sort by :</span>
              <Form>
                <Form.Group controlId="exampleFormSelectCustom">
                  <Form.Control onChange={selectHandler} as="select" custom>
                    <option value="best_match">Best Match</option>
                    <option value="price_low_high">Price Low to High</option>
                    <option value="price_high_low">Price High to Low</option>
                    <option value="rating_high">Rating</option>
                    <option value="stock_high">Stock</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CategoryWiseMiniProduct columns={columns} />
        )}
      </div>
    </section>
  );
};

export default CategoryWishProductList;
