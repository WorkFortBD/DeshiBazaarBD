import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import CategoryWiseMiniProduct from "./CategoryWiseMiniProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterParams,
} from "./_redux/action/CategoryAction";
import classNames from "classnames";
import {useRouter} from 'next/router';
import LoadingPlaceHolder from "../master/skelleton/LoadingPlaceholder";
import { parseFilterString } from "../../helper/parse-filter-query";


const CategoryWishProductList = ({showFilter, showFilterHandler, filterParams}) => {
  const router = useRouter();
  const { isLoading, paginate } = useSelector((state) => state.category);
  const {isMobile} = useSelector(state => state.global);

  const selectHandler = (e) => {

    switch (e.target.value) {
      case "best_match":
        router.replace({
          query: parseFilterString(router.query, {order_by: '', order: ''}) 
        })
        break;

      case "price_low_high":
        router.replace({
          query: parseFilterString(router.query, {order_by: 'price', order: 'asc'}) 
        })
      break;

      case "price_high_low":
        router.replace({
          query: parseFilterString(router.query, {order_by: 'price', order: 'desc'})
        })
      break;

      case "offer":
        router.replace({
          query: parseFilterString(router.query, {order_by: 'offer', order: 'desc'})
        })
      break;

      case "rating_high":
        router.replace({
          query: parseFilterString(router.query, {order_by: 'rating', order: 'desc'})
        })
      break;

      case "stock_high":
        router.replace({
          query: parseFilterString(router.query, {order_by: 'stock', order: 'desc'})
        })
      break;
    }
  }
  const perPageHandler = (e) => {

    switch (e.target.value) {        
      case "40":
        router.replace({
          query: parseFilterString(router.query, {paginate_no: '40', page: '1'})
        })
        break;
        
        case "60":
        router.replace({
          query: parseFilterString(router.query, {paginate_no: '60', page: '1'})
        })
        break;
        
        case "100":
        router.replace({
          query: parseFilterString(router.query, {paginate_no: '100', page: '1'})
        })
        break;
    }
  }

  const rowClasses = classNames({
    'row': true,
    'no-gutters': isMobile,
  });

  const filterClasses = classNames({
    column_active: showFilter
  })

  let title = "";
  
  // const {type, search, name} = filterParams;

  // if(filterParams.seller_id) {
  //   title = filterParams.seller_id;
  // }

  if(filterParams?.type || filterParams?.search || filterParams?.name) {
    title = filterParams.type || filterParams.search || filterParams.name
  };

  return (
    <section className="category_wise_product_list">
      <div className="row justify-content-between my-2 my-md-4">
        <div className="col-lg-6 col-sm-12 px-1 px-md-3">
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
        <div className="col-lg-6 col-sm-12 px-1 px-md-3">
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
              {
                filterParams && (
                  <Form>
                    <Form.Group controlId="exampleFormSelectCustom">
                      <Form.Control defaultValue={checkOptionValue(filterParams, 'sort by')} onChange={selectHandler} as="select" custom>
                        <option value="best_match">Best Match</option>
                        <option value="price_low_high">Price Low to High</option>
                        <option value="price_high_low">Price High to Low</option>
                        <option value="offer">Offer</option>
                        <option value="rating_high">Rating</option>
                        <option value="stock_high">Stock</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                )
              }
            </div>
            <div className="filter_view d-flex align-items-center">
              {
                !isMobile && (
                  <span>Per page</span>
                )
              }
              {
                filterParams && (
                  <Form>
                    <Form.Group controlId="exampleFormSelectCustom">
                      <Form.Control defaultValue={checkOptionValue(filterParams, 'per page')} onChange={perPageHandler} as="select" custom>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="100">100</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                )
              }
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

function checkOptionValue(filterParams, type) {
  if(type === 'sort by') {
    if(filterParams['order_by'] === 'price' && filterParams['order'] === 'desc') {
      return 'price_high_low'
    }
    
    if(filterParams['order_by'] === 'price' && filterParams['order'] === 'asc') {
      return 'price_low_high'
    }
  
    if(filterParams['order_by'] === 'rating') {
      return 'rating_high'
    }
  
    if(filterParams['order_by'] === 'stock') {
      return 'stock_high'
    }
    
    return null;
  }
  
  if(type === 'per page') {
    if(filterParams['paginate_no'] === '40') {
      return '40'
    }

    if(filterParams['paginate_no'] === '60') {
      return '60'
    }

    if(filterParams['paginate_no'] === '100') {
      return '100'
    }
    
    return null;
  }
}

export default CategoryWishProductList;
