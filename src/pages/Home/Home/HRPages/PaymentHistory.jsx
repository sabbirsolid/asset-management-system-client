import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: payments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return response.data;
    },
  });

  if (payments?.length === 0) {
    return (
      <div className="my-10 p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Payment History
        </h2>
        <p className="text-center text-red-500 text-lg">Nothing to Show</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Payment History
      </h2>

      {isLoading ? (
        <p className="text-center ">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : payments?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments?.map((payment) => (
            <div
              key={payment._id}
              className=" shadow-md rounded-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold ">
                {payment.name}
              </h3>
              <p className="text-sm ">Email: {payment.hrEmail}</p>
              <p className="mt-2 ">
                <span className="font-medium">Transaction ID:</span>{" "}
                {payment.transactionId}
              </p>
              <p className="mt-1 0">
                <span className="font-medium">Paid Amount:</span>{" "}
                {payment.paidAmount} {payment.currency}
              </p>
              <p className="mt-1 ">
                <span className="font-medium">Payment Time:</span>{" "}
                {new Date(payment.paymentTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          No payment history available.
        </p>
      )}
    </div>
  );
};

export default PaymentHistory;
