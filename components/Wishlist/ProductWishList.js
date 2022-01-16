import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileSideBar from "../myprofile/ProfileSideBar";
import PriceCalculation from "../products/partials/PriceCalculation.js";
import RemoveWishlist from "./RemoveWishlist.js";
import Translate from "../translation/Translate.js";
import { productImageUrl } from '../../services/ProductService';
import classNames from 'classnames';

const ProductWishList = () => {
	const { wishList } = useSelector((state) => state.wishlist);
	const classes = classNames({
		'card-body': true,
		'p-0': wishList.length > 1,
		'p-2': wishList.length === 0
	})

	return (
		<>
			<div className="container ">
				<div className="row">
					<div className="col-md-3 d-none d-md-block">
						<ProfileSideBar />
					</div>

					<div className="col-md-8 mt-3">
						<div className="user_profile_setting_body">
							<div className="card mb-4">
								<div className="card-header bg-white">
									<h5 className="card-title m-0">
										<Translate> My Wishlist </Translate>
									</h5>
								</div>
								<div className={classes}>

									{wishList.length > 0 && wishList.map((item, index) => (
										<div className={wishList.length === index + 1 ? '' : 'border-bottom'} key={index}>
											<div className="px-1 py-3">
												<div className="row">
													<div className="wishlist_product col-md-3 col-12 text-center">
														<img className="img-fluid p-2" style={{ maxHeight: 100 }} src={productImageUrl(item.featured_image)} />
													</div>

													<div className="wishlist_list_product_details col-md-8 col-12 d-flex align-items-center justify-content-center justify-content-md-start" >
														<div>
															<h5 className="product_name">{item.name}</h5>
															<div className="h3 product_price">
																<PriceCalculation item={item} />
															</div>
														</div>
														<div className="wishlist_wishIcon pointer mt-3 ml-4 align-self-start">
															<RemoveWishlist productId={item.item_id} />
														</div>
													</div>
												</div>
											</div>
										</div>
									)
									)}

									{
										!wishList.length &&
										<>
											<p className="text-danger">
												No item found in wishlist !
											</p>

											<Link href="/">
												<a href="/" className="btn btn-danger btn-sm">
													View Products
												</a>
											</Link>
										</>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductWishList;