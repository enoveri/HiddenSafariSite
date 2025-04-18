// src/components/CarouselSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const CarouselSection = ({ category, title, subTitle, apiEndpoint }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFallbacks, setImageFallbacks] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMzc2NzgsImV4cCI6MTcyOTMyMTY3OCwiaXNzIjoidXJuOmlzc3VlciJ9.ktWmxeC4NqHv1_W0qKt0avlCaDPBNivvDStv6BwHu9K5Geq9TegxH-S1cPfiRhcGdH30YUg1iDShFNOW7mBSwoKsVMMzWJfaqlN0aG1ELh3m9EL-GepR6gxQ5YkZQ9WfBGeoRDNHyYtq02ajgbRLrueuovCf5Nz9iu-ig0onh9XnZJ7J1kEQF3C6gjB0jLqJ8UcWY72S_O0_6tfq8lFuAXQjYbonMCAsx_hG-wJkmE8hlfcgN6BlcemZq-cTghJVNswBmzSoqgTEW1UnBYVoVOyptFQfVFOjdpRUaAlE4R0JHoRfFLR9vsxxvO5Y_x3Z8Eqfcq7O2CPGGPG_5yxt7w",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiEndpoint]);

  // Handle image loading error by trying next banner
  const handleImageError = (eventId, currentBanner) => {
    const currentFallback = imageFallbacks[eventId] || 0;
    const nextFallback = currentFallback + 1;

    if (nextFallback <= 2) {
      // We have bannerImages1, 2, and 3
      setImageFallbacks({
        ...imageFallbacks,
        [eventId]: nextFallback,
      });
    }
  };

  // Get the current banner image URL to display
  const getBannerImageUrl = (event) => {
    const fallbackLevel = imageFallbacks[event.id] || 0;

    switch (fallbackLevel) {
      case 0:
        return event.bannerImages1;
      case 1:
        return event.bannerImages2;
      case 2:
        return event.bannerImages3;
      default:
        return "https://placehold.co/238x239/gray/white?text=Image+Unavailable";
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <div className="py-16 px-4 max-w-7xl mx-auto">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-16 px-4 max-w-7xl mx-auto text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Section header */}
      <div className="mb-8">
        <h2 className="text-3xl font-poppins font-medium text-[#733d3dde] mb-2">
          {title}
        </h2>
        <p className="text-2xl text-[#412727de] font-poppins font-medium mb-12">
          {subTitle}
        </p>
      </div>

      {/* Card row exactly as in the image */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-24 pb-6 hide-scrollbar"
        >
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="flex-shrink-0 ">
              <Link
                to={`/${category}/${event.id}`}
                className="relative block w-[225px] h-[350px] rounded-lg overflow-hidden shadow-lg"
              >
                {/* Image container */}
                <div className=" h-full">
                  <img
                    src={getBannerImageUrl(event)}
                    alt={event.heading}
                    className="w-full h-full object-cover"
                    onError={() =>
                      handleImageError(event.id, imageFallbacks[event.id] || 0)
                    }
                  />
                </div>
                <div className="absolute inset-0  flex flex-col justify-between h-full">
                  {/* Location name overlay - centered in image */}
                  <div className="  flex items-center ">
                    <h3 className="text-white text-xl font-bold uppercase tracking-wide text-center px-2 text-shadow-sm">
                      {event.heading}
                    </h3>
                  </div>
                  <div className="  bg-white justify-self-end py-3 text-center ">
                    <p className="text-black text-2xl font-medium">
                      {event.heading}
                    </p>
                  </div>
                </div>

                {/* Trek text inside the card */}
              </Link>
            </div>
          ))}
        </div>
        <span
          onClick={scrollRight}
          className="
            absolute
            top-1/2
            right-0
            transform
            -translate-y-1/2
            ml-8
            w-12
            h-12
            flex
            bg-transparent
            items-center
            justify-center
            text-white
            hover:text-gray-200
            flex-shrink-0
            transition-colors
            focus:outline-none
            cursor-pointer
          "
          aria-label="View more events"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-3xl text-[#D2E7DC]"
          />
        </span>
      </div>

      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .text-shadow-sm {
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default CarouselSection;
