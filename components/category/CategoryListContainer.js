import React from 'react';
import CategoryList from './CategoryList';
import Translate from '../translation/Translate';

const CategoryListContainer = ({ parentID = null, homepageCategories }) => {
    return (
        <section className="container product-container">
            <div className="product-heading">
                <h1>
                    <Translate>Shop by categories</Translate>
                </h1>
                {/* {
                    parentID !== 'all' &&
                    <Link href="/categories">
                        <a href="/categories">
                            <Button buttonText={translate('View all')} isFontAwesome={true} />
                        </a>
                    </Link>
                } */}
            </div>

            <CategoryList parentID={parentID} homepageCategories={homepageCategories} />
        </section>
    );
};

export default CategoryListContainer;