import React from 'react';
import Parser from 'html-react-parser';

const ProductDetailsDescription = ({ product }) => {
    
    return (
        <div className="product_description">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <p className="product_details_description">
                            {
                                Parser(product.description)
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsDescription;