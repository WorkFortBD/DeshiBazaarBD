import React from 'react';
import { withRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ router, href, children }) => {

    (function prefetchPages() {
        if (typeof window !== "undefined") {
            router.prefetch(router.pathname);
        }
    })()

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    }
    
    const isCurrentPath = router.pathname === href || router.asPath === href;

    return (
        <div>
            <Link href={href} onClick={handleClick}>
                <a className={isCurrentPath ? "activeLink" : "inActiveLink"}>
                    {children}
                </a>
            </Link>
        </div>
    );
};

export default withRouter(ActiveLink);