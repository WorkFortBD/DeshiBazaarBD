import React from "react";
import CategoryWishProductContainer from "../../components/CategoryWishProductList/CategoryWishProductContainer";

export default function Products(props) {
  const { isMainCategory, subCategories, mainCategoryBanner } = props;

  return (
      <div className="container">
        <CategoryWishProductContainer isMainCategory={isMainCategory} subCategories={subCategories} mainCategoryBanner={mainCategoryBanner} />
      </div>
  );
}

export const getServerSideProps = async (context) => {
  const query           = context.query;
  const isMainCategory  = query['main-category'] ? true : false;

  if(isMainCategory) {
    const mainCategorySlug = encodeURIComponent(query['main-category']);
  
    const uri = `${process.env.NEXT_PUBLIC_API_URL}categories/${mainCategorySlug}`;

    try {
      const res = await fetch(uri);
  
      const dataJSON = await res.json();
      const data = dataJSON.data;

      return {
        props: { 
          isMainCategory: isMainCategory,
          subCategories: data?.childs ?? [],
          mainCategoryBanner: data?.banner_url ?? ''
        }
      }
    } catch (error) {
      return {
        props: {
          isMainCategory: isMainCategory,
          subCategories: null
        }
      }
    }

  } else {
    return {
      props: {
        isMainCategory: isMainCategory,
        subCategories: null
      }
    }
  }
}