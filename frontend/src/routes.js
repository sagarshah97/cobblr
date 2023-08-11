// Author: Aayush Yogesh Pandya (B00939670)

import React, { lazy, Suspense, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HomePage from "./views/HomePage/index.js";
import UnderConstruction from "./views/UnderConstruction/index.js";
import FAQ from "./views/FAQ/index.js";
import Layout from "./utils/Layout.js";
import Login from "./views/Login";
import ShoppingCart from "./views/ShoppingCart";
import Orders from "./views/Orders";
import Register from "./views/Register";
import Profile from "./views/Profile";
import ProductDetail from "./views/ProductDetail/index.js";
import AdditionalDetails from "./views/AdditionalProductDetail/index.js";
import ContactUs from "./views/ContactUs/ContactUs.js";
import WishlistPage from "./views/Wishlist/index.js";
import ForgotPasswordPage from "./views/ForgotPassword/index.js";
import CustomModal from "./views/Modal/index.js";
import ProductListing from "./views/ProductListing/index.js";
import BillingDetails from "./views/BillingDetails/index.js";
import Payment from "./views/Payment/index.js";
import OrderConfirmationPage from "./views/OrderConfirmation/index.js";
import AdminPage from "./views/Admin/index.js";
import Store from "./views/Stores/index.js";

const Router = () => {
  const SuspenseLoading = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      let timeout = setTimeout(() => setShow(true), 300);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <CircularProgress loading={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/homepage" element={<HomePage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/productDetail/:_id" element={<ProductDetail />} />
          <Route path="/details" element={<AdditionalDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/modal" element={<CustomModal />} />
          <Route
            path="/forgotpassword/:forgotPasswordToken"
            element={<ForgotPasswordPage />}
          />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/productlisting/:passedSearchKeyword?"
            element={<ProductListing />}
          />
          <Route path="/billing" element={<BillingDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/orderconfirmation/:_id"
            element={<OrderConfirmationPage />}
          />
          <Route path="admin" element={<AdminPage />} />
          <Route path="/stores" element={<Store />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
