import Axios from "axios";
import * as Types from "../Type/Types";

export const getFilteredProducts = (filterParam, source = {token: ""}) => async (dispatch) => {
  let filterParamObjClone;

  // if(filterParamObj.type || filterParamObj.search || filterParamObj.seller_id) {
  //   filterParamObjClone = {
  //     ...filterParamObj,
  //     category: filterParamObj.category[filterParamObj.category.length -1],
  //     brand: filterParamObj.brand.join(","),
  //   };
  // } else {
  //   filterParamObjClone = {
  //     ...filterParamObj,
  //     category: filterParamObj.category.length > 1 ? filterParamObj.category.slice(1).join(",") : filterParamObj.category.join(","),
  //     brand: filterParamObj.brand.join(","),
  //   };
  // }

  // const filterParam = Object.keys(filterParamObjClone)
  //   .filter((item) => filterParamObjClone[item])
  //   .map((item) =>{
  //     return `${item}=${encodeURIComponent(filterParamObjClone[item])}`
  //   })
  //   .join("&");

  const responseData = {
    data: [],
    isLoading: true,
  };

  try {
    dispatch({ type: Types.INIT_FILTER_PRODUCT_LIST });
    const res = await Axios.get(`get-items?${filterParam}`, {cancelToken: source.token});
    responseData.isLoading = false;
    responseData.data = res.data.data;
    dispatch({ type: Types.GET_FILTER_PRODUCT_LIST, payload: responseData });
  } catch (error) {
    if(Axios.isCancel(error)) {
    } else {
      dispatch({ type: Types.GET_FILTER_PRODUCT_LIST_FAILED });
    }
  }
};

export const getProductsBySellerId = (id) => async dispatch => {
  const responseData = {
    data: [],
    isLoading: true,
  };
  const url = `get-items?seller_id=${id}`
  
  try {
    dispatch({ type: Types.INIT_FILTER_PRODUCT_LIST });
    const res = await Axios.get(url);
    responseData.isLoading = false;
    responseData.data = res.data.data;
    dispatch({ type: Types.GET_FILTER_PRODUCT_LIST, payload: responseData });
  } catch (error) {
      dispatch({ type: Types.GET_FILTER_PRODUCT_LIST_FAILED });
  }
}

export const getCategoryOrBrandDetails = (endPoint) => async (dispatch) => {
  const url = endPoint
  let response = {
    loading: true,
    data: {
      name: "",
      banner_url: "",
      childs: []
    }
  }

  try {
    dispatch({type: Types.GET_CATEGORY_OR_BRAND_DETAILS, payload: response})

    const res = await Axios.get(url);
    response.loading = false;
    response.data.banner_url = res.data.data.banner_url;
    response.data.name = res.data.data.name;
    if(endPoint.includes('categories')) {
      response.data.childs = res.data.data.childs.length > 5 ? res.data.data.childs.slice(0, 5) : res.data.data.childs
    }

    dispatch({type: Types.GET_CATEGORY_OR_BRAND_DETAILS, payload: response})
  } catch (err) {
    // console.log('err => ', err)
  }
}

export const setFilterParams = (filterParams) => ({
  type: Types.SET_FILTER_PARAM,
  payload: filterParams,
});

export const resetFilterParams = (filterParams) => ({
  type: Types.RESET_FILTER_PARAM,
  payload: {filterParams: filterParams}
});

export const getSubCategories = (parentId) => async dispatch => {
  dispatch(getCategoryRelatedBrands(parentId));

  let url;
  if(parentId) {
    url = 'categories/' + parentId;
  } else {
    url = 'categories?parent_id=null';
  }

  try {
    const res = await Axios.get(url);
    if(parentId) {
      dispatch({type: Types.GET_SUB_CATEGORY, payload: res.data && res.data.data && res.data.data.childs})
    } else {
      dispatch({type: Types.GET_SUB_CATEGORY, payload: res.data && res.data.data})
    }
  } catch (err) {
    // console.log('err => ', err)
  }
};

export const getCategoryRelatedBrands = (categoryId) => async dispatch => {
  const url = `categories/${categoryId}?with_brands=1`;
  try {
    const res = await Axios.get(url)
    dispatch({type: Types.GET_CATEGORY_RELATED_BRANDS, payload: res.data && res.data.data && res.data.data.brands});
  } catch (error) {
    // console.log('err => ', error)
  }
} 
