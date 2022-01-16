import React, { memo, useEffect } from "react";
import { useRouter } from "next/router";
import Translate from "../translation/Translate";
import Image from 'next/image';
// import { useDispatch, useSelector } from "react-redux";
// import { getCategories } from "../CategoryWishProductList/_redux/action/CategoryWiseProductAction";
// import LoadingPlaceHolder from "../master/skelleton/LoadingPlaceholder";

const CategoryList = ({ parentID = null, homepageCategories }) => {
  const router = useRouter();

  // const dispatch = useDispatch();
  // const { categories, isLoading } = useSelector((state) => state.category);

  // useEffect(() => {
  //   if (!categories.length) {
  //     if (parentID === "all") {
  //       dispatch(getCategories(parentID, null, "")); // Get the all categories
  //     } else {
  //       dispatch(getCategories(parentID, 12, "homepage")); // Get the 12 categories
  //     }
  //   }
  // }, []);

  /**
   * Navigate to Category List page.
   *
   * @param string categorySlug
   *
   * @return void
   */
  const navigateCategoryList = (item) => {
    let categoryType = "";

    if(item.short_code === 'groceries') {
      categoryType =  'main-category';
    } else {
      categoryType = 'category';
    }

    router
      .push(`/products?${categoryType}=${encodeURIComponent(item.short_code)}&name=${encodeURIComponent(item.name)}&filter=paginate_no__40`)
      .then((_) => window.scrollTo(0, 0));
  };

  return (
    <div className="category-list">
      <div className="row">
          {/* {
            isLoading && (
              <LoadingPlaceHolder className="col-lg-2 col-md-3 col-sm-4 col-6" count={12} height={150} />
            )
          } */}

          {homepageCategories && homepageCategories.length > 0 &&
            homepageCategories.map((item, index) => (
              <div key={index} className={`category pointer col-lg-2 col-md-3 col-sm-4 col-6 pr-sm-2 pl-sm-2 ${index % 2 === 0 ? 'pr-1 pl-0' : 'pl-1 pr-0'}`}>
                <div onClick={() => navigateCategoryList(item)} className="shadow-sm text-center" style={{background: '#fff', padding: '10px', margin: '10px 0px'}}>
                  {/* <img style={{width: '100%'}} src={`${process.env.NEXT_PUBLIC_URL}images/categories/${item.image}`} alt={translate(item.name)} /> */}
                  <Image src={`${process.env.NEXT_PUBLIC_URL}images/categories/${item.image}`} alt={item.name} width={175} height={175} />
                  <p className="category__category-title" style={{ textAlign: 'center', fontSize: '14px', fontWeight: '500', paddingTop: '10px', margin: '0px'}}>
                    <Translate>{item.name}</Translate>
                  </p>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default memo(CategoryList);
