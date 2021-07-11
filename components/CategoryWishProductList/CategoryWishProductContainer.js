import React, { useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import CategoryWishProductList from "./CategoryWishProductList";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredProducts,
  setFilterParams,
} from "./_redux/Action/CategoryWiseProductAction";

const Base_Url = process.env.NEXT_PUBLIC_API_URL;

const CategoryWishProductContainer = () => {
  const dispatch = useDispatch();
  
  const { paginate, filterParams } = useSelector(
    (state) => state.CategoryWiseProductReducer
  );

  const classes = classNames({
    "page-item": true,
    disabled: !paginate.prev_page_url,
  });

  const nextClasses = classNames({
    "page-item": true,
    disabled: !paginate.next_page_url,
  });

  const paginateHandler = (direction, pageUrl) => {

    window.scrollTo({ top: 0, behavior: "smooth" });
    const page = +pageUrl.split("page=")[1];

    const filterParamClone = { ...filterParams };
    filterParamClone.page  = page;

    if (direction === "previous") {
      // dispatch(getFilteredProducts(filterParamClone));
      dispatch(setFilterParams(filterParamClone));
    } else if (direction === "linier") { 
      // dispatch(getFilteredProducts(filterParamClone));
      dispatch(setFilterParams(filterParamClone));
    } else if (direction === "next") {
      // dispatch(getFilteredProducts(filterParamClone));
      dispatch(setFilterParams(filterParamClone));
    }
  };

  // useEffect(() => {
  //   if (!paginate.first_page_url) {
  //     dispatch(getFilteredProducts(filterParams));
  //   }
  // }, [paginate.next_page_url]);

  return (
    <section className="product-container">
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter />
        </div>
        <div className="col-md-9 mb-5">
          <CategoryWishProductList />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          <nav aria-label="navigation">
            <ul className="pagination">
              <li
                className={classes}
                onClick={() =>
                  paginateHandler("previous", paginate.prev_page_url)
                }
              >
                <a className="page-link">Previous</a>
              </li>
              {paginate.pages.map((_, i) => (
                <li
                  key={i}
                  onClick={() =>
                    paginateHandler(
                      "linier",
                      `${Base_Url}get-items?page=${i + 1}`
                    )
                  }
                  className="page-item"
                >
                  <a className="page-link">{i + 1}</a>
                </li>
              ))}
              <li
                onClick={() => paginateHandler("next", paginate.next_page_url)}
                className={nextClasses}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CategoryWishProductContainer;
