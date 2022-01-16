import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductNoFound from "../master/productNoFound/ProductNoFound";
import ProductSingleMini from "../products/ProductSingleMini";

const CategoryWiseMiniProduct = ({ columns }) => {
  const { products } = useSelector((state) => state.category);
  const [cardClassName, setCardClassName] = useState('product-card categories_wise_product_card shadow-sm mb-sm-2 mb-md-3 bg-white rounded');

  // useEffect(() => {
  //   if (columns == "col-md-3") {
  //     setCardClassName(`${cardClassName} filter_column_3`);
  //   } else {
  //     setCardClassName(`${cardClassName} filter_column_10`);
  //   }
  // }, []);

  return (
    <>
      {
        products.length === 0 && (
          <div className="col-lg-12">
            <ProductNoFound />
          </div>
        )
      }
      {products.length > 0 &&
        products.map((item, index) => (
          <ProductSingleMini
            item={item}
            key={index}
            columnClassName={columns}
            cardClassName={cardClassName}
          />
        ))}
    </>
  );
};

export default CategoryWiseMiniProduct;
