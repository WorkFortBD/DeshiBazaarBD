import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPlaceHolder from '../master/skelleton/LoadingPlaceholder';
import { getNewOfferList } from './_redux/Action/new-offer-action';

const NewOffer = () => {
    const dispatch = useDispatch();
    const {newOffer, isLoading} = useSelector(state => state.offer);
    const {isMobile} = useSelector(state => state.global);

    useEffect(() => {
        if(newOffer.length === 0) {
            dispatch(getNewOfferList());
        }
    }, [])

    if(!isMobile) {
        return (
            <section className="container product-container">
                <div className="new-collection-section">
                        <div className="row text-center">
                            {
                                isLoading && (
                                    <>
                                        <LoadingPlaceHolder className="col-lg-3 col-md-4" count={1} height={359} />
                                        <LoadingPlaceHolder className="col-lg-6 col-md-8" count={1} height={359} />
                                        <LoadingPlaceHolder className="col-lg-3 col-md-12" count={1} height={359} />
                                    </>
                                )
                            }

                            {newOffer.length >= 2 && (
                                <>
                                    <div className="col-lg-3 col-md-4">
                                        <a href="">
                                            <div className="home-card pointer">
                                                <div className="collection-banner">
                                                    <img src={newOffer[0] && newOffer[0].image} className="img img-fluid" alt="" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col-lg-6 col-md-8">
                                        <a href="">
                                            <div style={{height: '100%', width: '100%'}}>
                                                <div className="home-card pointer">
                                                    <img src={newOffer[1] && newOffer[1].image} className="img img-fluid middle" alt="banner" style={{ width: '100%' }}/>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col-lg-3 col-md-12">
                                    <a href="">
                                        <div className="home-card pointer">
                                            <img src={newOffer[2] && newOffer[2].image} className="img img-fluid" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                </div>
            </section>
        );
    } else {
        return null;
    }

};

export default memo(NewOffer);