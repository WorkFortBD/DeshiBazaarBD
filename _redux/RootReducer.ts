import { combineReducers } from "redux";

import GlobalReducer, { IGlobalReducer } from "./store/reducer/GlobalReducer";
import HeaderReducer, { IHeaderReducer } from "../components/Header/_redux/HeaderReducer/HeaderReducer";
import CategoryReducer from "../components/CategoryWishProductList/_redux/Reducer/CategoryReducer";
import CompanyPolicyReducer from "../components/CompanyPolicy/_redux/Reducer/CompanyPolicyReducer";
import DealFlashReducer from "../components/DealFlash/_redux/Reducer/DealFlashReducer";
import HomeBannerCarouselReducer from "../components/homeBannerCarousel/_redux/homeBannerCarouselReducer/HomeBannerCarouselReducer";
import ProductTopListReducer from "../components/ProductTopList/_redux/Reducer/ProductTopListReducer";
import ShopReducer from "../components/Shop/_redux/Reducer/ShopReducer";
import StoreReducer from "../components/store/_redux/reducer/store-reducer";
import AuthReducer from "../components/LoginRegistration/_redux/Reducer/AuthReducer";
import UserDataReducer from "../components/_redux/getUserData/Reducer/UserDataReducer";
import ProfileAccountSettingReducer from "../components/ProfileAccountSetting/_redux/Reducer/ProfileAccountSettingReducer";
import WishlistReducer from "../components/Wishlist/_redux/Reducer/WishlistReducer";
import CartReducer from "../components/carts/_redux/reducer/CartReducer";
import SearchReducer from "../components/SearchInput/_redux/Reducer/SearchInputReducer";
import DeliveryInfoReducer from "../components/Delivery/_redux/Reducer/DeliveryInfoReducer";
import ProfileUpdateReducer from "../components/myprofile/_redux/Reducer/ProfileUpdateReducer";
import PaymentMethodReducer from "../components/PaymentMethod/_redux/Reducer/PaymentMethodReducer";
import ProductReducer from "../components/products/_redux/Reducer/ProductReducer";
import OrderReducer from "../components/orders/_redux/reducer/OrderReducer";
import ProductReviewReducer from "../components/product-review/_redux/reducer/productReviewReducer";
import ShippingInfoReducer from "../components/ShippingInfo/_redux/Reducer/ShippingInfoReducer";
import FooterReducer from "../components/Footer/_redux/Reducer/FooterReducer";
import ReviewReducer from "../components/product-review/_redux/reducer/productReviewReducer";
import ForgetPasswordReducer from "../components/forget-password/_redux/reducer/forget-password-reducer";
import StoreInfoReducer from "../components/store-info/_redux/reducer/store-info_reducer";
import NewOfferReducer from "../components/NewCollection/_redux/Reducer/new-offer-reducer";

/**
 * Reducer Interface definitions.
 *
 * @TODO: Need to implement interface for all of this reducers.
 */
export interface IRootReducer {
  global              : IGlobalReducer;
  header              : IHeaderReducer;
  sliders             : object;
  companyPolicy       : object;
  flashDeal           : object;
  offer               : object;

  shop                : object;
  store               : object;
  storeInfo           : object;

  auth                : object;
  user                : object;
  userProfile         : object;
  userAddress         : object;
  authForgetPassword  : object;

  wishlist            : object;
  cart                : object;

  category            : object;
  product             : object;
  productsTop         : object;
  productSearch       : object;
  productReview       : object;
  productReviewAnother: object;

  order               : object;
  orderDelivery       : object;
  OrderShipping       : object;

  paymentMethod       : object;
  footer              : object;
}

const reducers = {
  global              : GlobalReducer,
  header              : HeaderReducer,
  sliders             : HomeBannerCarouselReducer,
  companyPolicy       : CompanyPolicyReducer,
  flashDeal           : DealFlashReducer,
  offer               : NewOfferReducer,

  shop                : ShopReducer,
  store               : StoreReducer,
  storeInfo           : StoreInfoReducer,

  auth                : AuthReducer,
  authForgetPassword  : ForgetPasswordReducer,
  user                : UserDataReducer,
  userProfile         : ProfileAccountSettingReducer,
  userAddress         : ProfileUpdateReducer,

  wishlist            : WishlistReducer,
  cart                : CartReducer,

  category            : CategoryReducer,
  product             : ProductReducer,
  productsTop         : ProductTopListReducer,
  productSearch       : SearchReducer,
  productReview       : ProductReviewReducer,
  productReviewAnother: ReviewReducer,

  order               : OrderReducer,
  orderDelivery       : DeliveryInfoReducer,
  OrderShipping       : ShippingInfoReducer,

  paymentMethod       : PaymentMethodReducer,
  footer              : FooterReducer,
};

export default combineReducers(reducers);
