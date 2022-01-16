import React, {useEffect, useState} from 'react';
import { getStoreInfo } from './_redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
import StoreProfileDetails from './StoreProfileDetails';
import dayjs from 'dayjs';

function StoreProfile() {
    const dispatch = useDispatch();
    const { storeInfo } = useSelector(state => state.storeInfo);
    const router = useRouter();
    const [isShowing, SetIsShowing] = useState(false)

    const toggleHandler = () => {
        // SetIsShowing(preState => !preState)
    }
    useEffect(() => {
        const store = router.query.seller_id;
        dispatch(getStoreInfo(store));
    }, [])

    return (
        <div className="store-profile">
            <div className="store-profile__info-box">
                <div className="row align-items-stretch">
                    <div className="col-md-4 col-sm-6">
                        <div className="store-profile__info">
                            <div className="store-profile__store-logo">
                                <img src={storeInfo && storeInfo.logo_url} alt={ storeInfo && storeInfo.name} />
                            </div>
                            {/* <p className="store_profile__store-name" >
                                {
                                    storeInfo && storeInfo.name
                                }
                            </p> */}
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="store-profile__info">
                            <p>
                                Joined date: { storeInfo ? dayjs(storeInfo.created_at).format('DD MMMM YYYY') : 'Unknown'}
                            </p>
                            <p>
                                Main product: 
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6" >
                        <div className="store-profile__info last-child">
                            <SimpleBtn 
                                variant="danger" 
                                onClick={toggleHandler} 
                                style={{backgroundColor: 'transparent',color: 'var(--color-primary)', textDecoration: 'underline'}}>
                                View details
                            </SimpleBtn>
                        </div>
                    </div>
                </div>
            </div>
            {
                isShowing && (
                    <StoreProfileDetails />
                )
            }
        </div>
    )
}

export default StoreProfile;
