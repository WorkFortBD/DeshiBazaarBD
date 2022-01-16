import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopList } from "./_redux/Action/ShopAction";
import { useRouter } from "next/router";
import LoadingPlaceHolder from "../master/skelleton/LoadingPlaceholder";

const ShopList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ShopList, isLoading } = useSelector((state) => state.shop);

  const routeHandler = (item) => {
    router
      .push(`/products?brand=${item.slug}&name=${item.name}`)
      .then((_) => window.scrollTo(0, 0));
  };

  useEffect(() => {
    if(ShopList.length === 0) {
      dispatch(getShopList());
    }
  }, []);

  return (
    <div className="productList-body p-3">
      <div className="row">
        {
          isLoading && (
            <LoadingPlaceHolder className="col-4 col-md-2 col-lg-2" count={18} height={90} />
          )
        }

        {ShopList.length > 0 &&
          ShopList.slice(0, 18).map((item, index) => (
            <div className="col-4 col-md-2 col-lg-2" key={index}>
              <div className="shop-card" onClick={() => routeHandler(item)}>
                {item.image !== null && item.image !== "" ? (
                  <div className="shop-logo">
                    <img src={item.image_url} alt={item.name} />
                  </div>
                ) : (
                  <div className="shop-logo">{item.name}</div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopList;
