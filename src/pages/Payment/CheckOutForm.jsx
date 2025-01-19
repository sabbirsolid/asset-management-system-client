import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = ({ clientSecret }) => {
  const { user } = useContext(AuthContext);
  //   const { userObject, isLoading } = useUserRoles();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  console.log(clientSecret);

  //   handle payment
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      console.log("payment error", error);
    } else {
      console.log("Payment Method:", paymentMethod);
      setError("");
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setError(confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      setTransactionId(paymentIntent.id);
    }
  };

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        disabled={!stripe || !elements || !clientSecret}
        className="btn btn-primary my-5"
        type="submit"
      >
        Pay Now
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your Transaction ID: {transactionId} </p>
      )}
    </form>
  );
};

export default CheckoutForm;
