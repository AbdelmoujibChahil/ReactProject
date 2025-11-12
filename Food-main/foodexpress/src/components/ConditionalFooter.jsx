import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer/Footer'; // Import our real Footer component

/**
 * This component's only job is to check the user's current URL
 * and decide whether to render the Footer or nothing.
 */
const ConditionalFooter = () => {
  // 1. Get the current location object, which contains the path
  const location = useLocation();

  // 2. Define the list of paths where we want the footer to be HIDDEN
  //    Based on our plan: Login, Signup, and the entire Checkout flow.
  const hideOnPaths = [
    '/login',
    '/signup',
    '/checkout',
    '/payment',
    '/ordersuccess'
  ];

  // 3. Check if the user's current path is in our "hidden" list
  const shouldHideFooter = hideOnPaths.includes(location.pathname);

  // 4. The logic:
  // If shouldHideFooter is true, this component renders nothing (null).
  // Otherwise, it renders our normal Footer.
  if (shouldHideFooter) {
    return null;
  } else {
    return <Footer />;
  }
};

export default ConditionalFooter;