// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Added half star for partial ratings
import { FaRegStar } from "react-icons/fa"; // Empty star for ratings

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    fetch("http://54.210.95.246:3005/api/v1/info/testimonials", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMzc2NzgsImV4cCI6MTcyOTMyMTY3OCwiaXNzIjoidXJuOmlzc3VlciJ9.ktWmxeC4NqHv1_W0qKt0avlCaDPBNivvDStv6BwHu9K5Geq9TegxH-S1cPfiRhcGdH30YUg1iDShFNOW7mBSwoKsVMMzWJfaqlN0aG1ELh3m9EL-GepR6gxQ5YkZQ9WfBGeoRDNHyYtq02ajgbRLrueuovCf5Nz9iu-ig0onh9XnZJ7J1kEQF3C6gjB0jLqJ8UcWY72S_O0_6tfq8lFuAXQjYbonMCAsx_hG-wJkmE8hlfcgN6BlcemZq-cTghJVNswBmzSoqgTEW1UnBYVoVOyptFQfVFOjdpRUaAlE4R0JHoRfFLR9vsxxvO5Y_x3Z8Eqfcq7O2CPGGPG_5yxt7w",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return <div className="p-8">Loading testimonials...</div>;
  }

  // Display up to 5 stacked authors on the left and use the selected testimonial on the right
  const leftSideTestimonials = testimonials.slice(0, 5);
  const activeTestimonial = testimonials[activeTestimonialIndex];

  // Function to render star ratings based on the rating value
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 w-6 h-6 mr-1" />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-6 h-6 mr-1" />
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className="text-yellow-400 w-6 h-6 mr-1"
        />
      );
    }

    return stars;
  };

  return (
    <section
      className="py-12 px-8 bg-pink-100" // or use bg-[#FCEEEE] to match your design
      id="testimonials"
    >
      {/* Section headings */}
      <h2 className="text-3xl font-poppins font-medium text-maroon mb-2">
        Why people ❤️ Invincible
      </h2>
      <h3 className="text-2xl font-poppins font-medium text-black mb-8">
        Experience the best with us
      </h3>

      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left column: stacked list of authors */}
        <div className="md:w-[35%] gap-y-3 mb-8 md:mb-0">
          {leftSideTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className={`flex items-center shadow-md rounded p-6 cursor-pointer transition-all duration-300 ${
                activeTestimonialIndex === idx
                  ? "bg-[#fff]"
                  : "bg-[#e8dede] hover:bg-gray-50"
              }`}
              onClick={() => setActiveTestimonialIndex(idx)}
            >
              <img
                src={t.profileImage}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="text-lg font-poppins font-medium">{t.name}</h4>
                <span className="text-sm text-gray-600">{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right column: star rating + main quote */}
        <div className="md:w-[65%] bg-white p-8 shadow-md rounded relative">
          {/* Star rating */}
          <div className="flex mb-4">
            {renderStars(activeTestimonial.ratings || 5)}
          </div>
          {/* Main quote from the selected testimonial */}
          <p className="text-xl md:text-2xl font-poppins text-black leading-relaxed italic mb-6">
            "{activeTestimonial.review}"
          </p>

          {/* Author information */}
          <div className="flex items-center mt-4">
            <img
              src={activeTestimonial.profileImage}
              alt={activeTestimonial.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-semibold">{activeTestimonial.name}</p>
              <p className="text-gray-600 text-sm">{activeTestimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
