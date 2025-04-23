import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faUtensils,
  faCampground,
  faPersonHiking,
  faBriefcaseMedical,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const HighlightedEventCard = ({ event }) => {
  const [imageError, setImageError] = useState(false);

  // Handle image errors by trying fallback images
  const handleImageError = () => {
    setImageError(true);
  };

  // Get appropriate image URL with fallbacks
  const getImageUrl = () => {
    if (!imageError && event.bannerImages1) {
      return event.bannerImages1;
    } else if (event.bannerImages2) {
      return event.bannerImages2;
    } else if (event.bannerImages3) {
      return event.bannerImages3;
    } else {
      return "https://placehold.co/300x380/gray/white?text=No+Image+Available";
    }
  };

  // Determine category ID from event data for proper routing
  const getCategoryPath = () => {
    if (!event.category) return "highlighted";
    return event.category.toLowerCase().replace(/\s+/g, "-");
  };

  // Services included in the event package
  const services = [
    { icon: faBus, title: "Transport" },
    { icon: faUtensils, title: "Meals" },
    { icon: faCampground, title: "Camping" },
    { icon: faPersonHiking, title: "Guides" },
    { icon: faBriefcaseMedical, title: "First Aid" },
  ];

  return (
    <Link
      to={`/${getCategoryPath()}/${event.id}`}
      className="block focus:outline-none focus:ring-2 focus:ring-[#7d4744] focus:ring-offset-2 rounded-lg"
    >
      <div className="relative w-[280px] sm:w-[300px] h-[350px] sm:h-[380px] rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl">
        {/* Image with proper loading and error handling */}
        <img
          src={getImageUrl()}
          alt={event.heading || "Event"}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleImageError}
        />

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* Content container */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top area - event details */}
          <div className="flex justify-start items-start">
            {event.numberOfDays && (
              <div className="bg-white/90 text-[#7d4744] rounded-full py-1 px-3 inline-flex items-center text-sm font-medium mb-2 shadow-sm">
                <FontAwesomeIcon icon={faClock} className="mr-1" />
                <span>{event.numberOfDays} Days</span>
              </div>
            )}
          </div>

          {/* Middle area - event title */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white text-3xl md:text-[38px] leading-tight font-['Style_Script',cursive] text-shadow-lg px-2 mb-1">
              {event.heading || "Featured Event"}
            </h3>

            {event.calendarDates && (
              <p className="text-white text-sm flex items-center mt-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                <span className="text-shadow-md">{event.calendarDates}</span>
              </p>
            )}
          </div>

          {/* Bottom area - services icons */}
          <div className="flex items-center justify-between text-white w-full px-2 sm:px-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                title={service.title}
              >
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-lg sm:text-xl drop-shadow-md transition-transform hover:scale-110"
                />
                <span className="text-[8px] sm:text-[10px] mt-1 opacity-80">
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HighlightedEventCard;
