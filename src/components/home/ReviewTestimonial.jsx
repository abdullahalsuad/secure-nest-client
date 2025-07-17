import Marquee from "react-fast-marquee";
import ReviewCard from "../../components/home/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewTestimonial = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosSecure.get("/reviews");
      return response.data;
    },
  });
  if (isLoading) return <div className="text-center">Loading reviews...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load reviews.</div>
    );

  return (
    <>
      <div>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Our{" "}
            <span className="text-teal-600 dark:text-teal-400">Users Say</span>
          </h2>
        </div>

        {/* Bottom Marquee - Right to Left */}
        <div className="overflow-hidden">
          <Marquee speed={50} gradient={false} direction="right" play={true}>
            {testimonials.map((testimonial, index) => (
              <ReviewCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default ReviewTestimonial;
