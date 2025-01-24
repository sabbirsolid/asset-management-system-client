import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserRoles from "../../hooks/useUserRoles";

const CheckoutForm = ({ clientSecret, refetch, selectedPackage }) => {
  const { user } = useContext(AuthContext);
  const { userObject } = useUserRoles();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();

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
    } else {
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
      setError(confirmError);
    } else {
      setTransactionId(paymentIntent.id);
      const paymentInfo = {
        hrEmail: userObject.email,
        name: userObject.name,
        transactionId: paymentIntent.id,
        paidAmount: selectedPackage.price,
        currency: selectedPackage.currency,
        paymentTime: new Date(),
      };
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        if (res.data.insertedId) {
          axiosSecure
            .patch(`/users/${user.email}`, {
              newMember: selectedPackage.numberOfEmployees,
            })
            .then((response) => {
              if (response.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Member Limit Increased Successfully!",
                  icon: "success",
                  draggable: true,
                });
                refetch();
              }
            });
        }
      });
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
