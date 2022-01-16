import React from 'react'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import content from '../../content.json';
dayjs.extend(relativeTime);

function StoreProfileDetails() {
    const { storeInfo } = useSelector(state => state.storeInfo);

    return (
        <div className="store-profile-details shadow-sm">
            <div className="row">
                <div className="col-md-3 col-sm-12 d-flex justify-content-center">
                    <div className="store-profile-details__logo">
                        <img src={storeInfo && storeInfo.logo_url} alt="" />
                    </div>
                </div>
                <div className="col-md-9 col-sm-12">
                    <div className="store-profile-details__heading">
                        <h4>{content.short_name}</h4>
                        <div className="store-profile-details__contacts">
                            <div className="store-profile-details__contact-phone">
                                <div>Phone: </div>
                                <div>{storeInfo && storeInfo.mobile ? storeInfo.mobile : 'Not available'}</div>
                            </div>
                            <div className="store-profile-details__contact-email">
                                <div>Email: </div>
                                <div>{storeInfo && storeInfo.email ? storeInfo.email : 'Not available'}</div>
                            </div>
                            <div className="store-profile-details__contact-action">
                                {/* <SimpleBtn variant="danger rounded" onClick={() => console.log('clicked')}>
                                    Contact agent
                                </SimpleBtn> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="store-profile-details__social">
                        Social Welfare
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="store-profile-details__details">
                        <div>
                            <span>Store age: </span>
                            <span>
                                {
                                    storeInfo ?
                                    dayjs(storeInfo.created_at).fromNow(true) :
                                    'Unknown'
                                }
                            </span>
                        </div>
                        <div>
                            <span>Industry: </span>
                            <span>Apparel nd Accessories</span>
                        </div>
                        <div>
                            <span>Main Product: </span>
                            <span>Men's Wear,Environment Friendly Women's Wear</span>
                        </div>
                        <div>
                            <span>Language: </span>
                            <span>Bangla</span>
                        </div>
                        <div>
                            <span>Markets: </span>
                            <span>Middle East,Euroupe</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StoreProfileDetails;
