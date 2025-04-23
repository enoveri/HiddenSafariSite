// src/components/CarouselSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../api";
import axios from "axios";

const CarouselSection = ({ category, title, subTitle, apiEndpoint }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFallbacks, setImageFallbacks] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Try using the api object first
        let response;
        try {
          response = await api.get(apiEndpoint);
        } catch (apiError) {
          // If that fails, try with direct axios call as fallback
          console.warn("API module error, trying direct axios call:", apiError);
          response = await axios.get(apiEndpoint);
        }

        if (response && response.data) {
          setEvents(Array.isArray(response.data) ? response.data : []);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err);
        // Set empty array to prevent mapping errors
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiEndpoint]);

  // Check scroll position to update navigation buttons visibility
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const checkScrollable = () => {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollLeft <
          scrollContainer.scrollWidth - scrollContainer.clientWidth - 10
      );
    };

    // Check on mount and whenever events change
    checkScrollable();
    scrollContainer.addEventListener("scroll", checkScrollable);

    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollable);
    };
  }, [events]);

  // Handle image loading error by trying next banner
  const handleImageError = (eventId, currentBanner) => {
    const currentFallback = imageFallbacks[eventId] || 0;
    const nextFallback = currentFallback + 1;

    if (nextFallback <= 2) {
      setImageFallbacks({
        ...imageFallbacks,
        [eventId]: nextFallback,
      });
    }
  };

  // Get the current banner image URL to display
  const getBannerImageUrl = (event) => {
    if (!event)
      return "https://placehold.co/238x239/gray/white?text=Image+Unavailable";

    const fallbackLevel = imageFallbacks[event.id] || 0;

    switch (fallbackLevel) {
      case 0:
        return event.bannerImages1 || event.bannerImage || event.image;
      case 1:
        return event.bannerImages2 || event.bannerImages1 || event.image;
      case 2:
        return event.bannerImages3 || event.bannerImages2 || event.image;
      default:
        return "https://placehold.co/238x239/gray/white?text=Image+Unavailable";
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 300);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const newPosition = scrollPosition + 300;
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  // Touch scrolling handling for mobile
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);

  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setInitialScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;

    // Prevent default to stop page scrolling while dragging
    e.preventDefault();
    try {
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      const distance = (x - startX) * 1.5; // Multiply by 1.5 for faster scrolling
      scrollContainerRef.current.scrollLeft = initialScrollLeft - distance;
    } catch (err) {
      console.error("Touch error:", err);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 max-w-7xl mx-auto text-red-500 text-center">
        Error loading {title} events. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto w-full">
      {/* Section header with responsive text */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-poppins font-medium text-[#733d3dde] mb-1 md:mb-2">
          {title}
        </h2>
        <p className="text-lg md:text-2xl text-[#412727de] font-poppins font-medium mb-8 md:mb-12">
          {subTitle}
        </p>
      </div>

      {/* Carousel with navigation */}
      <div className="relative">
        {/* Left scroll button - only visible when scrollable left */}
        {canScrollLeft && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E25B32]"
            aria-label="Scroll left"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-[#733d3dde]"
            />
          </button>
        )}

        {/* Carousel container with touch events */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-8 lg:gap-12 pb-6 hide-scrollbar scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {events && events.length > 0 ? (
            events.slice(0, 8).map((event) => (
              <div
                key={event.id || Math.random().toString(36)}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
              >
                <Link
                  to={`/${category}/${event.id}`}
                  className="relative block w-[200px] sm:w-[225px] h-[280px] sm:h-[350px] rounded-lg overflow-hidden shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E25B32]"
                >
                  {/* Image container with gradient overlay */}
                  <div className="h-full">
                    <img
                      src={getBannerImageUrl(event)}
                      alt={event.heading || "Event"}
                      className="w-full h-full object-cover"
                      onError={() =>
                        handleImageError(
                          event.id,
                          imageFallbacks[event.id] || 0
                        )
                      }
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between h-full">
                    {/* Location name overlay with improved text legibility */}
                    <div className="p-3">
                      <h3 className="text-white text-xl font-bold uppercase tracking-wide text-shadow-md">
                        {event.heading || "Event"}
                      </h3>
                    </div>
                    <div className="bg-white py-2 sm:py-3 px-2 text-center">
                      <p className="text-black text-lg sm:text-2xl font-medium truncate">
                        {event.heading || "Event"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex-grow text-center py-10 text-gray-500">
              No events available for this category.
            </div>
          )}
        </div>

        {/* Right scroll button - only visible when scrollable right */}
        {canScrollRight && events && events.length > 0 && (
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E25B32]"
            aria-label="Scroll right"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[#733d3dde]"
            />
          </button>
        )}
      </div>

      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .text-shadow-md {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </section>
  );
};

export default CarouselSection;
