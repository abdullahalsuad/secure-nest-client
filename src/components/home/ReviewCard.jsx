import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ testimonial }) => {
  return (
    <div className="min-w-[300px] max-w-sm bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 m-4 hover:shadow-lg transition-all duration-300 border border-gray-300 dark:border-0 h-96">
      <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-100">
        "{testimonial.feedback}"
      </p>
      <div className="flex items-center">
        <img
          src={testimonial.profileImgUrl}
          alt={testimonial.userName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {testimonial.userName}
          </h4>
          <div className="flex items-center space-x-1 text-yellow-400">
            {Array.from({ length: 5 }, (_, i) =>
              i < testimonial.rating ? (
                <FaStar key={i} />
              ) : (
                <FaRegStar key={i} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
