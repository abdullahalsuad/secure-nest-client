import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      title: "Protect Your Future Today",
      description:
        "Explore our wide range of insurance policies designed to secure your life and loved ones.",
      image:
        "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Affordable Coverage For Everyone",
      description:
        "From term life to family plans, we offer customizable options that suit every budget.",
      image:
        " https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Trusted by Thousands",
      description:
        "Join thousands of satisfied customers who trust us for their insurance needs.",
      image:
        " https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <section className="relative bg-gray-900 text-white">
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigatio
        className="h-[700px]"
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

            {/* Content */}
            <div className="container mx-auto px-6 py-30 relative z-20 flex items-center h-full ">
              <div className="max-w-2xl text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                  {slide.description}
                </p>
                <a
                  href="/all-policies"
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  View Policies
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
