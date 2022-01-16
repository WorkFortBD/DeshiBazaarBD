import React from "react";
import PropTypes from 'prop-types';
import ViewAll from "../ViewAll/ViewAll";
import ProductMainList from "../products/ProductMainList";
import LazyLoad from 'react-lazyload';

const ProductSection = ({ title, description = null, url = '', type = '', limit = 6, page = 'home', isSliding = false}) => {
  if(type === 'best-sold') {
    return null
  } else {
    return (
      <section className="container product-container">
          <div className="product-heading">
            <h2> 
              {title} 
            </h2>
            {
              description !== null && <p>{ description }</p>
            }
            <ViewAll type={type} />
          </div>
  
          <LazyLoad height={400} offset={50} once>
            <ProductMainList type={type} limit={limit} page={page} isSliding={isSliding} />
          </LazyLoad>
        </section>
    );
  }
};

ProductSection.propTypes = {
    title      : PropTypes.string,
    description: PropTypes.string,
    url        : PropTypes.string,
    type       : PropTypes.string,
    limit      : PropTypes.number,
    page       : PropTypes.string,
    isSliding  : PropTypes.bool
}

export default ProductSection;
