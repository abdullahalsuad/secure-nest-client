import React, { useEffect } from "react";
import HeroSlider from "./HeroSlider";
import NewsletterForm from "./NewsletterForm";
import LatestBlogs from "./LatestBlogs";

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

      {/* blogs */}
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mt-12">
        Latest Blogs
      </h1>
      <LatestBlogs />

      {/* NewsletterForm */}
      <NewsletterForm />
    </>
  );
};

export default HomePages;
