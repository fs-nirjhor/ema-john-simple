//import CheckoutForm from "./CheckoutForm";
//import PaymentForm from "./PaymentForm";
import CardElementForm from "./CardElementForm"; 
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import "./Payment.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Payment({handlePayment}) {
  /*const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };*/

  return (
    <Elements stripe={stripePromise} >
      <CardElementForm handlePayment={handlePayment}/>
    </Elements>
  );
};