import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = ({ police, applicationId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { user } = use(AuthContext);
  const [error, setError] = useState("");

  const amount = police.basePremiumRate;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // step- 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      // step-2: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        orderIds: police._id,
      });

      const clientSecret = res.data.clientSecret;

      // step-3 confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      console.log("result", result);

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");

          const transactionId = result.paymentIntent.id;
          // step-4 mark police paid also create payment history
          const paymentData = {
            orderId: police._id,
            applicationId: applicationId,
            email: user.email,
            name: user.displayName,
            userID: user.uid,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          console.log(paymentRes.status);

          if (paymentRes.status === 200) {
            //  Show SweetAlert with transaction ID
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My polices",
            });

            //  Redirect to /my polices
            navigate("/my-dashboard");
          }
        }
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Complete Your Payment
        </h2>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Card Details
          </label>
          <CardElement className="p-3 bg-white dark:bg-gray-900 border rounded-md" />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md text-black font-semibold transition   ${
            police.paymentStatus === "paid" || !stripe
              ? "cursor-not-allowed bg-gray-400 text-black  "
              : "bg-amber-400 hover:bg-amber-500"
          }`}
          disabled={!stripe || police.paymentStatus === "paid"}
        >
          Pay ${amount}
        </button>

        {error && (
          <p className="text-sm text-center text-red-500 font-medium">
            {error}
          </p>
        )}
      </form>
    </>
  );
};

export default PaymentForm;
