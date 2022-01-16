import * as Types from "../Type/Types";

export interface IHeaderReducer {
  isLoading: boolean;
}

const initialState = {
  menuList: [],
};

export default function HeaderReducer(state = initialState, { type, payload }) {
  switch (type) {
    case Types.INIT_MENU_LIST:
      return {
        ...state,
        ...payload,
      };

    case Types.GET_MENU_LIST:
      return {
        ...state,
        ...payload,
      };

    case Types.FETCH_MENU_LIST_FAILED:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
