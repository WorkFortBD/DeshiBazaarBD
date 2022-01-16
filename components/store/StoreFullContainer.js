import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic'
import { getFilteredStoreList } from './_redux/action/store-action';

// import StoreFilter from '../components/store/StoreFilter';
// import StoreListFull from '../components/store/StoreListFull';

const StoreFilter = dynamic(() => import('./StoreFilter'), {ssr: false})
const StoreListFull = dynamic(() => import('./StoreListFull'), {ssr: false})

function StoreFullContainer() {
    const dispatch = useDispatch();
    const { selectedLocation, paginate } = useSelector(state => state.store)

    useEffect(() => {
        dispatch(getFilteredStoreList(selectedLocation, paginate.currentPage))

    }, [JSON.stringify(selectedLocation)]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <StoreFilter />
                </div>
                <div className="col-md-9">
                    <StoreListFull />
                </div>
            </div>
        </div>
    )
}

export default StoreFullContainer;