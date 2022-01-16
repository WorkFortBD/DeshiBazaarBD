import React from 'react';
import { formatCurrency } from '../../../services/currency';
import { productHasOffer } from '../../../services/ProductService';

const PriceCalculation = ({ item }) => {
    const { is_offer_enable: isOfferEnable, offer_selling_price, default_selling_price } = item;

    const sellingPrice = default_selling_price;
    const offerPrice = offer_selling_price;

    const is_offer_enable  = productHasOffer(sellingPrice, offerPrice, isOfferEnable);
    const selling_price    = ( typeof sellingPrice !== 'undefined' && sellingPrice !== null ) ? sellingPrice : 0;
    const default_price    = ( is_offer_enable && offerPrice != 0 && offerPrice !== null ) ? offerPrice: selling_price;
    const offer_price      = ( is_offer_enable && offerPrice != 0 && offerPrice !== null) ? offerPrice: 0;
    const discount_percent = ( ( selling_price - offer_price ) * 100 ) / selling_price;

    const discount = '' +  Math.round( discount_percent * 1e2 ) / 1e2; // return 2 digit after point. haven't use toFixed cause toFixed return String value

    return (
        <div className="price-area">
            <p className="active-price">
                { formatCurrency(floorNum(default_price)) }
            </p>

            {
                (is_offer_enable && offer_price !== 0) &&
                <p className="inactive-price">
                    <del>{ formatCurrency(floorNum(selling_price)) }</del>
                    &nbsp;
                    <span className="discount-percent">
                        -{discount}%
                    </span>
                </p>
            }
        </div>
    );
}

const floorNum = (val) => Math.floor(val)

export default PriceCalculation;