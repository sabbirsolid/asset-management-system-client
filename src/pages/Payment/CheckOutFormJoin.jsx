import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { auth } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOutFormJoin = ({ clientSecret, userInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { createUserWithEmail } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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
            name: "sabbir" || "anonymous",
            email: userInfo.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      setError(confirmError.message);
    } else {
      setTransactionId(paymentIntent.id);

      createUserWithEmail(userInfo.email, userInfo.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: userInfo.name,
            photoURL: "Nai",
          })
            .then(() => {
              // navigate(location?.state ? location.state : "/");

              axiosPublic.post("/users", userInfo).then((response) => {
                if (response.data.insertedId) {
                  const paymentInfo = {
                    hrEmail: userInfo.email,
                    name: userInfo.name,
                    transactionId: paymentIntent.id,
                    paidAmount: userInfo.selectedPackagePrice,
                    currency: "USD",
                    paymentTime: new Date(),
                  };
                  axiosPublic.post("/payments", paymentInfo).then((resu) => {
                    if (resu.data.insertedId) {
                      Swal.fire({
                        title: "User Created Successfully!",
                        icon: "success",
                        draggable: true,
                      });
                      navigate("/");
                    }
                  });
                }
              });
            })
            .catch((error) => {
              setError(`Failed to update profile: ${error.message}`);
            });
        })
        .catch((error) => {
          setError(`Failed to register: ${error.message}`);
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

export default CheckOutFormJoin;
