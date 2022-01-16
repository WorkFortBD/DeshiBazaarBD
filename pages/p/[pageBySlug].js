import React, {useEffect, useState} from "react";
import LoadingSpinner from "../../components/master/loading/LoadingSpinner";
import DOMPurify from 'dompurify';

export default function PageBySlug(props) {
    const [parsedHtml, setParsedHtml] = useState();
    const { pageData } = props;

    useEffect(() => {
        const parsedHtml = DOMPurify.sanitize(pageData.description, {USE_PROFILES: {html: true}})
        setParsedHtml(parsedHtml)
    }, [pageData])

    return (
        <div className="container">
            <div className="row my-4 justify-content-center">
                {
                    !pageData && <LoadingSpinner text="Page Loading..." />
                }

                {
                    pageData &&
                    <div className="col-lg-12 px-0">
                        <div className="card rounded">
                            <div className="card-header">
                                <h1 className="website-info-title">{pageData.title}</h1>
                            </div>
                            <div className="card-body">
                                <div className="website-info-content" dangerouslySetInnerHTML={{__html: parsedHtml}}>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const { pageBySlug } = context.params;
    const pageDataRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/${pageBySlug}`);
    const pageData = await pageDataRes.json();

    if(!pageData.data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            pageData: pageData.data
        },
        revalidate: 3600
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: {pageBySlug: 'help-center'}},
            {params: {pageBySlug: 'how-to-buy'}},
            {params: {pageBySlug: 'return-and-refund-policy'}},
            {params: {pageBySlug: 'shipping-method'}},
            {params: {pageBySlug: 'same-day-delivery'}},
            {params: {pageBySlug: 'site-map'}},
            {params: {pageBySlug: 'faq'}},
            {params: {pageBySlug: 'about-us'}},
            {params: {pageBySlug: 'career'}},
            {params: {pageBySlug: 'affiliate'}},
            {params: {pageBySlug: 'wholesale'}},
            {params: {pageBySlug: 'contact'}},
            {params: {pageBySlug: 'terms-&-condition'}},
            {params: {pageBySlug: 'privacy-policy'}},
            {params: {pageBySlug: 'blog'}}
        ],
        fallback: true
    }
}