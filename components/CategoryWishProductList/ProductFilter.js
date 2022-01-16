import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryRelatedBrands,
  setFilterParams,
} from "./_redux/action/CategoryAction";
import ReactStars from "react-rating-stars-component";
import { activeCurrency } from "../../services/currency";
import { useRouter } from 'next/router';
import { parseFilterString } from "../../helper/parse-filter-query";

const ProductFilter = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { filterParams, categories, brands } = useSelector((state) => state.category);

  const [value, setValue] = useState({ min: 100, max: 90000 });
  const [isChecked, setIsChecked] = useState(false);

  const categoryCheckboxes = useRef([]);
  const brandCheckboxes = useRef([]);


  // checkbox handler
  const handleChecked = (e, category) => {
    // uncheck other checkbox

    categoryCheckboxes.current.forEach(checkbox => {
      if(checkbox.checked && checkbox.id !== category.short_code) {
        checkbox.checked = false
      }
    })

    // remove brands check-box after changed category
    brandCheckboxes.current.forEach(checkbox => {
      if(checkbox?.checked !== undefined) {
        checkbox.checked = false;
      }
    })

    const filterParamClone = { ...filterParams };

    if(router.query?.['type'] || router.query?.['search'] || router.query?.['seller_id']) {
      filterParamClone.brand = [];
      filterParamClone.category.push(category.short_code);

      if(!e.target.checked) {
        filterParamClone.category = [];
        filterParamClone.brand = [];
        
        dispatch(getCategoryRelatedBrands(null));
      }

      if(e.target.checked) {
        dispatch(getCategoryRelatedBrands(category.short_code));
      }

      dispatch(setFilterParams(filterParamClone));
    }

    const cloneQueries = {...router.query};
    if(cloneQueries?.category) {
      delete cloneQueries.brand;
    }

    if (e.target.checked) {
      filterParamClone.category[1] = category.short_code;
      router.replace({
        query: parseFilterString(cloneQueries, {category: category.short_code})
      })
    } else {
      router.replace({
        query: parseFilterString(cloneQueries, {category: cloneQueries?.['category'] || ""})
      });
      filterParamClone.category.splice(1, 1);
    }
    
    dispatch(setFilterParams(filterParamClone));
  };

  // checkbox handler
  const brandCheckboxHandler = (e, brand) => {
    const filterParamClone = { ...filterParams };
    // conditionally insert and remove brand id from brand array

    filterParamClone.page = 1;

    if (e.target.checked) {
      filterParamClone.brand.push(brand.slug);

      router.replace({
        query: {
          ...router.query,
          brand: router.query.brand ? router.query.brand + ',' + brand.slug : brand.slug
        }
      })
    } else {
      const updatedCategory = filterParamClone.brand.filter(
        (item) => item !== brand.slug
      ) || [];

      filterParamClone.brand = updatedCategory;
      
      // const cloneQuery = {...router.query};

      // if(router.query['brand'] === brand.slug) {
      //   delete cloneQuery.brand
      // }

      router.replace({
        query: {
          ...router.query,
          brand: updatedCategory.join(',')
        }
      })
    }

    dispatch(setFilterParams(filterParamClone));
  };

  // use debounce fn to prevent multiple api call at the same time
  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const debounceReturn = useCallback(
    debounce((newValue, filterParams) => {
      router.replace({
        query: parseFilterString(router.query, {max_price: newValue.max, min_price: newValue.min})
      })
    }, 500),
    []
  );

  const priceRangeHandler = (newValue) => {
    debounceReturn(newValue, filterParams);
    setValue(newValue);
  };

  const reactStarProps = {
    size: 20,
    count: 5,
    isHalf: false,
    value: 0,
    color: "#ddd",
    activeColor: '#ffd700',
    onChange: (newValue) => {
      router.replace({
        query: parseFilterString(router.query, {rating: newValue})
      })
    },
  };
  
  const resetRatingHandler = () => {
    router.replace({
      query: parseFilterString(router.query, {rating: ""})
    })

    // dispatch(setFilterParams(filterParamClone));
  }

  useEffect(() => {
    brandCheckboxes.current.forEach((brand, index) => {
      if(filterParams.brand.includes(brand.id)) {
        // brand.checked = true;
        brandCheckboxes.current[index].checked = true;
      }
    });

    for (let index = 0; index < categoryCheckboxes.current.length; index++) {
      if(filterParams.type || filterParams.search || filterParams.seller_id) {
        if(filterParams.category[filterParams.category.length - 1] == categoryCheckboxes.current[index].id) {
          categoryCheckboxes.current[index].checked = true;
          break;
        }
      } else {
        if(filterParams.category.length > 1 && filterParams.category[1] == categoryCheckboxes.current[index].id) {
          categoryCheckboxes.current[index].checked = true;
          break;
        }
      }

    }
  }, [])

  return (
    <section className="w-100 product_filter_section modal-scrollbar bg-white" >
      <h3 className="product_filter_heading">Filter Products</h3>

      {/**filter by price range */}
      <div className="filter_by_price_range">
        <p className="filter_title">By Price</p>
        <div className="price_range">
          <InputRange
            maxValue={99999}
            formatLabel={(value) => `${activeCurrency('sign')}${value}`}
            minValue={0}
            value={value}
            onChange={priceRangeHandler}
          />
        </div>
      </div>

      <div>
        <p className="filter_title">By Rating</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <ReactStars {...reactStarProps} />
          <span style={{cursor: 'pointer', fontSize: 12, color: 'var(--color-primary)'}} onClick={resetRatingHandler}>Clear</span>
        </div>
      </div>

      {/**filter by categories */}
      {
        categories.length > 0 && (
          <div className="filter_by_category">
            <p className="filter_title">By Category</p>
            {categories.map((item, index) => (
              <Form.Group key={item.id} controlId={item.short_code}>
                <Form.Check
                  ref={checkbox => categoryCheckboxes.current[index] = checkbox}
                  type="checkbox"
                  label={item.name}
                  datatype={item.short_code}
                  className={
                    isChecked == true ? "active_category pointer" : "isNot_active_category pointer"
                  }
                  onChange={(e) => handleChecked(e, item)}
                />
              </Form.Group>
            ))}
          </div>
        )
      }

      {/**filter by categories */}
      {
        brands.length > 0 &&
        <div className="filter_by_category" style={{marginTop: '40px'}}>
          <p className="filter_title">Brand</p>
          {brands.map((item, index) => (
            <Form.Group key={item.slug} controlId={item.slug}>
              <Form.Check
                ref={checkbox => brandCheckboxes.current[index] = checkbox}
                type="checkbox"
                label={item.name}
                datatype={item.slug}
                className={
                  isChecked == true ? "active_category pointer" : "isNot_active_category pointer"
                }
                onChange={(e) => brandCheckboxHandler(e, item)}
              />
            </Form.Group>
          ))}
        </div>
      }

    </section>
  );
};

export default ProductFilter;
