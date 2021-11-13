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
// import ShopBanner from "../components/ShopBanner/ShopBanner";
// import ProductTopListContainer from "../components/ProductTopList/ProductTopListContainer";
// import NewOffer from "../components/NewCollection/NewOffer";
// import OfferProducts from "../components/OfferProducts/OfferProducts";

export default function Home() {
  const {isMobile} = useSelector(state => state.GlobalReducer);

  return (
    <>
      <PageMeta
        title="Deshibazaarbd.com | Choose Order Enjoy | Best E-commerce"
        description="Deshi Bazaar BD is a multivendor e-commerce business solution in Bangladesh"
        keywords="deshibazaar,deshibazaarbd,deshibazar,deshibazarbd,daraz"
        ogpEnabled={true}
        pageSocialMetaUrl="https://deshibazaarbd.com"
        pageSocialMetaImage="https://www.deshibazaarbd.com/images/logos/logo-en.svg" />
      <HomeBannerCarousel />

      {/* <NewOffer /> */}
      {/* <OfferProducts /> */}
      {/* <ProductTopListContainer /> */}
      <CategoryListContainer />
      
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