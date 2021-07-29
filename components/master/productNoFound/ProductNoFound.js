import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ProductNoFound = () => {
    return (
        <div className="search_product_no_found">
            <h4 className="product_no_found_title">no product found !</h4>
            <p className="product_no_found_description">We're sorry. We cannot find any matches for your search term.</p>
            <h1 className="display-1">
                <FontAwesomeIcon className="product_no_found_fontAwesome" icon={faSearch} />
            </h1>
        </div>
    );
};

export default ProductNoFound;