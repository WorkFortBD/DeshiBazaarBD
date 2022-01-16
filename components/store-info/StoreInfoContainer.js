import React from 'react'
import {Tab, Tabs} from 'react-bootstrap';
import {useSelector} from 'react-redux'
import CategoryWishProductContainer from '../CategoryWishProductList/CategoryWishProductContainer';
// import StoreProductList from './StoreProductList';
import StoreProfile from './StoreProfile';

function StoreInfoContainer() {
    const { storeInfo } = useSelector(state => state.storeInfo);
    return (
        <div className="container">
            <div className="store-info-container">
                {
                    storeInfo && storeInfo.banner_url && (
                        <div className="store-info-container__banner">
                            <div className="store-info-container__banner-box">
                                <img src={storeInfo.banner_url} alt={storeInfo.banner} />
                            </div>
                        </div>
                    )
                }
                <div className="row mb-5 mt-4 no-gutters">
                    <div className="col-md-12">
                        <div className="store-info-container__tabs mt-2">
                            <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3" style={{ color: 'var(--dark)' }}>
                                <Tab eventKey="products" title="Seller Products">
                                    {/* <StoreProductList /> */}
                                    <CategoryWishProductContainer />
                                    {/* <StoreProductContainer /> */}

                                </Tab>
                                <Tab eventKey="profile" title="Seller Profile">
                                    <StoreProfile />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreInfoContainer;
