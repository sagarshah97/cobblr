// Author: Sagar Paresh Shah (B00930009)

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./PaymentPage";
import Footer from "../HomePage/Footer";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NQaRTG6OTDlGgErS8SKwbLUbLATJh460IE1h3I6uqNpwSj8sbcfaOhvffshRxQpK9LNNDFEezxp6AdeXgfXooOB00gbBlp2VU"
);

const PaymentContainer = () => {
  const location = useLocation();
  const params = location.state?.params;

  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentPage details={params} />
      </Elements>
      <Footer />
    </>
  );
};

export default PaymentContainer;
