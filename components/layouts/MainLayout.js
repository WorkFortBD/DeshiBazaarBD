import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FloatingCart from "../carts/floating-cart/FloatingCart";
import FloatingCartButton from "../carts/floating-cart/FloatingCartButton";

import { checkIsMobileDevice, isSignedIn, setWelcomePopup } from "../../_redux/store/action/globalAction";

// import DemoWarning from "../Demo/DemoWarning";
// import MessengerCustomerChat from 'react-messenger-customer-chat';

const MainLayout = ({children}) => {
  const dispatch = useDispatch();
  const { backdrop, isSignedIn: alreadySignedIn, welcomePopup } = useSelector(state => state.global);
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    const bodyDOM = window.document.body;

    // Remove scrollbar when Floating cart is open
    if (backdrop) {
      bodyDOM.style.height = "100vh";
      bodyDOM.style.overflowY = "hidden";
    } else {
      bodyDOM.style.height = "";
      bodyDOM.style.overflowY = "";
    }
  });

  useEffect(() => {

    const timeout = setTimeout(() => {
      if(!welcomePopup) {
        dispatch(setWelcomePopup(true))
      }
    }, 2000);

    dispatch(isSignedIn(alreadySignedIn, userData))
    if (typeof window === "undefined") {
      global.window = {};
    }
    
    if(process.browser) {
      const isMobile = /Android|webOS|iPhone|Opera Mini/i.test(navigator.userAgent);
      dispatch(checkIsMobileDevice(isMobile))
    }

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {/* {
        process.env.NODE_ENV === 'production' &&
        <MessengerCustomerChat
          pageId="100540491425945"
          appId="934088130725884"
          htmlRef=""
        />
      } */}

      <Header />
      <main>
          <div className={`backdrop ${backdrop ? 'open' : ''}`}></div>
          <div style={{minHeight: "40vh"}}>
            {children}
          </div>
      </main>

      <Footer />
      <FloatingCart />
      <FloatingCartButton />
    </>
  );
};

export default MainLayout;
