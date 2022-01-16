import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import BrandSingleMini from './BrandSingleMini';
import { getShopList } from './_redux/Action/ShopAction';
import Paginate from '../master/paginate/Paginate';
import { onPageChangeHandler } from '../../helper/paginate-onchange/onchange-handler';

function BrandListFull() {
    const dispatch = useDispatch();
    const { ShopList, isLoading, paginate } = useSelector((state) => state.shop);

    useEffect(() => {
        dispatch(getShopList(paginate.currentPage));
    }, []);
    
    return (
        <div className="row mb-3">
            {
                isLoading && [...new Array(10)].map((_, index) => (
                    <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6 px-1 px-sm-2">
                        <div className="brand-card-skeleton"></div>
                    </div>
                ))
                
            }
            {
                !isLoading && ShopList.length > 0 && ShopList.map((item, index) => (
                    <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6 px-1 px-sm-2">
                        <BrandSingleMini item={item} />
                    </div>
                ))
            }
            <div className="col-12 px-0">
                {
                    !isLoading && (
                        <Paginate 
                            pageCount={paginate.pageCount.length}
                            onPageChange={(page) => onPageChangeHandler({page: page, dispatch: dispatch, fn: getShopList})}
                            currentPage={paginate.currentPage}
                            perPage={paginate.perPage}
                            totalItemCount={paginate.totalCount}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default BrandListFull
