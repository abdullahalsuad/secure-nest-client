import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentCard = () => {
  const { policeId, applicationId } = useParams();

  const axiosSecure = useAxiosSecure();

  // fetch parcel
  const { data: police = {}, isLoading } = useQuery({
    queryKey: ["police-details", policeId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/polices/${policeId}`);
      return res.data;
    },
  });
  // Show loading state
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

  return (
    <>
      <title>Payment Card</title>
      <Elements stripe={stripePromise}>
        <PaymentForm police={police} applicationId={applicationId} />
      </Elements>
    </>
  );
};

export default PaymentCard;
