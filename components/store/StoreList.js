import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredStoreList } from "./_redux/action/store-action";
import StoreSingleMini from "./StoreSingleMini";
import LoadingPlaceHolder from "../master/skelleton/LoadingPlaceholder";

const StoreList = () => {
  const dispatch = useDispatch();
  const { storeList, isLoading } = useSelector((state) => state.store);

  useEffect(() => {
    storeList.length === 0 && dispatch(getFilteredStoreList({}, 1));
  }, []);

  return (
    <div className="productList-body p-3">
      <div className="row">
        {
          isLoading && (
            <LoadingPlaceHolder className="col-4 col-md-2 col-lg-2" count={18} height={90} />
          )
        }

        {storeList.length > 0 &&
          storeList.slice(0, 18).map((item, index) => (
            <div className="col-4 col-md-2 col-lg-2" key={index}>
                <StoreSingleMini item={item} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
