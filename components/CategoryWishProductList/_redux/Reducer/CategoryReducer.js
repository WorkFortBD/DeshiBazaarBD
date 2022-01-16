import * as Types from "../Type/Types";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  categoryBrandDetails: {
    isLoading: false,
    name: "",
    test: "",
    banner_url: "",
    childs: []
  },
  filterParams: {
    type: "",
    search: "",
    category: [],
    brand: [],
    min_price: null,
    max_price: null,
    attributes: null,
    rating: null,
    order_by: "",
    seller_id: "",
    order: "",
    page: 1,
    paginate_no: 40,
  },
  paginate: {
    pages: [],
    current_page: null,
    first_page_url: null,
    from: null,
    last_page: null,
    last_page_url: null,
    next_page_url: null,
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  },
  isLoading: false,
  error: false,
};

const CategoryWiseProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_CATEGORIES:
      return {
        ...state,
        categories: payload.data
      };

    case Types.INIT_PRODUCT_LIST:
      return {
        ...state,
        isLoading: true,
      };

    case Types.GET_CATEGORY_OR_BRAND_DETAILS:
      return {
        ...state,
        categoryBrandDetails: {
          ...state.categoryBrandDetails,
          isLoading: payload.loading,
          name: payload.data.name,
          banner_url: payload.data.banner_url,
          childs: payload.data.childs
        }
      };

    case Types.GET_FILTER_PRODUCT_LIST:
      const totalPage_ = Math.ceil(payload.data.total / payload.data.per_page);

      return {
        ...state,
        isLoading: payload.isLoading,
        error: false,
        products: payload.data.data,
        paginate: {
          ...state.paginate,
          pages: [...new Array(totalPage_)],
          current_page: payload.data.current_page,
          first_page_url: payload.data.first_page_url,
          from: payload.data.from,
          last_page: payload.data.last_page,
          last_page_url: payload.data.last_page_url,
          next_page_url: payload.data.next_page_url,
          per_page: payload.data.per_page,
          prev_page_url: payload.data.prev_page_url,
          to: payload.data.to,
          total: payload.data.total,
        },
      };

    case Types.GET_FILTER_PRODUCT_LIST_FAILED:
      return {
        ...state,
        error: true,
        isLoading: false,
      };

    case Types.INIT_FILTER_PRODUCT_LIST:
      return {
        ...state,
        isLoading: true,
      };
      
    case Types.SET_FILTER_PARAM:
      return {
        ...state,
        filterParams: payload,
      };

    case Types.RESET_FILTER_PARAM:
      return {
        ...state,
        products: [],
        categories: [],
        brands: [],
        filterParams: {
          ...state.filterParams,
          type: "",
          search: "",
          category: [],
          // category: [],
          brand: [],
          min_price: null,
          max_price: null,
          attributes: null,
          rating: null,
          order_by: "",
          seller_id: "",
          order: "",
          paginate_no: 40,
        },
        categoryBrandDetails: {
          isLoading: false,
          name: "",
          banner_url: "",
          childs: []
        }
      };

    case Types.GET_SUB_CATEGORY:
      return {
        ...state,
        categories: payload ? payload : []
      }

    case Types.GET_CATEGORY_RELATED_BRANDS:
      return {
        ...state,
        brands: payload ? payload : []
      }

    default:
      return state;
  }
}
export default CategoryWiseProductReducer;
