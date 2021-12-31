import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CategoryWiseMiniProduct from "./CategoryWiseMiniProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterParams,
} from "./_redux/Action/CategoryWiseProductAction";
import classNames from "classnames";
import {useRouter} from 'next/router';
import LoadingPlaceHolder from "../master/skelleton/LoadingPlaceholder";
import { parseFilterString } from "../../helper/parse-filter-query";


const CategoryWishProductList = ({showFilter, showFilterHandler}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, paginate } = useSelector(
    (state) => state.CategoryWiseProductReducer
  );
  const {isMobile} = useSelector(state => state.GlobalReducer);


  const { filterParams } = useSelector(
    (state) => state.CategoryWiseProductReducer
  );

  const selectHandler = (e) => {
    let filterParamClone = { ...filterParams };

    switch (e.target.value) {
      case "best_match":
        filterParamClone.order_by = ""
        filterParamClone.order = ""
        break;

      case "price_low_high":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {order_by: 'price', order: 'asc'}) 
        })
      break;

      case "price_high_low":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {order_by: 'price', order: 'desc'})
        })
      break;

      case "rating_high":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {order_by: 'rating', order: 'desc'})
        })
      break;

      case "stock_high":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {order_by: 'stock', order: 'desc'})
        })
      break;
    }
  }
  const perPageHandler = (e) => {
    let filterParamClone = { ...filterParams };

    switch (e.target.value) {        
      case "40":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {paginate_no: '40', page: '1'})
        })
        break;
        
        case "60":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {paginate_no: '60', page: '1'})
        , page: '2'})
        break;
        
        case "100":
        router.replace({
          pathname: '/products',
          query: parseFilterString(router.query, {paginate_no: '100', page: '1'})
        })
        break;
    }

    dispatch(setFilterParams(filterParamClone));
  }

  const rowClasses = classNames({
    'row': true,
    'no-gutters': isMobile,
  });

  const filterClasses = classNames({
    column_active: showFilter
  })

  // const filterHeadingClasses = classNames({
  //   "category_wise_product_list_heading": true,
  //   show: showFilter
  // })

  let title = "";
  
  const {type, search, name} = router.query;

  if(filterParams.seller_id) {
    title = filterParams.seller_id;
  }

  if(type || search || name) {
    title = type || search || name
  }

  return (
    <section className="category_wise_product_list">
      <div className="row justify-content-between my-2 my-md-4">
        <div className="col-lg-6 col-sm-12">
          <div className="category_wise_product_list_heading">
            <h5 className="category-search-title">
              {
                !isLoading && title && title.replace(/-/g, " ")
              }
              {
                !isLoading && !title && "All products"
              }
            </h5>
          </div>
          <p>
            {
              !isLoading && title &&
              (paginate.total !== null ? paginate.total : '0') + ` products found in ${title.replace(/-/g, " ")}`
            }
            {
              !isLoading && !title &&
              (paginate.total !== null ? paginate.total : '0') + ' products found'
            }
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="d-flex justify-content-start justify-content-sm-end">
            <div className="filter_view mr-2 d-flex align-items-center" onClick={() => showFilterHandler()}> 
              <div className="product-filter">
                <span style={{marginRight: '5px'}}>
                  Filter 
                </span>
                <span>
                <i className="fas fa-sliders-h"></i>
                </span>
              </div>
            </div>
            <div className="filter_view d-flex mr-2 align-items-center">
              {
                !isMobile && (
                  <span>Sort by</span>
                )
              }
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
            <div className="filter_view d-flex align-items-center">
              {
                !isMobile && (
                  <span>Per page</span>
                )
              }
              <Form>
                <Form.Group controlId="exampleFormSelectCustom">
                  <Form.Control onChange={perPageHandler} as="select" custom>
                    <option value="40">40</option>
                    <option value="60">60</option>
                    <option value="100">100</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {
        isLoading && (
          <div className="row no-gutters">
            <LoadingPlaceHolder className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 p-1 px-md-3 pb-2" count={4} height={isMobile ? 250 : 370}  />
          </div>
        )
      }
      <div className={rowClasses}>
        {
          !isLoading && (
            <CategoryWiseMiniProduct columns="col-md-3" />
          )
        }
      </div>
    </section>
  );
};

export default CategoryWishProductList;
