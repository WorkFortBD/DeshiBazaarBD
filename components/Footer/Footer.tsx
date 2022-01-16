import React, { useState, memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';

import FooterBottom from './FooterBottom';
import SimpleModal from '../master/modal/SimpleModal';
// import SocialMedia from './SocialMedia';
// import SimpleBtn from '../master/SimpleBtn/SimpleBtn';
import { subscribeNewsletter } from './_redux/Action/FooterAction';
const TrackingForm = dynamic(() => import('../Header/TrackingForm'));
import content from '../../content.json';

const Footer = () => {
    const {isLoading}       = useSelector(state => state.footer)
    const dispatch          = useDispatch();
    const [show, setShow]   = useState(false);
    const [email, setEmail] = useState("");
    const handleClose       = () => setShow(false);
    const handleShow        = () => setShow(true);

    const onSubmit = () => {
        dispatch(subscribeNewsletter(email));
    }

    return (
        <>
            <section className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-xs-6 ">
                            <div className="footer-info">
                                <h3>Customer Care</h3>
                                <h3>
                                    <Link href="/p/help-center">
                                        <a>Help Center</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/how-to-buy">
                                        <a>How To Buy</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/return-and-refund-policy">
                                        <a>Return &amp; Refund Policy </a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/shipping-method">
                                        <a>Payment &amp; Shipping Methods</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/same-day-delivery">
                                        <a>Same Day Delivery</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/site-map">
                                        <a>Site Map</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/faq">
                                        <a>FAQ</a>
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="footer-info">
                                <h3>Information</h3>
                                <h3>
                                    <Link href="/p/about-us">
                                        <a>About us</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/career">
                                        <a>Career</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/affiliate">
                                        <a>Affiliate</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/wholesale">
                                        <a>Wholesale</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/contact">
                                        <a>Contact</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/terms-&-condition">
                                        <a>Terms &amp; Condition</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/privacy-policy">
                                        <a>Privacy Policy</a>
                                    </Link>
                                </h3>
                                <h3>
                                    <Link href="/p/blog">
                                        <a>Blog</a>
                                    </Link>
                                </h3>
                                {/* <h3>
                                    <Link href="/profile">
                                        <a>My Account</a>
                                    </Link>
                                </h3>

                                <p className="pointer" onClick={() => handleShow()}>
                                    Order Tracking
                                </p> */}

                                {/* <div className="mb-2">
                                    <p>Subscribe to our newsletter to get notification about discount information</p>

                                    <div className="">
                                        <div className="mr-2">
                                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control mb-3" placeholder="Enter your Email here" />
                                        </div>

                                        <div>
                                            <SimpleBtn onClick={onSubmit} type="submit" variant="danger" style={{width: 'fit-content'}}>
                                                Subscribe
                                                    {
                                                        isLoading && (
                                                            <>
                                                                &#8203;
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            </>
                                                        )
                                                    }
                                            </SimpleBtn>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="footer-info">
                                <h3>Contact info</h3>
                                <div className="mb-2">
                                    <div>Address</div>
                                    <div style={{fontSize: '14px'}}>
                                        { content.contact_location }
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div>Phone</div>
                                    <div style={{fontSize: '14px'}}>
                                    <a href={`tel:${content.contact_phone}`} className="text-white">{content.contact_phone}</a>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div>Email</div>
                                    <div style={{fontSize: '14px'}}>
                                        <a href={`mailto:${content.primary_email}`} className="text-white">{content.primary_email}</a>
                                    </div>
                                </div>
                                {/* <div className="mb-2">
                                    <div>
                                        <SocialMedia />
                                    </div>
                                </div> */}
                                {content.app_playstore_link.length > 0 &&
                                    <div>
                                        <Link href={content.app_playstore_link} passHref={true}>
                                            <a target="_blank">
                                                <img src="/images/google-play-badge.png" alt="google-play-badge" />
                                            </a>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-info">
                                <h3>Company Info</h3>

                                {content.registered_name.length > 0 &&
                                    <div className="mb-2">
                                        <div>Registered Name</div>
                                        <div style={{fontSize: '14px'}}>{content.registered_name}</div>
                                    </div>
                                }

                                {content.trade_licence_no.length > 0 &&
                                    <div className="mb-2">
                                        <div>Trade License Number</div>
                                        <div style={{fontSize: '14px'}}>{content.trade_licence_no}</div>
                                    </div>
                                }

                                {content.vat_reg_no.length > 0 &&
                                    <div className="mb-2">
                                        <div>Vat Registration Number</div>
                                        <div style={{fontSize: '14px'}}>{content.vat_reg_no}</div>
                                    </div>
                                }

                                {content.tin.length > 0 &&
                                    <div className="mb-2">
                                        <div>E-TIN</div>
                                        <div style={{fontSize: '14px'}}>{content.tin}</div>
                                    </div>
                                }
                                {
                                    content.app_playStore_link_qr_code && (
                                        <div>
                                            <div style={{width: '80px', height: '80px'}}>
                                                <img width="80" height="80" src={content.app_playStore_link_qr_code} alt="play store qr code" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="my-3">
                                <img className="img-responsive" src="/images/footer/shurjoPay.png" alt="shurjoPay" width={1240} height={188} />
                            </div>
                            {/* <div className="my-5">
                                <img className="img-responsive" src="/images/footer/payment-line.png" alt="payment-line" width={1240} height={45} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-section">
                <FooterBottom />
            </div>

            <SimpleModal
                handleClose={handleClose}
                size={"lg"}
                show={show}
            >
                <TrackingForm show={show} setShow={setShow} />
            </SimpleModal>
        </>
    );
};

export default memo(Footer);