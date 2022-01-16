import React from 'react'
import Link from 'next/link';

function Campaign() {
    return (
        <div className="row bg-white py-4">
            <div className="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0">
                <div className="pointer text-center">
                    <Link href="/products?type=flash-sale&name=Flash Sale&filter=paginate_no__40">
                        <a>
                            <div>
                                <img width={400} height={200} className="img-responsive" src="/images/campaign/flash-sale.jpg" alt="flash sale" />
                            </div>
                        </a>
                    </Link>
                </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0">
                <div className="pointer text-center">
                    <Link href="/products?type=masher-bazaar&name=Masher Bazaar&filter=paginate_no__40">
                        <a>
                            <div className='zoom-in-zoom-out'>
                                <img width={400} height={200} className="img-responsive" src="/images/campaign/masher-bazaar.jpg" alt="Masher Bazaar"/>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 mb-lg-0">
                <div className="pointer text-center">
                    <Link href="/products?type=super-sale&name=Super Sale&filter=paginate_no__40">
                        <a>
                            <div>
                                <img width={400} height={200} className="img-responsive" src="/images/campaign/mega-deals.jpg" alt="Mega deals" />
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Campaign;
