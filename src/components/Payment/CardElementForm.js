import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import axios from "axios";

const CardElementForm = ({handlePayment}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setSuccessMessage("Payment Successful");
      handlePayment(paymentMethod.id);
      setErrorMessage("");
    } else {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "black" },
        "::placeholder": { color: "black" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "black",
      },
    },
  };

  return (
    <>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className="payment-button" >Pay</button>
          </form>
          <h3 className="payment-success">{successMessage}</h3>
          <h3 className="payment-error">{errorMessage}</h3>
        </div>
    </>
  );
};

export default CardElementForm;
