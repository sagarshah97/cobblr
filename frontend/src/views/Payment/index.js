// Author: Sagar Paresh Shah (B00930009)

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./PaymentPage";
import Footer from "../HomePage/Footer";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

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
