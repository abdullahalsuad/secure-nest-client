import React, { useEffect } from "react";
import HeroSlider from "./HeroSlider";
import NewsletterForm from "./NewsletterForm";
import LatestBlogs from "./LatestBlogs";
import PopularPolicies from "./PopularPolicies";
import ReviewTestimonial from "./ReviewTestimonial";
import AgentContainer from "./AgentContainer";

const HomePages = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* hero section */}
      <div>
        <HeroSlider />
      </div>

      <div className="my-20">
        <PopularPolicies />
      </div>

      <div className="my-20">
        <ReviewTestimonial />
      </div>

      {/* blogs */}
      <div className="my-20">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Latest <span className="text-teal-600 dark:text-teal-400">Blogs</span>
        </h1>
        <LatestBlogs />
      </div>

      {/* NewsletterForm */}
      <NewsletterForm />

      {/* agents */}
      <div className="my-20">
        <AgentContainer />
      </div>
    </>
  );
};

export default HomePages;
