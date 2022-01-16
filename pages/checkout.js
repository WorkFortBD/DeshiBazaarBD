import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// local import
import ShippingInfo from "../components/ShippingInfo/ShippingInfo";
import CheckoutPaymentMethod from "../components/ShippingInfo/CheckoutPaymentMethod";
import OrderSummery from "../components/orders/OrderSummery";
import CartProduct from "../components/carts/cart-product/CartProduct";
import DeliveryInfo from '../components/Delivery/DeliveryInfo';
import { getCartsAction } from "../components/carts/_redux/action/CartAction";
import { handleShippingCost, createOrder } from "../components/orders/_redux/action/OrderAction";
import withProtectedRoute from "../components/master/hoc/withProtectedRoute";
import { useRouter } from 'next/router';
import AddressBook from "../components/ProfileAccountSetting/AddressBook";
import { getAddress } from "../components/ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction";
import { loading } from "../components/master/loading/loading";
import { showToast } from "../components/master/Helper/ToastHelper";


const Checkout = ()=> {
	const router 							  							= useRouter();
	const dispatch                             							= useDispatch();
	const { customerInfo }                     							= useSelector((state) => state.orderDelivery);
	const { couponData, shippingCost, coupon } 							= useSelector((state) => state.order);
	const { carts, totalPrice, totalQuantity } 							= useSelector((state) => state.cart);
	const { userData } 													= useSelector((state) => state.user);
	const { billingAddress, shippingAddress, userInputData, isLoading } = useSelector(state => state.userProfile);

	useEffect(() => {
		dispatch(getCartsAction());
		dispatch(handleShippingCost(carts));

		dispatch(getAddress('billing_address', userData.id));
        dispatch(getAddress('shipping_address', userData.id));
	}, []);

	const handleStoreOrder = () => {
		if (couponData !== null) {
			couponData.code = coupon.code; // Append code in couponData for backend processing
		}

		if(totalPrice < 300) {
			showToast('error', 'The minimum order amount is 300Taka');
			return;
		}

		if((shippingAddress && shippingAddress.length === 0)) {
			showToast('error', 'Please add delivery information');
			return; // @todo add toast message
		}

		dispatch(createOrder(customerInfo, carts, totalQuantity, shippingCost, totalPrice, couponData, userData));
		// router.push('/');
	}

	if(carts.length <= 0) {
		router.push('/');
		return null
	}

	let deliveryInfo = (
		<div>
			{ loading() }
		</div>
	)

    if(!isLoading && (billingAddress && billingAddress.length > 0) || (shippingAddress && shippingAddress.length > 0)) {
		deliveryInfo = (
			<AddressBook
				billingAddress={billingAddress} 
				shippingAddress={shippingAddress} 
				userInputData={userInputData} 
				isLoading={isLoading}
			/>
		)
    }

	if(!isLoading && (billingAddress && billingAddress.length === 0) && (shippingAddress && shippingAddress.length === 0)) {
		deliveryInfo = <DeliveryInfo  />
	}

	return (
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-7">
						<div className="delivery_info mb-3 mt-5">
							{
								deliveryInfo
							}
							{/* <div className="card mt-3 pl-3 pr-3 pt-2 shadow-sm">
								<div className="d-flex justify-content-between align-items-center">
									<p className="deliver_content">{carts.length} Items</p>
									<p className="deliver_content">Price</p>
									<p className="deliver_content">Quantity</p>
								</div>
							</div> */}

							<div className="p-3 mt-3 card shadow-sm">
								{
									carts.length > 0 && carts.map((item, index) => (
										<div className="cart_items_details py-3" key={index + 1}>
											<CartProduct cart={item} checkoutPage={true} />
										</div>
									))
								}
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-5 cart_checkout_margin">
						{/* <ShippingInfo /> */}
						<CheckoutPaymentMethod />
						<OrderSummery handleClick={() => handleStoreOrder()} buttonText="CONFIRM ORDER" />
					</div>
				</div>
			</div>
	);
}
// export default ProtectedRoute(Checkout);
export default withProtectedRoute(Checkout);
