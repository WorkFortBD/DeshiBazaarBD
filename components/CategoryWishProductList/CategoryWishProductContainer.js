import React, {useState, useEffect} from "react";
import ProductFilter from "./ProductFilter";
import CategoryWishProductList from "./CategoryWishProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryOrBrandDetails,
  getFilteredProducts,
  getSubCategories,
  resetFilterParams,
  setFilterParams,
} from "./_redux/action/CategoryAction";
import {useRouter} from 'next/router'
import Image from 'next/image';
import Modal from "../master/Modal/Modal";
import Axios from 'axios'
import Paginate from "../master/paginate/Paginate";
import ImageWithFallback from '../master/Image/Image';
import Link from 'next/link';
import { parseFilterString, parseUri } from "../../helper/parse-filter-query";

const CategoryWishProductContainer = ({ isMainCategory, subCategories, mainCategoryBanner }) => {
  const [showFilter, setShowFilter]              = useState(false);
  const [currentPage, setCurrentPage]            = useState(1);
  const [filterParams, setFilterParamsFromQuery] = useState(null);
  const dispatch                                 = useDispatch();
  const router                                   = useRouter();
  const {type: typeQuery = "", name = ""}        = router.query;
  const { paginate, categoryBrandDetails, isLoading } = useSelector((state) => state.category);

  const paginateHandler = (page) => {
    if (!page) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    router.replace({
      query: parseFilterString(router.query, {page: page.selected + 1})
    })
  };

  const getImgSrc = () => {
    let src = categoryBrandDetails?.banner_url ?? "";

    if(isMainCategory) {
      src = mainCategoryBanner;
    }

    if(typeQuery === 'haat-bazaar') {
      src = '/images/campaign/haatbazaar-banner.jpg';
    }

    if(typeQuery === 'super-sale') {
      src = '/images/campaign/super-sale.jpg';
    }

    if(typeQuery === 'masher-bazaar') {
      src = '/images/campaign/masher-bazaar-banner.jpg';
    }

    return src;
  }

  useEffect(() => {
    const source = Axios.CancelToken.source();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after mount
    const {filterParam, finalUriObj} = parseUri(router.query);

    const currentPage = finalUriObj['page'] || 1;

    setCurrentPage(currentPage);
    setFilterParamsFromQuery(finalUriObj);

    dispatch(getFilteredProducts(filterParam, source));

    const category = router.query?.['category'] || null;

    dispatch(getSubCategories(category));

    const cloneQueries = { ...finalUriObj };

    if(router.query?.['category']) {
      dispatch(getCategoryOrBrandDetails('categories/' + router.query?.['category']));
    }

    if(router.query?.['brand']) {
      dispatch(getCategoryOrBrandDetails('brands/' + router.query?.['brand']));
    }

    cloneQueries['category'] = [null, cloneQueries?.['category']] || [];
    cloneQueries['brand']    = cloneQueries?.['brand']?.split?.(',') || [];

    dispatch(setFilterParams(cloneQueries));

    return () => {
      source.cancel()
    }
  }, [JSON.stringify(router.query)]);

  useEffect(() => {
    return () => {
      dispatch(resetFilterParams(filterParams))
    }
  }, [])

  return (
    <>
      <Modal
        visible={showFilter}
        closeModalHandler={() => setShowFilter(preState => !preState)}
        sideModal={true}
      >
        <ProductFilter show={true} />
      </Modal>

      <section className="pt-2 pt-md-4">
        {
          (categoryBrandDetails.banner_url || typeQuery === 'masher-bazaar' || typeQuery === 'haat-bazaar' || typeQuery === 'super-sale' || isMainCategory) && (
              <div className="banner mb-md-2 px-1 px-md-3">
                <div className="banner-photo-box">
                  <Image src={getImgSrc()} width={1260} height={280} />
                </div>
              </div>
          )
        }

        {
          isMainCategory && (
            <div className="pl-1 pl-md-3 mt-3 main-category-title">
              <span className="font-weight-600">
                {name}
              </span>
            </div>
          )
        }
        <div className={`row ${isMainCategory ? 'my-4' : ''}`}>
          {
            isMainCategory &&
            subCategories?.map?.((item, index) => {
              return (
                <div className="col-lg-3 col-md-4 col-6 py-2 py-md-3 px-3 px-md-3 pb-3 m-0 mb-md-3" key={index}>
                  <div className="pointer">
                    <Link href={`/products?category=${encodeURIComponent(item.short_code)}&name=${encodeURIComponent(item.name)}&filter=paginate_no__40`}>
                      <a>
                        <div className="text-center">
                          <ImageWithFallback width={400} height={280} src={item?.image_url} alt={item?.name} />
                          <span className="d-inline-block pt-2 color-secondary color-main-hover font-15 font-weight-500">
                            {
                              item?.name
                            }
                          </span>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })
          }
          {
            !isMainCategory &&
            <div className="col-md-12 mb-5 px-0" style={{fontSize: '14px'}}>
              <CategoryWishProductList filterParams={filterParams} showFilter={showFilter} showFilterHandler={() => setShowFilter(preState => !preState)} />
              {
                !isLoading && paginate.total > paginate.per_page  && (
                  <>
                    <Paginate
                      pageCount={paginate.pages.length}
                      onPageChange={paginateHandler}
                      currentPage={currentPage}
                      perPage={paginate.per_page}
                      totalItemCount={paginate.total}
                    />
                  </>
                )
              }
            </div>
          }
        </div>
      </section>
    </>
  );
};

export default CategoryWishProductContainer;