import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from '../../../services/currency';
import { toggleFloatingCart } from "../../../_redux/store/action/globalAction";
import { getCartsAction } from "../_redux/action/CartAction";
import styles from  './FloatingCartButton.module.scss';
import { useRouter } from 'next/router';
import NavLink from '../../master/NavLink/NavLink';

import Cart from '../../../public/images/navigation/cart.svg';
import Home from '../../../public/images/navigation/home.svg';
import Heart from '../../../public/images/navigation/heart.svg';
import Profile from '../../../public/images/navigation/profile.svg';

const FloatingCartButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { totalQuantity, totalPrice } = useSelector(state => state.cart);
    const { wishList } = useSelector((state) => state.wishlist);
    // const { isMobile } = useSelector(state => state.global);

    const flashDealBtnHandler = () => {
        dispatch(toggleFloatingCart());
    };

    const currentRoute =  router.route && router.route.split('/')[1];
    let style = {};
    if(currentRoute === 'login' || currentRoute === 'register' || currentRoute === 'user') [
        style.display = 'none'
    ]

    useEffect(() => {
        dispatch(getCartsAction())
    }, []);

    let fixedCartPrice = (
        <>
            <button onClick={flashDealBtnHandler} className="flashDealButton d-flex flex-column align-items-center pointer" style={style}>
                <div className="fixed-cart-items">
                    <span>
                        <i style={{fontSize: '18px'}} className="fas fa-shopping-bag"></i>
                    </span>
                    <span className={styles.color}>
                        {totalQuantity} items
                    </span>
                </div>
                <div className="fixed-cart-price d-flex justify-content-center align-item-center">
                    <span>
                        {formatCurrency(totalPrice)}
                    </span>
                </div>
            </button>
            <div className={styles.fixedCart} style={style} >
                <div className={styles.fixedCartInner}>
                    <div className={styles.fixedCartIconBox}>
                        <NavLink className="bottom-navigation" href="/" exact>
                            <div>
                                <Home />
                            </div>
                        </NavLink>
                    </div>
                    <div className={styles.fixedCartIconBox}>
                        <NavLink className="bottom-navigation" href="/wishlist" exact>
                            <div style={{position: 'relative'}}>
                                <div className="bottom-navigation__cart-qty-container">
                                    <span className="bottom-navigation__cart-qty">{wishList.length}</span>
                                </div>
                                <Heart />
                            </div>                
                        </NavLink>
                    </div>
                    <div className={styles.fixedCartIconBox}>
                        <NavLink className="bottom-navigation" href="/carts" exact>
                            <div style={{position: 'relative'}}>
                                <div className="bottom-navigation__cart-qty-container">
                                    <span className="bottom-navigation__cart-qty">{totalQuantity}</span>
                                </div>
                                <Cart />
                            </div>
                        </NavLink>
                    </div>
                    <div className={styles.fixedCartIconBox}>
                        <NavLink className="bottom-navigation" href="/profile">
                            <div>
                                <Profile />
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );

    return fixedCartPrice;
}

export default FloatingCartButton;