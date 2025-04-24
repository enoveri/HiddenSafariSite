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

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response;
        try {
          response = await api.get(apiEndpoint);
        } catch (apiError) {
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
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiEndpoint]);

  // Update nav-button visibility on scroll/resize
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

    checkScrollable();
    scrollContainer.addEventListener("scroll", checkScrollable);
    window.addEventListener("resize", checkScrollable);

    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollable);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [events]);

  // Auto-slide every 5s on mobile only
  useEffect(() => {
    // only on mobile screens (≤ 768px)
    if (!window.matchMedia("(max-width: 768px)").matches) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const slide = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setScrollPosition(0);
      } else {
        const newPos = Math.min(scrollPosition + 300, maxScrollLeft);
        container.scrollTo({ left: newPos, behavior: "smooth" });
        setScrollPosition(newPos);
      }
    };

    const id = setInterval(slide, 5000);
    return () => clearInterval(id);
  }, [scrollPosition, events]);

  // Image fallback handling
  const handleImageError = (eventId) => {
    const current = imageFallbacks[eventId] || 0;
    if (current < 2) {
      setImageFallbacks({ ...imageFallbacks, [eventId]: current + 1 });
    }
  };

  const getBannerImageUrl = (event) => {
    if (!event)
      return "https://placehold.co/238x239/gray/white?text=Image+Unavailable";
    const fallback = imageFallbacks[event.id] || 0;
    switch (fallback) {
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

  // Manual scroll handlers
  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const newPos = Math.max(0, scrollPosition - 300);
    scrollContainerRef.current.scrollTo({ left: newPos, behavior: "smooth" });
    setScrollPosition(newPos);
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    const newPos = scrollPosition + 300;
    scrollContainerRef.current.scrollTo({ left: newPos, behavior: "smooth" });
    setScrollPosition(newPos);
  };

  // Touch handlers
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);

  const handleTouchStart = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - container.offsetLeft);
    setInitialScrollLeft(container.scrollLeft);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const distance = (x - startX) * 1.5;
    container.scrollLeft = initialScrollLeft - distance;
  };
  const handleTouchEnd = () => setIsDragging(false);

  if (loading) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32]" />
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
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-poppins font-medium text-[#733d3dde] mb-1 md:mb-2">
          {title}
        </h2>
        <p className="text-lg md:text-2xl text-[#412727de] font-poppins font-medium mb-8 md:mb-12">
          {subTitle}
        </p>
      </div>

      <div className="relative">
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

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-8 lg:gap-12 pb-6 hide-scrollbar scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {events.length > 0 ? (
            events.slice(0, 8).map((event) => (
              <div
                key={event.id}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
              >
                <Link
                  to={`/${category}/${event.id}`}
                  className="relative block w-[200px] sm:w-[225px] h-[280px] sm:h-[350px] rounded-lg overflow-hidden shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E25B32]"
                >
                  <div className="h-full">
                    <img
                      src={getBannerImageUrl(event)}
                      alt={event.heading || "Event"}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(event.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between h-full">
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

        {canScrollRight && events.length > 0 && (
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
