import React from "react";
import HeroSlider from "./HeroSlider";
import NewsletterForm from "./NewsletterForm";

const HomePages = () => {
  return (
    <>
      {/* hero section */}
      <div>
        <HeroSlider />
      </div>

      {/* NewsletterForm */}
      <NewsletterForm />
    </>
  );
};

export default HomePages;
