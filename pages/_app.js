import React, { useEffect } from "react";
import Head from 'next/head';
import { Provider } from "react-redux";
import Router, { useRouter } from "next/router";
import NProgress from 'nprogress';
import { createWrapper } from "next-redux-wrapper";
import Store from "../_redux/Store";

import "../assets/scss/variables.scss";
import "bootstrap/scss/bootstrap.scss";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../assets/scss/main.css";

import "../assets/scss/carts.scss"; // For carts page
import "../assets/scss/navigation.scss";
import "../assets/scss/RemoveCartItem.scss";
import "../assets/scss/product-details-info.scss";
import "../assets/scss/modal.scss";
import "../assets/scss/payment.css";
import "../assets/scss/responsive.scss";
import "../assets/scss/responsive-main.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/product-review/productListForReview.css";
import "../components/ProfileAccountSetting/ProfileAccountSetting.scss";
import "../assets/scss/nprogress.css"
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

// For Order Pages
import "../components/orders/scss/order-invoice.scss";
import MainLayout from "../components/layouts/MainLayout";
import axiosDefault from "../services/axios-default";
import Script from 'next/script'
import * as gtag from '../lib/gtag';

axiosDefault();
toast.configure();

// Base url


NProgress.configure({ minimum: 0.1 });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done();
};



function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    import('react-facebook-pixel')
    .then((x) => x.default)
    .then((ReactPixel) => {
      ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) // facebookPixelId
      ReactPixel.pageView()

      router.events.on('routeChangeComplete', () => {
        ReactPixel.pageView()
      })
    })

    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-1PNGH962LS`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Provider store={Store}>
        {/* Global Site Code Pixel - Facebook Pixel */}
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.deshibazaarbd.com" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        </Head>
          <MainLayout>
            <Component {...pageProps}></Component>
          </MainLayout>
      </Provider>
    </>
  )
}

const makeStore = () => Store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
