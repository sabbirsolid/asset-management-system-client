import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
const Payment = () => {
 
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Pay Now</h1>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
