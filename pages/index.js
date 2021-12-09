import React from "react";
import HomeBannerCarousel from "../components/homeBannerCarousel/HomeBannerCarousel";
import CategoryListContainer from "../components/category/CategoryListContainer";
import CompanyPolicyContainer from '../components/CompanyPolicy/CompanyPolicyContainer'
import ShopContainer from "../components/Shop/ShopContainer";
import DealFlash from "../components/DealFlash/DealFlash";
import ProductSection from "../components/products/ProductSection";
import { translate } from "../services/translation/translation";
import StoreContainer from "../components/store/StoreContainer";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import PageMeta from "../components/layouts/PageMeta";
import CampaignContainer from "../components/campaign/CampaignContainer";
// import ShopBanner from "../components/ShopBanner/ShopBanner";
// import ProductTopListContainer from "../components/ProductTopList/ProductTopListContainer";
// import NewOffer from "../components/NewCollection/NewOffer";
// import OfferProducts from "../components/OfferProducts/OfferProducts";
import content from '../content.json';

export default function Home(props) {
  const {isMobile} = useSelector(state => state.GlobalReducer);

  return (
    <>
      <PageMeta
        title={content.meta_title}
        description={content.meta_description}
        keywords={content.meta_keywords}
        ogpEnabled={true}
        pageSocialMetaUrl={content.main_url}
        pageSocialMetaImage={content.logo} />
      <HomeBannerCarousel slider={props.slider} />

      {/* <NewOffer /> */}
      {/* <OfferProducts /> */}
      {/* <ProductTopListContainer /> */}
      <CampaignContainer />
      <CategoryListContainer homepageCategories={props.homepageCategories} />

      <LazyLoad height={280} once>
        <DealFlash />
      </LazyLoad>

      <ProductSection title={translate('Daily Essential')} type="daily-essentials" limit={isMobile ? 6 : 10} url='daily-essentials' isSliding={isMobile ? false : true} />
      <ProductSection title={translate('Fastest Delivery')} type="fastest" limit={6} url='fastest' />
      <ProductSection title={translate('Latest Products')} type="latest" limit={6} url='latest' />
      <ProductSection title={translate('Featured Products For You')} type="featured" limit={6} url='featured' />
      <ProductSection title={translate('Best Sold')} type="best-sold" limit={6} url='best-sold' />

      {/* <ShopBanner /> */}
      <LazyLoad height={400} once>
        <ShopContainer />
      </LazyLoad>

      <LazyLoad height={400} once>
        <StoreContainer />
      </LazyLoad>
      <LazyLoad height={280} once>
        <CompanyPolicyContainer />
      </LazyLoad>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const [sliderRes, categoryRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}sliders-frontend`), 
      fetch(`${process.env.NEXT_PUBLIC_API_URL}frontend-categories?type=homepage&limit=12`)
    ]);
  
    const [sliderObj, homepageCategoriesObj] = await Promise.all([
      sliderRes.json(),
      categoryRes.json()
    ]);
  
    const slider              = sliderObj.status ? sliderObj.data : [];
    const homepageCategories  = homepageCategoriesObj.status ? homepageCategoriesObj.data : [];
  
    return {
        props: { slider, homepageCategories }
    }
  } catch (error) {
    return {
      props: {slider: [], homepageCategories: []}
    }
    
  }
}