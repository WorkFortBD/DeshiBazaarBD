import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ProfileSideBar from '../myprofile/ProfileSideBar';
import ProductListForReview from './ProductListForReview';
import ProductReviewHistory from './ProductReviewHistory';
import { useSelector } from 'react-redux';
const ProductReview = () => {

    const {itemList, reviewList} = useSelector((state) => state.productReview);
    const {isMobile} = useSelector((state) => state.global);

    return (
        <div className="row">
            {
                !isMobile && (
                    <div className="col-md-3 d-none d-md-block">
                        <ProfileSideBar />
                    </div>
                )
            }
            <div className="col-md-9 mt-3 mt-md-5 mb-3 px-0 px-md-2">
                <div className="card card-middle">
                    <div className="sidebar-card-title order_filter_section">
                        <Tabs defaultActiveKey="waitingForReview" id="uncontrolled-tab-example">
                            <Tab eventKey="waitingForReview" title={`To Be Reviewed (${itemList.length})`}>
                                <ProductListForReview />
                            </Tab>
                            <Tab eventKey="history" title={`Review History (${reviewList.length})`}>
                                <ProductReviewHistory />
                            </Tab>
                        </Tabs>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductReview;