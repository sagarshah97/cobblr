import React, { lazy, Suspense, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HomePage from "./views/HomePage/index.js";
import UnderConstruction from "./views/UnderConstruction/index.js";
import FAQ from "./views/FAQ/index.js";
import Layout from "./utils/Layout.js";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import ProductDetail from "./views/ProductDetail/index.js";
import AdditionalDetails from "./views/AdditionalProductDetail/index.js";
import ContactUs from "./views/ContactUs/ContactUs.js";

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
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/details" element={<AdditionalDetails />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
