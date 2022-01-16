import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyPolicyList } from './_redux/Action/CompanyPolicyAction';

const CompanyPolicyContainer = () => {

    const dispatch   = useDispatch();
    const { policyList } = useSelector((state) => state.companyPolicy);

    useEffect(() => {
        if(policyList.length === 0) {
            dispatch(getCompanyPolicyList())
        }
    }, []);

    return (
        <section className="company-policy-container">
            <div className="container p-3">
                <div className="row justify-content-center">
                    {
                        policyList.length > 0 && policyList.map((item, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="policy-card">
                                    <img src={item.icon} alt={item.title} />
                                    <h2 className="policy-card-title">
                                        {item.title}
                                    </h2>
                                    <p className="policy-card-description">{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default CompanyPolicyContainer;