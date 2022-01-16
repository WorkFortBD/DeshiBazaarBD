import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredStoreList } from "./_redux/action/store-action";
// import StoreSingleMini from "./StoreSingleMini";
import Link from 'next/link';
import ProductNoFound from "../master/productNoFound/ProductNoFound";
import Paginate from "../master/paginate/Paginate";
import { loading } from "../master/loading/loading";

function StoreListFull() {
    const dispatch = useDispatch();
    const { storeList, isLoading, paginate, selectedLocation } = useSelector((state) => state.store);

    let list;
    if(isLoading) {
        list = <div className="col-12">
            {
                loading()
            }
        </div>
    }

    const paginateHandler = (page) => {
        if (!page) return;

        window.scrollTo({ top: 0, behavior: "smooth" });

        dispatch(getFilteredStoreList(selectedLocation, page.selected + 1));
    };


    if(!isLoading) {
        list = storeList.length > 0 && storeList.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-4 col-6 px-1 px-sm-2" key={index}>
                    {/* <StoreSingleMini item={item} /> */}
                    <Link href={`/store/${item.slug}`}>
                        <a>
                            <div className="brand-card">
                                {
                                    (item.logo !== null && item.logo !== '') &&
                                    <div className="brand-logo">
                                        <img src={`${process.env.NEXT_PUBLIC_URL}/images/vendors/${item.logo}`} alt={item.name} />
                                    </div>
                                }
                            </div>
                        </a>
                    </Link>
                </div>
        ))
    }

    if(!isLoading && storeList.length === 0) {
        list =  <div className="col-lg-12"><ProductNoFound /></div>
    }

    return (
        <div className="storeList-body p-3">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <h4>
                        All Stores
                    </h4>
                </div>
            </div>
            <div className="row">
                {list}

                <div className="col-12 px-0">
                    {
                        !isLoading && (
                            <Paginate
                                pageCount={paginate.pageCount.length}
                                onPageChange={paginateHandler}
                                currentPage={paginate.currentPage}
                                perPage={paginate.perPage}
                                totalItemCount={paginate.totalCount}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StoreListFull;
