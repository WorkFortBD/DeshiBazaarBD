import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShippingFast, faUser } from '@fortawesome/free-solid-svg-icons'
import { languages } from '../../assets/FakeData/FakeData';
import Link from "next/link";

const HeaderTop = () => {

    return (
        <section className="header-top">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-5">
                        <p className="heading-top-text">Get Your <span className="holyday-shopping">Holiday Shopping</span> On Wholesale Pricing</p>
                    </div>
                    <div className="col-md-7 heading-top-right">
                        <div className="row justify-content-end">
                            
                            <p className="heading-top-text pointer mr-3">
                                <Link href="/register?type=seller">
                                    <a href="" className="text-white">
                                        <FontAwesomeIcon className="custom-fontAwesome" icon={faUser} /> Become a Seller
                                    </a>
                                </Link>
                            </p>

                            <p className="heading-top-text pointer">
                                <FontAwesomeIcon className="custom-fontAwesome" icon={faShippingFast} /> Track My Order
                            </p>

                            <p className="heading-top-text pointer">
                                <Link href="/profile">
                                    <a href="/" className="text-white">
                                        <FontAwesomeIcon className="custom-fontAwesome" icon={faUser} /> My Account
                                    </a>
                                </Link>
                            </p>
                            
                            <Dropdown className="dropdown-currency">
                                <Dropdown.Toggle variant="default" id="dropdown-basic">
                                    <img src='/images/languages/usa.png' /> USD
                                </Dropdown.Toggle>

                                <Dropdown.Menu> 
                                    {
                                        languages.length > 0 && languages.map((lan, index) => (
                                            <Dropdown.Item href="#"  key={index}>
                                                {lan.label}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeaderTop;