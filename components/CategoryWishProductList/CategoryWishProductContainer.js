import React, {useState} from "react";
import Link from 'next/link'
import ProductFilter from "./ProductFilter";
import CategoryWishProductList from "./CategoryWishProductList";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterParams,
} from "./_redux/Action/CategoryWiseProductAction";


const CategoryWishProductContainer = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false)
  
  const { paginate, filterParams, categoryBrandDetails, isLoading } = useSelector(
    (state) => state.CategoryWiseProductReducer
  );

  const classes = classNames({
    "page-item product-page-item": true,
    disabled: !paginate.prev_page_url,
  });

  const nextClasses = classNames({
    "page-item product-page-item": true,
    disabled: !paginate.next_page_url,
  });

  const paginateHandler = (direction, pageUrl) => {
    if (!pageUrl) return;

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
      {
        categoryBrandDetails.banner_url && (
            <div className="banner">
              <div className="banner-photo-box">
                <img src={categoryBrandDetails.banner_url} alt="" />
              </div>
            </div>
        )
      }
      {
        categoryBrandDetails.childs.length > 0 && (
          <div className="childs row justify-content-start">
            {
              categoryBrandDetails.childs.map((item, index) => (
                <div className="col-6 col-md-2 col-sm-3 mb-sm-2 mb-1" key={index}>
                  <Link href={`products?${item.parent_id ? 'category' : 'brand'}=${item.id}`}>
                    <a className="child-logo-box">
                    <span>{item.name}</span>
                    </a>
                  </Link>
                </div>
              ))
            }
          </div>
        )
      }
      <div className="row">
        <div className="col-md-3">
            <ProductFilter show={showFilter} />
        </div>
        <div className="col-md-9 mb-5">
          <CategoryWishProductList showFilter={showFilter} showFilterHandler={() => setShowFilter(preState => !preState)} />
          {
            !isLoading && paginate.total > 20  && (
              <div className="w-100">
                <nav className="d-flex justify-content-end" aria-label="navigation">
                  <ul className="pagination">
                    <li
                      className={classes}
                      onClick={() =>
                        paginateHandler("previous", paginate.prev_page_url)
                      }
                    >
                      <a className="page-link">Previous</a>
                    </li>
                    {/* {paginate.pages.map((_, i) => ( */}
                      <li
                        // onClick={() =>
                        //   paginateHandler(
                        //     "linier",
                        //     `${Base_Url}get-items?page=${i + 1}`
                        //   )
                        // }
                        // className={`page-item product-page-item ${paginate.current_page == i + 1 && 'active'}`}
                        className={`page-item product-page-item`}
                      >
                        <a className="page-link">{paginate.current_page}</a>
                      </li>
                    {/* ))} */}
                    <li
                      onClick={() => paginateHandler("next", paginate.next_page_url)}
                      className={nextClasses}
                    >
                      <a className="page-link">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            )
          }
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9">
        </div>
      </div> */}
    </section>
  );
};

export default CategoryWishProductContainer;
