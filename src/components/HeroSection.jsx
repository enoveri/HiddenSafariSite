// src/components/HeroSection.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faUsers,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  // Stats data for DRY code
  const statsData = [
    { icon: faMountain, value: "2,11,500+", label: "Participants" },
    { icon: faUsers, value: "2750+", label: "Volunteers" },
    { icon: faCalendarAlt, value: "68+", label: "Events" },
    { icon: faClock, value: "11", label: "Years" },
  ];

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[558px] bg-cover bg-center bg-[url('https://i.pinimg.com/736x/7c/3d/eb/7c3debabe5fa0b4bd486c549328fd483.jpg')] overflow-hidden">
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8">
        <div className="container mx-auto">
          {/* Hero content with responsive text */}
          <div className="md:w-3/4 lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-[55px] font-poppins font-medium text-white leading-tight mb-2 sm:mb-4 drop-shadow-lg">
              Experience <br className="hidden sm:block" />
              Nature
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-poppins text-white w-full sm:w-3/4 tracking-wide drop-shadow-lg">
              India's Largest Trekking Organization
            </p>

            {/* Stats with icons - responsive grid for mobile */}
            <div className="mt-6 sm:mt-8 py-4 sm:py-6 grid grid-cols-2 sm:flex sm:flex-row sm:space-x-4 md:space-x-8 gap-y-4 sm:gap-y-0">
              {statsData.map((stat, index) => (
                <div key={index} className="flex items-center text-white">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-xl sm:text-2xl drop-shadow-md"
                  />
                  <span className="text-base sm:text-lg font-poppins font-medium ml-2 drop-shadow-md">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm ml-1 drop-shadow-md">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to action button */}
            <button className="mt-6 sm:mt-8 px-6 py-3 bg-[#E25B32] hover:bg-[#D24A21] text-white font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]">
              Explore Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
