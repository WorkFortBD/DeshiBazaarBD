import React from 'react'
// import StoreInfoContainer from '../../components/store-info/StoreInfoContainer';

import dynamic from 'next/dynamic';
const StoreInfoContainer = dynamic(() => import('../../components/store-info/StoreInfoContainer'));

function StoreById() {
    return (
        <StoreInfoContainer />
    )
}

export default StoreById
