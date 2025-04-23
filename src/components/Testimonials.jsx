// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { testimonialService } from "../api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const data = await testimonialService.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const goToPrevious = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonialIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length
    );
  };

  // Function to render star ratings based on the rating value
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 mr-1"
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 mr-1"
        />
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 mr-1"
        />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <section className="py-10 md:py-16 px-4 sm:px-8 bg-pink-100">
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7d4744]"></div>
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return (
      <section className="py-10 md:py-16 px-4 sm:px-8 bg-pink-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600 min-h-[300px] flex items-center justify-center">
          {error || "No testimonials available at the moment."}
        </div>
      </section>
    );
  }

  // Display up to 5 testimonials on desktop, and use pagination on mobile
  const visibleTestimonials = testimonials.slice(0, 5);
  const activeTestimonial = testimonials[activeTestimonialIndex];

  return (
    <section
      className="py-10 md:py-16 px-4 sm:px-8 bg-pink-100"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section headings with improved responsive text sizes */}
        <div className="mb-6 md:mb-10 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-poppins font-semibold text-[#7d4744] mb-2">
            Why people ❤️ Invincible
          </h2>
          <p className="text-xl font-poppins font-medium text-[#5a4a42]">
            Experience the best with us
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:space-x-8">
          {/* Left column: stacked list of authors */}
          <div className="md:w-[35%] space-y-4">
            {visibleTestimonials.map((testimonial, idx) => (
              <button
                key={testimonial.id || idx}
                className={`w-full flex items-center rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  activeTestimonialIndex === idx
                    ? "bg-white shadow-md border-l-4 border-[#7d4744]"
                    : "bg-pink-50 hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => setActiveTestimonialIndex(idx)}
                aria-label={`View testimonial from ${testimonial.name}`}
              >
                <img
                  src={
                    testimonial.profileImage ||
                    "https://via.placeholder.com/64/CCCCCC/FFFFFF?text=User"
                  }
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 shadow"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/64/CCCCCC/FFFFFF?text=User";
                  }}
                />
                <div className="text-left">
                  <h4 className="text-lg font-medium truncate">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {renderStars(testimonial.ratings || 5)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right column: featured testimonial */}
          <div className="md:w-[65%] bg-white p-6 md:p-8 shadow-md rounded-lg relative">
            <FaQuoteLeft className="text-pink-100 text-4xl mb-4" />

            {/* Main quote with ellipsis for long text */}
            <p className="text-lg md:text-xl font-poppins text-gray-700 leading-relaxed italic mb-6 line-clamp-6 sm:line-clamp-none">
              "{activeTestimonial.review}"
            </p>

            <div className="flex items-center justify-between mt-6">
              {/* Author information */}
              <div className="flex items-center">
                <img
                  src={
                    activeTestimonial.profileImage ||
                    "https://via.placeholder.com/64/CCCCCC/FFFFFF?text=User"
                  }
                  alt={activeTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 shadow"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/64/CCCCCC/FFFFFF?text=User";
                  }}
                />
                <div>
                  <p className="font-semibold text-lg">
                    {activeTestimonial.name}
                  </p>
                  <p className="text-gray-600">
                    {activeTestimonial.role || "Customer"}
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex">
                {renderStars(activeTestimonial.ratings || 5)}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Simplified carousel */}
        <div className="md:hidden">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <FaQuoteLeft className="text-pink-100 text-3xl mb-4" />

            {/* Main quote */}
            <p className="text-base text-gray-700 leading-relaxed italic mb-6">
              "{activeTestimonial.review}"
            </p>

            {/* Star rating */}
            <div className="flex mb-4">
              {renderStars(activeTestimonial.ratings || 5)}
            </div>

            {/* Author information */}
            <div className="flex items-center">
              <img
                src={
                  activeTestimonial.profileImage ||
                  "https://via.placeholder.com/48/CCCCCC/FFFFFF?text=User"
                }
                alt={activeTestimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-3 shadow"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/48/CCCCCC/FFFFFF?text=User";
                }}
              />
              <div>
                <p className="font-semibold">{activeTestimonial.name}</p>
                <p className="text-gray-600 text-sm">
                  {activeTestimonial.role || "Customer"}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-between mt-6">
              <button
                onClick={goToPrevious}
                className="bg-pink-50 hover:bg-pink-100 text-[#7d4744] rounded-full p-2 transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft />
              </button>

              <div className="flex space-x-1">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === activeTestimonialIndex
                        ? "bg-[#7d4744]"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setActiveTestimonialIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="bg-pink-50 hover:bg-pink-100 text-[#7d4744] rounded-full p-2 transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
