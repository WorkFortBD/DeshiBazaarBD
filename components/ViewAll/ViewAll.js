import React from "react";
import Link from "next/link";
import Translate from "../translation/Translate";

function ViewAll({ type = '' }) {
  return (
    <Link href={`/products?type=${type}&filter=paginate_no__40`}>
      <div className="custom-button-component pointer " >
        <Translate>View all</Translate>
        {' '}
        <span>
          <i className="fas fa-arrow-right"></i>
        </span>
      </div>
    </Link>
  );
}

export default ViewAll;
